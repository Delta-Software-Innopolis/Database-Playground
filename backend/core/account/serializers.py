from rest_framework import serializers
from .models import User, Profile
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "username"]

    def create(self, validated_data):
        username = validated_data.pop("username")
        user = User.objects.create_user(**validated_data)
        Profile.objects.filter(user=user).update(username=username)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(email=attrs["email"], password=attrs["password"])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        attrs["user"] = user
        return attrs


class UserBriefSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email']

    def get_username(self, obj):
        profile = getattr(obj, 'profile_set', None)
        if profile:
            return profile.first().username if profile.exists() else None
        return None
