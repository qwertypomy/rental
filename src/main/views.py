from rest_framework import viewsets
from rest_framework import status

from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import list_route


from main.serializers import CategorySerializer, ItemSerializer, UserItemRentalSerializer, \
    UnauthorisedItemRentalSerializer, AdminUserItemRentalSerializer
from main.models import Category, Item, UserItemRental, UnauthorisedItemRental
from main.utils import available_items


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        return [AllowAny() if self.request.method == 'GET' else IsAdminUser()]

    @list_route()
    def items(self, request, pk=None):
        try:
            category = Category.objects.get(pk=pk)
        except:
            return Response(data={'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        rental_date_start = request.GET.get('rental_date_start', False)
        rental_date_out = request.GET.get('rental_date_out', False)
        items = Item.objects.filter(category__slug__contains=category.slug)
        items = available_items(items, rental_date_start, rental_date_out)

        page = self.paginate_queryset(items)
        if page is not None:
            serializer = ItemSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = ItemSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_permissions(self):
        return [AllowAny() if self.request.method == 'GET' else IsAdminUser()]


class UserItemRentalViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, ]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminUserItemRentalSerializer
        return UserItemRentalSerializer

    def get_queryset(self):
        params_status = self.request.query_params.get('status', False)

        if params_status:
            if self.request.user.is_staff:
                return UserItemRental.objects.filter(status=params_status)
            return self.request.user.useritemrental_set.filter(status=params_status)

        if self.request.user.is_staff:
            return UserItemRental.objects.all()
        return self.request.user.useritemrental_set.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UnauthorisedItemRentalViewSet(viewsets.ModelViewSet):
    serializer_class = UnauthorisedItemRentalSerializer

    def get_permissions(self):
        return [AllowAny() if self.request.method == 'POST' else IsAdminUser()]

    def get_queryset(self):
        params_status = self.request.query_params.get('status', False)
        if params_status:
            return UnauthorisedItemRental.objects.filter(status=params_status)
        return UnauthorisedItemRental.objects.all()
