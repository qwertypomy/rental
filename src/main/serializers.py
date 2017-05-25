from rest_framework import serializers

from main.models import Category, Item, UserItemRental, UnauthorisedItemRental

from .utils import is_available


class ItemSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Item
        fields = ('url', 'name', 'category', 'description', 'daily_rate', 'attributes')


class CategorySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Category
        fields = ('url', 'name', 'parent', 'slug')
        read_only_fields = ['slug',]


class BaseRentalSerializer(serializers.HyperlinkedModelSerializer):
    def validate(self, data):
        if data['rental_date_start'] >= data['rental_date_out']:
            raise serializers.ValidationError("Date out must occur after start date.")
        if not is_available(data['item'], data['rental_date_start'], data['rental_date_out']):
            raise serializers.ValidationError("Not available in this date.")
        return data


class UserItemRentalSerializer(BaseRentalSerializer):
    class Meta:
        model = UserItemRental
        fields = ('url', 'user', 'item', 'status', 'rental_date_start', 'rental_date_out', 'rental_date_returned',
                  'rental_amount_due', 'created')
        read_only_fields = ['status', 'user', 'rental_date_returned', 'rental_amount_due', 'created']


class UserItemRentalPutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserItemRental
        fields = ('url', 'user', 'item', 'status', 'rental_date_start', 'rental_date_out', 'rental_date_returned',
                  'rental_amount_due', 'created')
        read_only_fields = ['item', 'rental_date_start', 'rental_date_out','user', 'rental_date_returned', 'rental_amount_due', 'created']


class UnauthorisedItemRentalSerializer(BaseRentalSerializer):

    class Meta:
        model = UnauthorisedItemRental
        fields = ('url', 'full_name', 'phone_number', 'email', 'item', 'status', 'rental_date_start',
                  'rental_date_out', 'rental_date_returned', 'rental_amount_due', 'created')
        read_only_fields = ['status', 'user', 'rental_date_returned', 'rental_amount_due', 'created']

