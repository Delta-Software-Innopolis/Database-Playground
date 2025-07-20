from django.urls import path

from .views import ClassroomView, ClassroomEnroll, ClassroomStudents

urlpatterns = [
    path("", ClassroomView.as_view()),
    path("<int:id>/", ClassroomView.as_view()),
    path("enroll/<str:invite>", ClassroomEnroll.as_view()),
    path("<int:id>/students", ClassroomStudents.as_view())
]
