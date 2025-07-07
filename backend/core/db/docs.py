from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

session_id_query_param = openapi.Parameter(
    name="session_id",
    in_=openapi.IN_QUERY,
    type=openapi.TYPE_STRING,
    required=True,
    description="Session ID passed as a query parameter.",
)

table_name_param = openapi.Parameter(
    name="table_name",
    in_=openapi.IN_QUERY,
    type=openapi.TYPE_STRING,
    required=True,
    description="Name of the table where data from csv will be inserted",
)

get_db_schema_doc = swagger_auto_schema(
    manual_parameters=[session_id_query_param],
)

put_db_schema_doc = swagger_auto_schema(
    manual_parameters=[session_id_query_param],
)

post_db_query_doc = swagger_auto_schema(
    manual_parameters=[session_id_query_param],
    request_body=openapi.Schema(
        type=openapi.TYPE_STRING, description="Raw plain text query"
    ),
)

post_csv_upload_doc = swagger_auto_schema(
    manual_parameters=[
        session_id_query_param,
        table_name_param,
        openapi.Parameter(
            name="file",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            required=True,
            description="CSV file to upload (must use colon as separator)",
        ),
    ],
    consumes=['multipart/form-data'],
    responses={
        200: openapi.Response("CSV file processed successfully"),
        400: openapi.Response("Invalid CSV file or request"),
        500: openapi.Response("Server error while processing file"),
    }
)
