from rest_framework.parsers import BaseParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from engines.exceptions import QueryError, ParsingError
from engines.shortcuts import db_exists
from session.models import SessionInfo
from authentication import SessionAuthentication, SessionUser

from .docs import get_db_schema_doc, post_db_query_doc, put_db_schema_doc
from .shortcuts import get_db_engine


class PlainTextParser(BaseParser):
    media_type = "text/plain"

    def parse(self, stream, media_type=None, parser_context=None):
        return stream.read().decode("utf-8")


class PutView(APIView):

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @put_db_schema_doc
    def put(self, request: Request):
        user: SessionUser = request.user
        session = user.session
        db_name = session.get_unauth_dbname()
        session_info = SessionInfo.objects.get(session=session.id)
        template = session_info.template

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

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @get_db_schema_doc
    def get(self, request: Request):

        user: SessionUser = request.user
        session = user.session
        db_name = session.get_unauth_dbname()
        session_info = SessionInfo.objects.get(session=session.id)
        template = session_info.template

        if not template:
            return Response({"detail": "Template not chosen"}, status=400)

        engine = get_db_engine(session_info.template.type)

        if not engine:
            return Response({"detail": "Unknown engine type"}, status=418)

        schema = engine.get_db(db_name)

        return Response(schema.to_json())


class QueryView(APIView):

    parser_classes = [PlainTextParser]
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @post_db_query_doc
    def post(self, request: Request):
        user: SessionUser = request.user
        session = user.session
        db_name = session.get_unauth_dbname()
        session_info = SessionInfo.objects.get(session=session.id)
        template = session_info.template

        if not template:
            return Response({"detail": "Template not chosen"}, status=400)

        engine = get_db_engine(session_info.template.type)

        if not engine:
            return Response({"detail": "Unknown engine type"}, status=418)

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
