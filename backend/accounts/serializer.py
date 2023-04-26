from .models import CustomUser
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        # token['limit'] = user.limit
        # ...
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password1', 'password2')

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password1": "Password fields don't match."})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(email=validated_data['email'])
        user.set_password(validated_data['password1'])
        user.save()

        return user
