from rest_framework import generics

from .models import Team
from .serializer import TeamSerializer


class TeamView(generics.ListAPIView):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    def get_queryset(self):
        queryset = Team.objects.all().order_by("id")
        name = self.request.query_params.get("name")

        if name:
            queryset = queryset.filter(name=name)

        return queryset
