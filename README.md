![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Pytest](https://img.shields.io/badge/pytest-%23ffffff.svg?style=for-the-badge&logo=pytest&logoColor=2f9fe3)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<div align="center">
    <img src="frontend-37/src/assets/database.svg" width=200 height=200>
    <h1>Database Playground</h1>
    <p>Online platform for learning databases</p>
    <p>
      <a href="https://dbpg.ru" target="_blank"><strong>Deploy</strong></a>
      <a href="demo.mp4" target="_blank"><strong>Demo</strong></a>
    </p>
</div>

## Description

Database Playground is an online platform for learning different databases. You can go to the playground and start learning right away without installing anything. We have pre-made templates with different scenaries with support of PostgreSQL and MongoDB. In the future we will add classrooms and assignments, as well as support for SQLite and MySQL.

Goal of the project is to provide a easy to use platform for education in the field of databases.

## [Feature Roadmap](https://docs.google.com/spreadsheets/d/1BHOc92tSWK-cnXHco21XueYkkOzliWa9WWUfIwjav9k/edit?gid=1707224305#gid=1707224305)

## Usage instructions

- open https://dbpg.ru in your favorite browser
- hover the menu in the top right corner
- select playground
- select the template you want to use
- press the start button
- you are now in the playground (in case of weird stuff or bugs reload the page)
  - in case you selected Postgres template:
    - top left is the query input, you can type your queries there and submit by the send button
    - top right is the schema panel, you can see your database tables and their schemas in it (switch tabs by clicking them)
    - bottom is the results panel, once you run a query it should display its execution result
  - in case you selected MongoDB template:
    - left is the query input
    - right is the results panel
  - via top bar you can return to the main page or change the template

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

3. Install frontend dependencies via [npm](https://www.npmjs.com):

```sh
$ cd frontend-37
$ npm install
```

4. Run the app via `Docker Compose` (Install it [here](https://docs.docker.com/compose/install/)):

```sh
$ docker compose up --build
```

5. Working version should be available at http://localhost:5173

---

## Documentation

### Architecture

- [Architecture Overview](docs/architecture/architecture.md)

### Build and deployment automation

- [Continuous Integration](docs/automation/continuous-integration.md)
- [Continuous Delivery](docs/automation/continuous-delivery.md)

### Quality Assurance

- [Automated Tests](docs/quality-assurance/automated-tests.md)
- [User Acceptance Tests](docs/quality-assurance/user-acceptance-tests.md)

### Quality Attributes

- [Quality Attribute Scenarios](docs/quality-attributes/quality-attribute-scenarios.md)

---

### Project Files

- [Changelog](CHANGELOG.md)
- [Contributing Guidelines](CONTRIBUTING.md)
