from rest_framework import serializers
from .models import Tile, TileSlot


class TileSerializer(serializers.ModelSerializer):
    team = serializers.ReadOnlyField(source="slot.team.name")
    order = serializers.ReadOnlyField(source="slot.order")

    class Meta:
        model = Tile
        fields = (
            "id",
            "title",
            "latex",
            "team",
            "order",
        )


class TileSlotSerializer(serializers.ModelSerializer):
    tiles = TileSerializer(read_only=True)
    team = serializers.ReadOnlyField(source="team.name")

    class Meta:
        model = TileSlot
        fields = ("id", "tiles", "team")
