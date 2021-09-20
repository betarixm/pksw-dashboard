from django.contrib import admin
from adminsortable2.admin import SortableInlineAdminMixin

from .models import Tile, ExpressionSlot, Expression


class TileSlotInline(SortableInlineAdminMixin, admin.TabularInline):
    model = ExpressionSlot
    extra = 1


@admin.register(Tile)
class TileAdmin(admin.ModelAdmin):
    pass


@admin.register(Expression)
class ExpressionAdmin(admin.ModelAdmin):
    inlines = [TileSlotInline]
