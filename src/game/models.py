import uuid

from django.db import models

from team.models import Team


class Tile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField("이름", max_length=100)
    latex = models.CharField("LaTex", max_length=100)
    team = models.ForeignKey(Team, related_name="tile", on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = "타일"
        verbose_name_plural = "타일들"
        ordering = ["team"]

    def __str__(self):
        return f"({str(self.team) if hasattr(self, 'team') and self.team else 'DECK'}) {self.title}"


class Expression(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField("제목", max_length=100)

    team = models.ForeignKey(Team, related_name="expression", on_delete=models.CASCADE)
    is_completed = models.BooleanField("완성 여부")

    class Meta:
        verbose_name = "수식"
        verbose_name_plural = "수식들"
        ordering = ["team__name", "is_completed"]

    def __str__(self):
        return f"({str(self.team)}) {self.title}"


class ExpressionSlot(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    expression = models.ForeignKey(Expression, related_name="slot", on_delete=models.CASCADE, null=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0, blank=False, null=False)

    tile = models.OneToOneField(
        Tile, related_name="slot", on_delete=models.CASCADE, blank=True, null=True,
        limit_choices_to={
            "team__isnull": False,
        })

    class Meta:
        verbose_name = "슬롯"
        verbose_name_plural = "슬롯들"
        ordering = ["order"]

    def __str__(self):
        return f"({str(self.expression.team) if self.expression else 'DECK'}) {self.id}"
