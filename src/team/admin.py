from django.contrib import admin
from game.models import Expression

from .models import Team


class ExpressionInline(admin.StackedInline):
    model = Expression
    extra = 0
    show_change_link = True
    search_fields = ["tile__team__name"]


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    inlines = [ExpressionInline]

