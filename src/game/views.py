from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from .models import Tile
from .serializer import TileSerializer


class TileView(generics.ListAPIView):
    serializer_class = TileSerializer
    queryset = Tile.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = []

    def get_queryset(self):
        queryset = Tile.objects.all().order_by("slot__order")
        team = self.request.query_params.get("team")
        deck = self.request.query_params.get("deck")
        is_allocated = self.request.query_params.get("is_allocated")

        if deck is not None:
            return queryset.filter(slot__isnull=deck)

        if team:
            queryset = queryset.filter(slot__team__name=team)

        if is_allocated:
            queryset = queryset.filter(slot__is_allocated=is_allocated)

        return queryset

