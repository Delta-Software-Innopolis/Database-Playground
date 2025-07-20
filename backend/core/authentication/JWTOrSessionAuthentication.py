from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import AnonymousUser

from session.models import Session
from session.shortcuts import extract_session_id


class JWTOrSessionAuthentication(BaseAuthentication):
    """
    Custom authentication class that first tries JWT,
    then falls back to session.
    """

    def authenticate(self, request):
        # Try JWT authentication
        jwt_auth = JWTAuthentication()
        try:
            user_auth_tuple = jwt_auth.authenticate(request)
            if user_auth_tuple is not None:
                request.auth_type = 'jwt'
                return user_auth_tuple  # (user, token)
        except AuthenticationFailed:
            pass  # Continue to session fallback

        # Try session authentication
        session_id = extract_session_id(request)
        if not session_id:
            request.auth_type = 'unauthenticated'
            return (AnonymousUser(), None)

        session = Session.objects.filter(id=session_id).first()
        if session:
            request.auth_type = 'session'
            request.session_obj = session  # Attach session
            return (AnonymousUser(), None)

        request.auth_type = 'unauthenticated'
        return (AnonymousUser(), None)
