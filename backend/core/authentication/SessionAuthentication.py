from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from session.models import Session
from session.shortcuts import extract_session_id


class SessionAuthentication(BaseAuthentication):
    def authenticate(self, request):
        session_id = extract_session_id(request)

        if not session_id:
            return None

        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            raise AuthenticationFailed("Invalid session")

        return (None, session)
