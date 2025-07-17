from dataclasses import dataclass
from typing import Literal, Optional
from rest_framework.request import Request
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed, ValidationError

from account.models import User
from session.models import Session
from session.shortcuts import extract_session_id
from .exceptions import (
    InvalidSessionError, InvalidTokenError,
    UnauthorizedError, JWTRequiredError
)


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


def auth_func(request: Request, require_jwt: bool = False) -> AuthData:
    jwt_auth = JWTAuthentication()

    try:
        auth = jwt_auth.authenticate(request)
        if auth:
            user, token = auth
            return AuthData(user=user, token=token)
    except AuthenticationFailed:
        # JWT was present but invalid
        raise InvalidTokenError("Invalid token")
    except ValidationError:
        raise InvalidTokenError("Token validation failed")

    # JWT not present → try session
    session_id = extract_session_id(request)
    if not session_id:
        raise UnauthorizedError("Session ID not provided")

    try:
        session = Session.objects.get(id=session_id)
    except Session.DoesNotExist:
        raise InvalidSessionError("Session does not exist or is invalid")

    if require_jwt:
        raise JWTRequiredError("JWT token required for this action")

    return AuthData(session=session)
