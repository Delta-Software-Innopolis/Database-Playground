import uuid

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from session.models import Session
from session.shortcuts import extract_session_id


class SessionUser:
    is_authenticated = True  # fool DRF's permission classes

    session: Session
    id: uuid.UUID
    is_session_user: bool

    def __init__(self, session: Session):
        self.session = session
        self.id = session.id
        self.is_session_user = True


class SessionAuthentication(BaseAuthentication):
    def authenticate(self, request):
        session_id = extract_session_id(request)

        if not session_id:
            return None

        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            raise AuthenticationFailed("Invalid session")

        return (SessionUser(session), session)
