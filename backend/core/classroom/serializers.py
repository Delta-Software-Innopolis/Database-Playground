from rest_framework import serializers

from .models import Classroom
from .models import Enrollment
from account.serializers import UserBriefSerializer


class ClassSerializer(serializers.ModelSerializer):
    teacher = UserBriefSerializer()

    class Meta:
        model = Classroom
        fields = "__all__"


class ClassroomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ('title', 'description', 'capacity')


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = "__all__"


class ClassroomStudentsSerializer(serializers.Serializer):
    classroom = serializers.IntegerField()
    students = UserBriefSerializer(many=True)
