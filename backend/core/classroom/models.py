from django.db import models

from account.models import Profile, User


class UserRole(models.IntegerChoices):
    STUDENT = 1
    TEACHER = 2


class Classroom(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    teacher = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    capacity = models.IntegerField()
    invite = models.TextField(null=False, default="")

    def __str__(self) -> str:
        return self.title


class Enrollment(models.Model):
    classroom = models.ForeignKey(to=Classroom, on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    role = models.IntegerField(
        choices=UserRole.choices,
        default=UserRole.STUDENT
    )
