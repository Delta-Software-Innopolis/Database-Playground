from rest_framework import serializers

from .models import Classroom


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = "__all__"


class ClassroomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ('title', 'description', 'capacity')
