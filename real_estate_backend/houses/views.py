from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import House
from .serializers import HouseSerializer

@api_view(['GET', 'POST'])
def house_list(request):
    if request.method == 'GET':
        houses = House.objects.all()
        serializer = HouseSerializer(houses, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = HouseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

def home(request):
    return HttpResponse("Welcome to the Real Estate Backend!")  # Basic response
