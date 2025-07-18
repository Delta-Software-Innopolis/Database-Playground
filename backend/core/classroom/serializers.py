from rest_framework import serializers

from .models import Classroom, Topic
from .models import Enrollment


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = "__all__"
