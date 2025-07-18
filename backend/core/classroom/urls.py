from django.urls import path

from .views import ClassroomViewSet

urlpatterns = [
    path("", ClassroomViewSet.as_view()),
]
