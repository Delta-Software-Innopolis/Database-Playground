from django.urls import path

from .views import ClassroomView

urlpatterns = [
    path("", ClassroomView.as_view()),
]
