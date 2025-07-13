<div align="center">
    <img src="frontend-37/src/assets/database.svg" width=200 height=200>
    <h1>Database Playground</h1>
    <p>Online platform for learning databases</p>
</div>

## Launch/Access instructions

### You can visit [deployed version](https://dbpg.ru)

### Or you can build the app yourself:

1. Clone the repo:

```sh
$ git clone https://github.com/Delta-Software-Innopolis/Database-Playground
$ cd Database-Playground
```

2. In order for app to run you need `.env` and `db.sqlite3`, you can take sample data from the `deploy` directory:

```sh
$ cp deploy/db.sqlite backend/core/db.sqlite3
$ cp deploy/.env.sample .env
```

3. Run the app via `Docker Compose` (Install it [here](https://docs.docker.com/compose/install/)):

```sh
$ docker compose up --build
```

4. Working version should be available at http://localhost:5173
