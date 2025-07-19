import hashlib

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import views

from .models import Classroom
from .serializers import ClassSerializer, ClassroomCreateSerializer

from account.models import User
from classroom.models import Enrollment, UserRole
from classroom.serializers import EnrollmentSerializer


def serialize(model):
    if isinstance(model, Enrollment):
        return EnrollmentSerializer(model)


class ClassroomView(views.APIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        class_id = kwargs.get("id")

        if class_id is None:
            enrollments = Enrollment.objects.filter(user=request.user)
            qs = [e.classroom for e in enrollments.all()]
            ser = ClassSerializer(qs, many=True)
            return Response({"classrooms": ser.data}, status=200)
        else:
            try:
                classroom = Classroom.objects.get(id=class_id)
                Enrollment.objects.get(
                    classroom=classroom, user=request.user)
            except Classroom.DoesNotExist:
                return Response(
                    {"detail": "Classroom not found."},
                    status=status.HTTP_404_NOT_FOUND
                )
            except Enrollment.DoesNotExist:
                return Response(
                    {"detail": "Not Enrolled."},
                    status=status.HTTP_403_FORBIDDEN
                )
            ser = ClassSerializer(classroom)
            return Response(ser.data, status=200)

    def post(self, request, *args, **kwargs):
        create_ser = ClassroomCreateSerializer(data=request.data)
        if not create_ser.is_valid():
            return Response(create_ser.errors, status=400)

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

        Enrollment.objects.create(
            classroom=classroom, user=request.user, role=UserRole.TEACHER
        )

        out_ser = ClassSerializer(classroom)
        return Response(out_ser.data, status=201)

    def delete(self, request, *args, **kwargs):
        class_id = kwargs.get("id")

        if class_id is None:
            return Response(
                {"detail": "Method \"DELETE\" not allowed on list."},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )


        try:
            classroom = Classroom.objects.get(id=class_id, teacher=request.user)
        except Classroom.DoesNotExist:
            return Response({"detail": "Classroom not found."},
                            status=404)

        classroom.delete()
        return Response(status=204)

    def patch(self, request, *args, **kwargs):
        class_id = kwargs.get("id")

        if class_id is None:
            return Response(
                {"detail": "Method \"PATCH\" not allowed on list."},
                status=405
            )


        try:
            classroom = Classroom.objects.get(id=class_id, teacher=request.user)
        except Classroom.DoesNotExist:
            return Response({"detail": "Classroom not found."},
                            status=404)


        serializer = ClassroomCreateSerializer(
            classroom,
            data=request.data,
            partial=True
        )

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        serializer.save()

        out_ser = ClassSerializer(classroom)
        return Response(out_ser.data, status=200)



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
