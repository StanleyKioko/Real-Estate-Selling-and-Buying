from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.db.models import Q
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from transformers import pipeline
from .models import House
from .serializers import HouseSerializer, UserSerializer

# Initialize the model
chatbot = pipeline("text2text-generation", model="facebook/blenderbot-400M-distill")

@api_view(['GET'])
def house_list(request):
    houses = House.objects.all()
    serializer = HouseSerializer(houses, many=True)
    print("Returning houses:", serializer.data)  # Debug print
    return Response(serializer.data)

@api_view(['GET'])  # Add this decorator
def home(request):
    return Response({
        "message": "Welcome to the Real Estate API",
        "endpoints": {
            "houses": "/api/houses/",
            "search": "/api/search/",
            "admin": "/admin/"
        }
    })

@api_view(['POST'])
def add_house(request):
    print("Received data:", request.data)  # Debug print
    serializer = HouseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("Validation errors:", serializer.errors)  # Debug print
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def search_properties(request):
    query = request.GET.get('query', '')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    location = request.GET.get('location', '')

    # Start with all houses
    queryset = House.objects.all()

    if query:
        # Create search vector
        search_vector = SearchVector('title', weight='A') + \
                       SearchVector('description', weight='B') + \
                       SearchVector('location', weight='A')
        search_query = SearchQuery(query)
        
        # Apply full text search with ranking
        queryset = queryset.annotate(
            search=search_vector,
            rank=SearchRank(search_vector, search_query)
        ).filter(search=search_query).order_by('-rank')

    # Apply additional filters
    if min_price:
        queryset = queryset.filter(price__gte=min_price)
    if max_price:
        queryset = queryset.filter(price__lte=max_price)
    if location:
        queryset = queryset.filter(location__icontains=location)

    serializer = HouseSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def admin_signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user and user.is_staff:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def ai_chat(request):
    message = request.data.get('message')
    try:
        # Generate response using the model
        response = chatbot(message, max_length=100)[0]['generated_text']
        return Response({'message': response})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def ai_recommend(request):
    preferences = request.data
    try:
        # Get properties matching preferences
        houses = House.objects.all()
        # Use the model to generate personalized recommendations
        recommendations = chatbot(
            f"Find properties matching: {preferences}",
            max_length=200
        )[0]['generated_text']
        return Response({'recommendations': recommendations})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
