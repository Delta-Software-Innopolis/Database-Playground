from rest_framework import generics, mixins
from rest_framework.parsers import JSONParser
from rest_framework.request import Request
from rest_framework.response import Response

from engines import postgres_engine
from session.models import Session, SessionInfo
from session.shortcuts import extract_session_id

from authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from .docs import post_template_schema
from .models import Template
from .serializers import MinTemplateSerializer, TemplateSerializer


class TemplateListCreateView(mixins.ListModelMixin,
                             generics.GenericAPIView):
    queryset = Template.objects.all()
    serializer_class = MinTemplateSerializer

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        return self.list(request)

    @post_template_schema
    def post(self, request: Request):
        session: Session = request.auth
        db_name = session.get_unauth_dbname()

        data = JSONParser().parse(request)
        data['dump'] = postgres_engine.get_dump(db_name)

        serializer = TemplateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class TemplateRetreiveView(mixins.RetrieveModelMixin,
                           generics.GenericAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer

    def get(self, request: Request, pk: int):
        return self.retrieve(request, pk)
