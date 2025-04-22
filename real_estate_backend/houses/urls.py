from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('houses/', views.house_list, name='house-list'),
    path('admin/signup/', views.admin_signup, name='admin-signup'),
    path('admin/login/', views.admin_login, name='admin-login'),
    path('houses/add/', views.add_house, name='add-house'),
    path('search/', views.search_properties, name='search-properties'),
]
