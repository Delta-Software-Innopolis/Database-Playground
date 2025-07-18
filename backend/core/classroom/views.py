from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import views

from .models import Classroom
from .serializers import ClassSerializer

from account.models import User
from classroom.models import Enrollment
from classroom.serializers import EnrollmentSerializer


def serialize(model):
    if isinstance(model, Enrollment):
        return EnrollmentSerializer(model)


class ClassroomViewSet(views.APIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request: Request):
        return Response({"em": request.user.email}, status=status.HTTP_200_OK)


class ClassroomEnroll(views.APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, invite: str):
        user: User = request.user

        try:
            classroom = Classroom.objects.get(invite=invite)
        except Classroom.DoesNotExist:
            return Response({"detail": "Classroom Not Found"}, status=404)

        enrollment, created = Enrollment.objects.get_or_create(
            classroom=classroom, user=user
        )

        if classroom.teacher == user:
            return Response(data=serialize(enrollment).data, status=200)

        status = 201 if created else 200
        return Response(data=serialize(enrollment).data, status=status)
