from django.contrib import admin
from main.models import Category, Item, UserItemRental, UnauthorisedItemRental
from accounts.models import User

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Item)
admin.site.register(UserItemRental)
admin.site.register(UnauthorisedItemRental)