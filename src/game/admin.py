from django.contrib import admin

from .models import Tile


@admin.register(Tile)
class TileAdmin(admin.ModelAdmin):
    pass
