from django.db import models

from account.models import Profile, User

class UserRole(models.IntegerChoices):
    STUDENT = 1
    TEACHER = 2


class Topic(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.title


class Classroom(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    teacher = models.ForeignKey(to=Profile, on_delete=models.CASCADE)
    topic = models.ForeignKey(to=Topic, on_delete=models.DO_NOTHING, null=True)
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




