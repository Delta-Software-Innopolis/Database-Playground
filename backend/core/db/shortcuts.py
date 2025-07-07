import pandas as pd
from typing import List, Any
from datetime import datetime, date
import numpy as np

from engines import postgres_engine, mongo_engine, DBEngine
from templates.models import DBType


def get_db_engine(type: str) -> DBEngine | None:
    match type:
        case DBType.POSTGRES.value:
            return postgres_engine
        case DBType.MONGODB.value:
            return mongo_engine
    return None


def _sql_literal(value: Any) -> str:
    """Converts Python/Pandas symbol to the Postgres SQL literal."""

    if pd.isna(value):
        return "NULL"

    if isinstance(value, (bool, np.bool_)):
        return "TRUE" if value else "FALSE"

    if isinstance(value, (int, np.integer)):
        return str(value)

    if isinstance(value, (float, np.floating)):
        return str(value) if np.isfinite(value) else "NULL"

    if isinstance(value, (datetime, pd.Timestamp)):
        return f"'{value.strftime('%Y-%m-%d %H:%M:%S')}'"
    if isinstance(value, date):
        return f"'{value.isoformat()}'"

    escaped = str(value).replace("'", "''")
    return f"'{escaped}'"


def df_to_insert_queries(df: pd.DataFrame, table: str, engine: DBEngine, db_name: str) -> List[str]:

    cols_sql = ', '.join(f'"{c}"' for c in df.columns)

    queries: List[str] = []
    for _, row in df.iterrows():
        vals_sql = ', '.join(_sql_literal(v) for v in row)
        queries.append(f'INSERT INTO "{table}" ({cols_sql}) VALUES ({vals_sql});')

    return queries