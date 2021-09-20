from django.urls import path
from . import views

urlpatterns = [
    path("deck/", views.DeckView.as_view(), name="api_deck"),
    path("hand/", views.HandView.as_view(), name="api_hand")
]
