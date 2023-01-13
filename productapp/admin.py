from django.contrib import admin
from .models import Product
from django.contrib.auth import get_user_model
User = get_user_model()

admin.site.register(Product)
admin.site.register(User)
# Register your models here.
