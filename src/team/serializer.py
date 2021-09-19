from rest_framework import serializers

from game.serializer import TileSlotSerializer

from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    slot = TileSlotSerializer(read_only=True, many=True)

    class Meta:
        model = Team
        fields = ("id", "name", "slot")
