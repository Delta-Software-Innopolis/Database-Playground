from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Classroom
from .serializers import ClassSerializer


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        return Response(request.user, status=status.HTTP_200_OK)
