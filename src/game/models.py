import uuid

from django.db import models

from team.models import Team


class Tile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField("이름", max_length=100)
    latex = models.CharField("LaTex", max_length=100)

    class Meta:
        verbose_name = "타일"
        verbose_name_plural = "타일들"

    def __str__(self):
        return f"({str(self.slot.team) if hasattr(self, 'slot') and self.slot.team else 'DECK'}) {self.title}"


class TileSlot(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    tile = models.OneToOneField(
        Tile, related_name="slot", on_delete=models.CASCADE, blank=True, null=True
    )

    team = models.ForeignKey(
        Team, related_name="slot", on_delete=models.CASCADE, blank=True, null=True
    )

    is_allocated = models.BooleanField("배치 여부")

    order = models.PositiveBigIntegerField(default=0, blank=False, null=False)

    class Meta:
        verbose_name = "슬롯"
        verbose_name_plural = "슬롯들"
        ordering = ["order"]

    def __str__(self):
        return f"({str(self.team) if self.team else 'DECK'}) {self.id}"
