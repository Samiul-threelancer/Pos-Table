from django.contrib import admin
from django.urls import path, include
from productapp import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from productapp.views import RegisterApi, AllUser, SavedProduct, SavedProductViewSet


router = DefaultRouter()
router.register('products', views.ProductViewSet)
router.register('all/register', AllUser, basename='all_user_regestration')
router.register('api/savedproduct/', views.SavedProductViewSet, basename='SavedProductViewSet')

urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterApi.as_view(), name='user_regestration'),
   
   

]