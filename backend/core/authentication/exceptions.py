class InvalidTokenError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


class JWTRequiredError(Exception):
    pass


class InvalidSessionError(Exception):
    pass
