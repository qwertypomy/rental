from django.db import models
from django.contrib.auth.models import User

#from jsonfield import JSONField
from django.contrib.postgres.fields import JSONField

from django.core.validators import RegexValidator
from django.utils.text import slugify

from accounts.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='child')
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if self.parent:
            self.slug = slugify(self.parent.slug + '_' + self.name, allow_unicode=True)
        else:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=2000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    daily_rate = models.PositiveSmallIntegerField()
    attributes = JSONField()

    def __str__(self):
        return self.name


class UserItemRental(models.Model):
    STATUS_NEW = 'N'
    STATUS_CONFIRMED = 'C'
    STATUS_IN_PROCESS = 'P'
    STATUS_COMPLETED = 'F'
    STATUS_CHOICES = (
        (STATUS_NEW, 'New'),
        (STATUS_CONFIRMED, 'Confirmed'),
        (STATUS_IN_PROCESS, 'In process'),
        (STATUS_COMPLETED, 'Completed')
    )

    user = models.ForeignKey(User)
    item = models.ForeignKey(Item)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=STATUS_NEW)
    rental_date_start = models.DateField()
    rental_date_out = models.DateField()
    rental_date_returned = models.DateTimeField(null=True, blank=True)
    rental_amount_due = models.IntegerField()

    def save(self, *args, **kwargs):
        time = self.rental_date_out - self.rental_date_start
        self.rental_amount_due = int(time.total_seconds()/86400 * self.item.daily_rate)
        super().save(*args, **kwargs)


class UnauthorisedItemRental(models.Model):
    STATUS_NEW = 'N'
    STATUS_CONFIRMED = 'C'
    STATUS_IN_PROCESS = 'P'
    STATUS_COMPLETED = '+'
    STATUS_CANCELED = '-'
    STATUS_CHOICES = (
        (STATUS_NEW, 'New'),
        (STATUS_CONFIRMED, 'Confirmed'),
        (STATUS_IN_PROCESS, 'In process'),
        (STATUS_COMPLETED, 'Completed'),
        (STATUS_CANCELED, 'Canceled')
    )

    phone_number = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{1,10}$')])
    full_name = models.CharField(max_length=50)
    email = models.EmailField(null=True, blank=True)
    item = models.ForeignKey(Item)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=STATUS_NEW)
    rental_date_start = models.DateField()
    rental_date_out = models.DateField()
    rental_date_returned = models.DateTimeField(null=True, blank=True)
    rental_amount_due = models.IntegerField()

    def save(self, *args, **kwargs):
        time = self.rental_date_out - self.rental_date_start
        self.rental_amount_due = int(time.total_seconds()/86400 * self.item.daily_rate)
        super().save(*args, **kwargs)