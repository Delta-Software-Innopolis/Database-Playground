from rest_framework import serializers

from .models import Classroom
from .models import Enrollment

class ClassSerializer(serializers.ModelSerializer):
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
