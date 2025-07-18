import hashlib

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import views

from .models import Classroom
from .serializers import ClassSerializer, ClassroomCreateSerializer


class ClassroomView(views.APIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        create_ser = ClassroomCreateSerializer(data=request.data)
        if not create_ser.is_valid():
            return Response(create_ser.errors, status=status.HTTP_400_BAD_REQUEST)


        data = create_ser.validated_data

        classroom = Classroom.objects.create(
            title=data['title'],
            description=data['description'],
            capacity=data['capacity'],
            teacher=request.user,
        )


        raw = f"{request.user.id}.{classroom.id}"
        invite_hash = hashlib.md5(raw.encode('utf-8')).hexdigest()


        classroom.invite = invite_hash
        classroom.save(update_fields=['invite'])


        out_ser = ClassSerializer(classroom)
        return Response(out_ser.data, status=status.HTTP_201_CREATED)