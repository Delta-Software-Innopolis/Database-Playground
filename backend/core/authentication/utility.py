from typing import Literal, Optional
from dataclasses import dataclass
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import Token
from rest_framework.exceptions import AuthenticationFailed, ValidationError

from session.models import Session
from account.models import User
from session.shortcuts import extract_session_id


def not_None(*args) -> bool:
    for arg in args:
        if arg is None:
            return False
    return True


@dataclass
class AuthData:
    user: Optional[User] = None
    token: Optional[Token] = None
    session: Optional[Session] = None

    @property
    def type(self) -> Literal["jwt", "session", "fail"]:
        if not_None(self.user, self.token):
            return "jwt"
        elif not_None(self.session):
            return "session"
        else:
            return "fail"


def auth_func(request: Request) -> AuthData:
    jwt_auth = JWTAuthentication()

    try:
        auth = jwt_auth.authenticate(request)
        if auth:
            user, token = auth
            return AuthData(user=user, token=token)
    except (AuthenticationFailed, ValidationError):
        # JWT was invalid or not present — fall through to session
        print("JWT failed")
        pass

    if session_id := extract_session_id(request):
        session = Session.objects.get(id=session_id)
        return AuthData(session=session)

    return AuthData()
