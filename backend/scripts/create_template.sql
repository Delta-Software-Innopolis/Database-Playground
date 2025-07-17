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
	'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(30) DEFAULT "John");
	 INSERT INTO users (name) DEFAULT VALUES;
	 INSERT INTO users (name) DEFAULT VALUES;'
),
(
	3,
	'Empty Mongo',
	'Database Playground',
	'MGDB',
	''
);
