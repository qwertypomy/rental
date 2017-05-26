from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import list_route


from main.serializers import CategorySerializer, ItemSerializer, UserItemRentalSerializer, \
    UnauthorisedItemRentalSerializer, UserItemRentalPutSerializer, UnauthorisedItemRentalPutSerializer
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

        serializer = ItemSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_permissions(self):
        return [AllowAny() if self.request.method == 'GET' else IsAdminUser()]

    def get_queryset(self):
        rental_date_start = self.request.query_params.get('rental_date_start', False)
        rental_date_out = self.request.query_params.get('rental_date_out', False)
        items = available_items(Item.objects.all(), rental_date_start, rental_date_out)
        return items


class UserItemRentalViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        return [IsAuthenticated() if (self.request.method == 'GET' or self.request.method == 'POST') else IsAdminUser()]

    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return UserItemRentalPutSerializer
        return UserItemRentalSerializer

    def get_queryset(self):
        params_status = self.request.query_params.get('status', False)

        if params_status:
            if self.request.user.is_staff:
                return UserItemRental.objects.filter(status=params_status).order_by('-created')
            return self.request.user.useritemrental_set.filter(status=params_status).order_by('-created')

        if self.request.user.is_staff:
            return UserItemRental.objects.all().order_by('-created')
        return self.request.user.useritemrental_set.all().order_by('-created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UnauthorisedItemRentalViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        return [AllowAny() if self.request.method == 'POST' else IsAdminUser()]

    def get_serializer_class(self):
        if self.request.method == 'PUT' or 'PATCH':
            return UnauthorisedItemRentalPutSerializer
        return UnauthorisedItemRentalSerializer

    def get_queryset(self):
        params_status = self.request.query_params.get('status', False)
        if params_status:
            return UnauthorisedItemRental.objects.filter(status=params_status).order_by('-created')
        return UnauthorisedItemRental.objects.all().order_by('-created')


class AllRentalView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request):
        params_status = request.query_params.get('status', False);
        if params_status:
            data = UserItemRentalSerializer(UserItemRental.objects.filter(status=params_status), context={'request': request}, many=True).data + \
                   UnauthorisedItemRentalSerializer(UnauthorisedItemRental.objects.filter(status=params_status), context={'request': request}, many=True).data
        else:
            data = UserItemRentalSerializer(UserItemRental.objects.all(), context={'request': request}, many=True).data + \
                         UnauthorisedItemRentalSerializer(UnauthorisedItemRental.objects.all(), context={'request': request}, many=True).data
        data.sort(key=lambda x: x['created'], reverse=True)
        return Response(data)