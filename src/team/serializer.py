from rest_framework import serializers

from game.serializer import ExpressionSerializer, TileSerializer
from game.models import Tile

from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    expression = ExpressionSerializer(read_only=True, many=True)
    hands = serializers.SerializerMethodField("get_hands")

    def get_hands(self, team):
        q = Tile.objects.filter(team=team, slot__isnull=True, team__isnull=False)
        return TileSerializer(instance=q, many=True).data

    class Meta:
        model = Team
        fields = ("id", "name", "score", "hands", "expression")
