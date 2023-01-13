
from django.contrib import admin
from django.urls import path, include
from productapp import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from productapp.views import RegisterApi





urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('productapp.urls'))
  
]
