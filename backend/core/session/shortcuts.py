from django.http import HttpRequest
from rest_framework.request import Request


def extract_session_id(request: Request | HttpRequest) -> str | None:
    return request.headers.get("Session")
