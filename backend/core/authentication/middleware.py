from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.views import TokenRefreshView

from .utility import auth_func
from .exceptions import (
    InvalidTokenError, UnauthorizedError,
    JWTRequiredError, InvalidSessionError
)


class AuthMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        require_jwt = False
        if hasattr(view_func, 'view_class'):
            view_class = view_func.view_class

            if getattr(view_class, "skip_auth", False) \
               or view_class is TokenRefreshView:
                return  # Skip auth completely

            require_jwt = getattr(view_class, 'require_jwt', False)
        try:
            auth_data = auth_func(request, require_jwt=require_jwt)
            request.auth_data = auth_data
        except InvalidTokenError:
            return JsonResponse({"detail": "Invalid Token"}, status=401)
        except UnauthorizedError:
            return JsonResponse({"detail": "Unauthorized"}, status=401)
        except InvalidSessionError:
            return JsonResponse({"detail": "Invalid Session"}, status=401)
        except JWTRequiredError:
            return JsonResponse({"detail": "JWT Required"}, status=401)
