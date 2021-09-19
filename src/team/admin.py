from django.contrib import admin

from game.models import TileSlot

from .models import Team


class TileSlotInline(admin.TabularInline):
    model = TileSlot


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    inlines = [TileSlotInline, ]
