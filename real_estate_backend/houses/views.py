from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.db.models import Q
from .models import House
from .serializers import HouseSerializer, UserSerializer

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
@permission_classes([IsAuthenticated])
def add_house(request):
    if not request.user.is_staff:
        return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
    serializer = HouseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
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
