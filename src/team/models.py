import uuid

from django.db import models


class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField("이름", max_length=1000)

    class Meta:
        verbose_name = "팀"
        verbose_name_plural = "팀들"

    def __str__(self):
        return self.name
