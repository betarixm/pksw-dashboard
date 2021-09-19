from django.contrib import admin
from adminsortable2.admin import SortableInlineAdminMixin
from game.models import TileSlot

from .models import Team


class TileSlotInline(SortableInlineAdminMixin, admin.TabularInline):
    model = TileSlot


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    inlines = [TileSlotInline, ]
