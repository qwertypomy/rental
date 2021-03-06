from rest_framework import serializers

from accounts.models import User
from lib.utils import validate_email as email_is_valid


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'phone_number', 'email', 'first_name', 'last_name', 'is_staff')
        read_only_fields = ['url', 'phone_number', 'is_staff']


class UserRegistrationSerializer(serializers.HyperlinkedModelSerializer):
    #email = serializers.EmailField()

    class Meta:
        model = User
        fields = ('url', 'phone_number', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate_email(self, value):
        """
        Validate if email is valid or there is an user using the email.

        :param value: string
        :return: string
        """
        if not value:
            return value

        if not email_is_valid(value):
            raise serializers.ValidationError('Please use a different email address provider.')

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already in use, please use a different email address.')

        return value
