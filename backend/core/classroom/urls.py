from django.urls import path

from .views import ClassroomView, ClassroomEnroll

urlpatterns = [
    path("", ClassroomView.as_view()),
    path("<int:id>/", ClassroomView.as_view()),
    path("enroll/<str:invite>", ClassroomEnroll.as_view())

]
