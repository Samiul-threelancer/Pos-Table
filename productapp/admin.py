from django.contrib import admin
from .models import Product, SavedProduct
from django.contrib.auth import get_user_model
User = get_user_model()

admin.site.register(Product)
admin.site.register(User)
admin.site.register(SavedProduct)
# Register your models here.
