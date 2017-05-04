from django.contrib import admin
from .models import Category, Item, UserItemRental, UnauthorisedItemRental


admin.site.register(Category)
admin.site.register(Item)
admin.site.register(UserItemRental)
admin.site.register(UnauthorisedItemRental)