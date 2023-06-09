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
        token['isAdmin'] = user.is_superuser
        # ...
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    gender = serializers.ChoiceField(choices=['Male', 'Female'])

    class Meta:
        model = CustomUser
        fields = ('email', 'password1', 'password2', 'age', 'gender')

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password1": "Password fields don't match."})

        age = attrs.get('age')
        if age is not None and age <= 0:
            raise serializers.ValidationError(
                {"age": "Age must be greater than 0."})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'], age=validated_data['age'], gender=validated_data['gender'])
        user.set_password(validated_data['password1'])
        user.save()

        return user


class LevelSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('current_level',)


class ScoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('current_score', 'high_score',)
