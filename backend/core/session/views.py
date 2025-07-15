import uuid

from rest_framework.parsers import JSONParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from engines import postgres_engine
from engines.shortcuts import db_exists

from .docs import (
    get_db_schema_info_doc,
    get_db_schema_valid_doc,
    patch_session_info_doc,
)
from .models import Session, SessionInfo
from .serializers import SessionInfoSerializer, SessionSerializer
from .shortcuts import extract_session_id


class SessionView(APIView):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()

    def get(self, request: Request):
        session_id = extract_session_id(request)

        if not session_id:
            session = Session.objects.create()
        else:
            session = Session.objects.get_or_create(id=uuid.UUID(session_id))

        db_name = session.get_unauth_dbname()
        if not db_exists(postgres_engine, db_name):
            postgres_engine.create_db(db_name, "")

        return Response(self.serializer_class(session).data)


class SessionInfoView(APIView):

    @get_db_schema_info_doc
    def get(self, request: Request):
        session_id = extract_session_id(request)
        if not session_id:
            return Response("Unauthorized", status=401)
        session = Session.objects.get(id=session_id)
        session_info = SessionInfo.objects.get(session=session)
        return Response(SessionInfoSerializer(session_info).data)

    @patch_session_info_doc
    def patch(self, request: Request):
        session_id = extract_session_id(request)
        if not session_id:
            return Response("Unauthorized", status=401)

        try:
            session = Session.objects.get(id=session_id)
            session_info = SessionInfo.objects.get(session=session)
        except Session.DoesNotExist:
            return Response({"detail": "Session not found."}, status=404)
        except SessionInfo.DoesNotExist:
            return Response({"detail": "SessionInfo not found."}, status=404)

        data = JSONParser().parse(request)
        serializer = SessionInfoSerializer(
            session_info, data=data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


class SessionValidView(APIView):

    @get_db_schema_valid_doc
    def get(self, request: Request):
        session_id = extract_session_id(request)
        if not session_id:
            return Response("Unauthorized", status=401)

        valid = True
        try:
            Session.objects.get(id=session_id)
        except Exception as e:
            print(e)
            valid = False

        return Response({"valid": valid}, status=200)
