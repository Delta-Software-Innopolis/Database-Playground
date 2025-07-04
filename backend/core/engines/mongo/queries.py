import re
import time
from abc import ABC, abstractmethod

from pymongo.database import Database as MongoDatabase

from .parsing import (
    extract_input_string,
    extract_collection_name,
    parse_rjson
)
from ..models import MongoQueryResult
from ..exceptions import ParsingError


class MongoQuery(ABC):
    pattern: re.Pattern

    def __init__(self, str_query: str):
        self.query = str_query

    @classmethod
    def matches(cls, str_query: str) -> bool:
        """ Checks if string looks like that query """
        return cls.pattern.fullmatch(str_query) is not None

    def parse_and_execute(self, db: MongoDatabase) -> MongoQueryResult:
        """ Parses string query and executes it using
        provided database instance """
        self._parse()
        start_time = time.perf_counter()
        result = self._execute(db)
        end_time = time.perf_counter()
        return MongoQueryResult(
            self.query, result,
            end_time - start_time
        )

    @abstractmethod
    def _parse(self):
        """ Parses all necessary data from str_query """

    @abstractmethod
    def _execute(self, db: MongoDatabase) -> list | dict | None:
        """ Executes query using provided database instance """


class GetCollectionNames(MongoQuery):
    pattern = re.compile(r".*db\.getCollectionNames(.*).*")

    def _parse(self):
        input = extract_input_string(self.query)
        if input:
            raise ParsingError(
                "getCollectionNames() accepts no arguments,"
                f" but '{input}' provided"
            )

    def _execute(self, db: MongoDatabase):
        return db.list_collection_names()


class DropCollection(MongoQuery):
    pattern = re.compile(r".*db\..*\.drop(.*).*")

    def __init__(self, str_query: str):
        super().__init__(str_query)
        self.collection: str = ""

    def _parse(self):
        input = extract_input_string(self.query)
        if input:
            raise ParsingError(
                "drop() accepts no arguments,"
                f" but '{input}' provided"
            )
        collection = extract_collection_name(self.query)
        if not collection:
            raise ParsingError(
                "query db.<collection>.drop(),"
                " no collection provided"
            )
        self.collection = collection

    def _execute(self, db: MongoDatabase):
        return db.drop_collection(self.collection)


class InsertOne(MongoQuery):
    pattern = re.compile(r".*db\..*\.insertOne(.*).*")

    def __init__(self, str_query: str):
        super().__init__(str_query)
        self.collection: str = ""
        self.data: dict = {}

    def _parse(self):
        input = extract_input_string(self.query)
        data = parse_rjson(input)
        if not data or isinstance(data, list):
            raise ParsingError(
                "insertOne() accepts a single document"
                f" (relaxed json). Got '{data}'"
            )
        collection = extract_collection_name(self.query)
        if not collection:
            raise ParsingError(
                "query db.<collection>.drop(),"
                " no collection provided"
            )
        self.collection = collection

    def _execute(self, db: MongoDatabase) -> list | dict | None:
        coll = db.get_collection(self.collection)
        result = coll.insert_one(self.data)
        return {
            "acknowledged": str(result.acknowledged),
            "inserted_id": str(result.inserted_id)
        }
