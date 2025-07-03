from engines import postgres_engine, mongo_engine, DBEngine
from templates.models import DBType

def get_db_engine(type: DBType) -> DBEngine | None:
    match type:
        case DBType.POSTGRES:
            return postgres_engine
        case DBType.MONGODB:
            return mongo_engine

    return None