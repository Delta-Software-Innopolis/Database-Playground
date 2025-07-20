import tempfile
import os

from django.core.files.uploadedfile import UploadedFile

from engines import postgres_engine
from rest_framework.parsers import MultiPartParser

from rest_framework.parsers import BaseParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from engines.exceptions import QueryError, ParsingError
from engines.shortcuts import db_exists
from session.models import Session, SessionInfo
from session.shortcuts import resolve_session_id

from .docs import get_db_schema_doc, post_db_query_doc, put_db_schema_doc, post_csv_upload_doc
from .shortcuts import get_db_engine, df_to_insert_queries

import pandas as pd

class PlainTextParser(BaseParser):
    media_type = "text/plain"

    def parse(self, stream, media_type=None, parser_context=None):
        return stream.read().decode("utf-8")


class PutView(APIView):
    @put_db_schema_doc
    def put(self, request: Request):
        session_id, err_response = resolve_session_id(request)
        if err_response:
            return err_response

        session_info = SessionInfo.objects.get(session=session_id)
        db_name = session_info.db_name

        if not session_info.template:
            return Response({"detail": "Template not chosen"}, status=400)

        engine = get_db_engine(session_info.template.type)

        if not engine:
            return Response({"detail": "Unknown engine type"}, status=418)

        if db_exists(engine, db_name):
            engine.drop_db(db_name)

        dump = session_info.template.dump
        engine.create_db(db_name, dump)

        return Response({"detail": "Database was set up"}, status=214)


class SchemaView(APIView):
    @get_db_schema_doc
    def get(self, request: Request):
        session_id, err_response = resolve_session_id(request)
        if err_response:
            return err_response

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

    parser_classes = [PlainTextParser]

    @post_db_query_doc
    def post(self, request: Request):
        session_id, err_response = resolve_session_id(request)
        if err_response:
            return err_response

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


class CSVView(APIView):

    parser_classes = [MultiPartParser]

    @post_csv_upload_doc
    def post(self, request: Request):
        session_id, err_response = resolve_session_id(request)
        if err_response:
            return err_response

        session = Session.objects.get(id=session_id)
        session_info = SessionInfo.objects.get(session=session_id)

        if not session_info.template:
            return Response({"detail": "Template not chosen"}, status=400)


        if 'file' not in request.FILES:
            return Response({"detail": "No file provided"}, status=400)

        uploaded_file: UploadedFile = request.FILES['file']

        if not uploaded_file.name.lower().endswith('.csv'):
            return Response({"detail": "Only CSV files are allowed"}, status=400)


        max_size = 10 * 1024 * 1024  # 10MB in bytes
        if uploaded_file.size > max_size:
            return Response({"detail": "File size exceeds 10MB limit"}, status=400)

        table_name = request.query_params.get("table_name")
        engine = get_db_engine(session_info.template.type)
        db_name = session.get_unauth_dbname()

        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix='.csv') as temp_file:
                for chunk in uploaded_file.chunks():
                    temp_file.write(chunk)
                temp_file.flush()

                try:
                    df = pd.read_csv(temp_file.name, sep=':')

                    if not table_name:
                        return Response({"detail": "Missing `table_name` query parameter"}, status=400)

                    if not engine:
                        return Response({"detail": "Unknown engine type"}, status=418)


                    try:
                        db_info = engine.get_db(db_name)
                    except QueryError as e:
                        return Response({"detail": "QueryError while getting DB schema: " + str(e)}, status=400)

                    table_info = next((t for t in db_info.tables if t.name == table_name), None)
                    if table_info is None:
                        return Response({"detail": f"Table \"{table_name}\" not found"}, status=400)


                    NUMERIC_KEYWORDS = {
                        "int", "serial", "numeric", "decimal",
                        "real", "double precision", "float", "money"
                    }
                    numeric_cols = {
                        col.name for col in table_info.columns
                        if any(kw in col.type.lower() for kw in NUMERIC_KEYWORDS)
                    }


                    df.columns = df.columns.str.strip()
                    for col in numeric_cols:
                        if col in df.columns:
                            df[col] = pd.to_numeric(df[col], errors='coerce')


                    queries = df_to_insert_queries(df, table_name, engine, db_name)
                    full_query = "\n".join(queries)

                    try:
                        engine.send_query(db_name, full_query)
                    except QueryError as e:
                        return Response({"detail": "QueryError: " + str(e)}, status=400)

                    return Response({"detail": f"Successfully inserted {len(df)} rows into {table_name}"}, status=200)

                except pd.errors.EmptyDataError:
                    return Response({"detail": "Empty CSV file"}, status=400)
                except pd.errors.ParserError:
                    return Response({"detail": "Invalid CSV format"}, status=400)

        except Exception as e:
            return Response({"detail": f"Error processing file: {str(e)}"},
                            status=500)
        finally:
            if os.path.exists(temp_file.name):
                os.unlink(temp_file.name)


