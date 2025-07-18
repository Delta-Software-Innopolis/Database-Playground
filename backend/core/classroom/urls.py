from django.urls import path

from .views import ClassroomViewSet, ClassroomEnroll

urlpatterns = [
    path("", ClassroomViewSet.as_view()),
    path("enroll/<str:invite>", ClassroomEnroll.as_view())
]
