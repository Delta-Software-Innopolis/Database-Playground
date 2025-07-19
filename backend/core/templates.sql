INSERT INTO templates_template (id, name, author, type, dump)
VALUES
(
  1,
  'Empty Postgres',
  'Database Playground',
  'PSQL',
  ''
),
(
  2,
  'Some Users',
  'Database Playground',
  'PSQL',
  'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(30), age INT);
   INSERT INTO users (name, age) VALUES (''Timur'', 19);
   INSERT INTO users (name, age) VALUES (''Kostya'', 18);
   INSERT INTO users (name, age) VALUES (''Arseniy'', 10);'
),
(
  3,
  'Empty Mongo',
  'Database Playground',
  'MGDB',
  ''
);
