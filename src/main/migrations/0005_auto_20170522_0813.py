# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-22 08:13
from __future__ import unicode_literals

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20170520_1313'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unauthoriseditemrental',
            name='phone_number',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128),
        ),
    ]
