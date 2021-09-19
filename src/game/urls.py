from django.urls import path
from . import views

urlpatterns = [
    path("tile/", views.TileView.as_view(), name="api_tile"),
]
