from django.urls import path
from . import views

urlpatterns = [
    path("team/", views.TeamView.as_view(), name="api_team"),
]
