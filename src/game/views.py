from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from .models import Tile
from .serializer import TileSerializer


class DeckView(generics.ListAPIView):
    serializer_class = TileSerializer
    queryset = Tile.objects.filter(team__isnull=True)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = []


class HandView(generics.ListAPIView):
    serializer_class = TileSerializer
    queryset = Tile.objects.filter(slot__isnull=True, team__isnull=False)

    def get_queryset(self):
        queryset = self.queryset.all()
        _id = self.request.query_params.get("id")

        if _id:
            queryset = queryset.filter(team__id=_id)

        return queryset
