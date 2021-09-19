from django.shortcuts import render
from django.views import View


class BoardView(View):
    def get(self, request):
        return render(request, "board.html")
