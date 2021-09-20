from rest_framework import serializers
from .models import Tile, ExpressionSlot, Expression


class TileSerializer(serializers.ModelSerializer):
    expression = serializers.ReadOnlyField(source="slot.expression.id")
    team = serializers.ReadOnlyField(source="team.name")

    class Meta:
        model = Tile
        fields = (
            "id",
            "team",
            "expression",
            "title",
            "latex",
        )


class ExpressionSlotSerializer(serializers.ModelSerializer):
    tile = TileSerializer(read_only=True)

    class Meta:
        model = ExpressionSlot
        fields = ("id", "order", "tile")


class ExpressionSerializer(serializers.ModelSerializer):
    team = serializers.ReadOnlyField(source="team.name")
    slot = ExpressionSlotSerializer(read_only=True, many=True)

    class Meta:
        model = Expression
        fields = ("id", "title", "team", "is_completed", "slot")
