from rest_framework.permissions import AllowAny
from rest_framework.parsers import BaseParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from engines.exceptions import QueryError, ParsingError
from engines.shortcuts import db_exists
from session.models import Session, SessionInfo
from session.shortcuts import extract_session_id

from authentication.utility import auth_func
from account.models import User

from .docs import get_db_schema_doc, post_db_query_doc, put_db_schema_doc
from .shortcuts import get_db_engine


class PlainTextParser(BaseParser):
    media_type = "text/plain"

    def parse(self, stream, media_type=None, parser_context=None):
        return stream.read().decode("utf-8")


class PutView(APIView):
    permission_classes = [AllowAny]

    @put_db_schema_doc
    def put(self, request: Request):
        auth = auth_func(request)

        if auth.type == "jwt":
            user: User = auth.user
            db_name = f"db_{user.id.hex}"
            return Response("Jwt is not yet supported", status=200)

        elif auth.type == "session":
            session: Session = auth.session
            db_name = session.get_unauth_dbname()
            session_info = SessionInfo.objects.get(session=session.id)
            template = session_info.template

        else:
            return Response("Unauthorized", status=401)

        if not template:
            return Response({"detail": "Template not chosen"}, status=400)

        engine = get_db_engine(session_info.template.type)

        if not engine:
            return Response({"detail": "Unknown engine type"}, status=418)

        if db_exists(engine, db_name):
            engine.drop_db(db_name)
        engine.create_db(db_name, template.dump)

        return Response({"detail": "Database was set up"}, status=214)


class SchemaView(APIView):
    @get_db_schema_doc
    def get(self, request: Request):
        session_id = extract_session_id(request)
        if not session_id:
            return Response("Unauthorized", status=401)

        session = Session.objects.get(id=session_id)
        session_info = SessionInfo.objects.get(session=session_id)

        if not session_info.template:
            return Response({"detail": "Template not chosen"}, status=400)

        engine = get_db_engine(session_info.template.type)

        if not engine:
            return Response({"detail": "Unknown engine type"}, status=418)

        db_name = session.get_unauth_dbname()
        schema = engine.get_db(db_name)

        return Response(schema.to_json())


class QueryView(APIView):

    permission_classes = [AllowAny]
    parser_classes = [PlainTextParser]

    @post_db_query_doc
    def post(self, request: Request):
        auth = auth_func(request)

        if auth.type == 'jwt':
            return Response(
                f"User {auth.user}, JWT is not working yet",
                status=200
            )

        session_id = extract_session_id(request)
        if not session_id:
            return Response("Unauthorized", status=401)

        session = Session.objects.get(id=session_id)
        session_info = SessionInfo.objects.get(session=session_id)

        if not session_info.template:
            return Response({"detail": "Template not chosen"}, status=400)

        engine = get_db_engine(session_info.template.type)

        if not engine:
            return Response({"detail": "Unknown engine type"}, status=418)

        db_name = session.get_unauth_dbname()

        query = request.data

        if not isinstance(query, str):
            return Response({"detail": "Not a plain string query"}, status=400)

        query = query.strip()
        query = query.replace("\\n", "")

        try:
            results = engine.send_query(db_name, query)
        except QueryError as e:
            return Response({"detail": "QueryError: " + str(e)}, status=400)
        except ParsingError as e:
            return Response({"detail": "ParsingError: " + str(e)}, status=400)

        schema = engine.get_db(db_name)

        json_results = [r.to_json() for r in results]
        json_schema = schema.to_json()

        return Response({"results": json_results, "schema": json_schema})
