from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pwd = models.CharField(max_length=100, null=True, blank=True)
    # USERNAME_FIELD 

    
class SavedProduct(models.Model):
    ProductName = models.CharField(max_length=200)
    ProductSize = models.CharField(max_length=200)
    ProductPrice = models.IntegerField()
    ProductQuantity = models.IntegerField()
    VatTotal = models.IntegerField()
    NetTotal = models.IntegerField()


class Product(models.Model):
    ProductName = models.CharField(max_length=200)
    ProductSize = models.CharField(max_length=200)
    ProductPrice = models.IntegerField()
    ProductQuantity = models.IntegerField()
    PurchaseDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.ProductName