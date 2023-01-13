from django.shortcuts import render
from .models import Product, User
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import mixins, generics
from rest_framework import viewsets 

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import RegisterSerializer, UserSerializer

class RegisterApi(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer   
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })
        

class AllUser(viewsets.ModelViewSet):
     #Authentication
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer
   



class ProductViewSet(viewsets.ModelViewSet):
     #Authentication
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer































#This Chunk is for Mixin, ListModelMixin
# class ProductList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer

#     def get(self, request):
#         return self.list(request)

#     def post(self, request):
#         return self.create(request)



# class ProductDetails(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer

#     def get(self, request, pk):
#         return self.retrieve(request, pk)

#     def put(self, request, pk):
#         return self.update(request, pk)

#     def delete(self, request, pk):
#         return self.destroy(request, pk)












#code before optimization



"""
class ProductList(APIView):

    def get(self, request):
        product = Product.objects.all()
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)

    def post(self, request):
        print()
        serializer = ProductSerializer(data=request.data)
        print("data", request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProductDetails(APIView):
    def get_objects(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        product = self.get_objects(pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk):
        product = self.get_objects(pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = self.get_objects(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
             

"""



