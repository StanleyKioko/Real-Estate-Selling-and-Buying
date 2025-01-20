from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Root URL
    path('houses/', views.house_list, name='house-list'),  # Add trailing slash
]
