from rest_framework import serializers
from .models import Product
from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

User = get_user_model()

#Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password','first_name', 'last_name', 'email',)
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password = validated_data['password']  ,first_name=validated_data['first_name'],  last_name=validated_data['last_name'])
        user.pwd = validated_data['password']
        user.email = validated_data['email']
        user.save()
        return user

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'ProductName', 'ProductSize', 'ProductPrice', 'ProductQuantity', 'PurchaseDate']

