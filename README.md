![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Lenovo](https://img.shields.io/badge/lenovo-E2231A?style=for-the-badge&logo=lenovo&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Arch](https://img.shields.io/badge/Arch%20Linux-1793D1?logo=arch-linux&logoColor=fff&style=for-the-badge)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Neovim](https://img.shields.io/badge/NeoVim-%2357A143.svg?&style=for-the-badge&logo=neovim&logoColor=white)
![MDN Web Docs](https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Bitcoin](https://img.shields.io/badge/Bitcoin-000?style=for-the-badge&logo=bitcoin&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Pytest](https://img.shields.io/badge/pytest-%23ffffff.svg?style=for-the-badge&logo=pytest&logoColor=2f9fe3)

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

## Architecture
### Static View
#### Components of backend
<img src="docs/architecture/static-view/backend.png" style="height: 20em">

#### Components of Frontend:
Our frontend architecture uses many small single responsibility components combined togheter. This ensures modularity and reusability in the application. 
- Playground Page
<img src="docs/architecture/static-view/frontend_playground.png" style="height: 20em">

- Template Choice Page
<img src="docs/architecture/static-view/frontend_template.png" style="height: 20em">

- Dashboard Page
<img src="docs/architecture/static-view/frontend_topbar.png" style="height: 20em">

### Dynamic View
#### Sequence Diagram of Main Backend Workflows
These scenarios executes almost instantly, as each of them is mostly IO bound tasks
<img src="docs/architecture/dynamic-view/sequence_diagram.png">

### Deployment View
<img src="docs/architecture/deployment-view/deployment_diagram.png">

## Development
This section documents the development policies used in the project.

### Kanban board
We use a **GitHub Projects Kanban board** to track progress:

**[🔗 View our Kanban Board](https://github.com/orgs/Delta-Software-Innopolis/projects/1/views/1)**

#### Entry Criteria

| Column | Entry Criteria |
|--------|----------------|
| Todo | Issues must have a clear description and acceptance criteria. |
| In Progress | Issues must have owner(s) assigned to them and be actively worked on (preferably, in a separate branch).  |
| On Review | Issues must be resolved with a pull request that is being actively reviewed. |
| Done | Issues must be resolved and closed (a pull request is not necessary). |
| Cancelled | Issues must be closed due to being cancelled. |

### Git workflow

We adapted GitHub Flow with slight modifications for our CI/CD pipeline.

#### Rules

**1. Creating issues**

- Use the predefined issue templates:
    - [Bug Report](https://github.com/Delta-Software-Innopolis/Database-Playground/blob/pre-chroma/.github/ISSUE_TEMPLATE/bug_report.md)
    - [Technical Task](https://github.com/Delta-Software-Innopolis/Database-Playground/blob/pre-chroma/.github/ISSUE_TEMPLATE/technical-task.md)
    - [User Story](https://github.com/Delta-Software-Innopolis/Database-Playground/blob/pre-chroma/.github/ISSUE_TEMPLATE/user-story.md)
- Assign labels (e.g., `Bug`, `Feature`, `Frontend`, `Backend`, etc.).

**2. Branching**

- Name branches as:
`<issue number>-<issue name (shortened)>`
    - Example:
    `85-refactor-mongoengine`

- Create new branches from the development branch (currently, `pre-chroma`).

**3. Commit Messages**

Follow Conventional Commits:

```
<type>(<optional scope>): <description>

<optional body>

<optional footer>
```

**4. Pull Requests (PRs)**

- Use the **[PR Template](https://github.com/Delta-Software-Innopolis/Database-Playground/blob/pre-chroma/.github/pull_request_template.md)**.

    - Link to the issue (e.g., Closes #123).

    - Require at least one approval before merging.

- Direct pushes to development branch are allowed for minor fixes/urgent changes.

**5. Merging**

- No enforced squashing: Merge commits are preserved.

- Merged branches are kept (not automatically deleted) to prevent accidental overwrites.

**6. Code Reviews**

- For PRs only:

    - At least one approval required.

    - Reviewers check for code quality and adherence to standards.

**7. Resolving Issues**

- Automatically: Issues linked to PRs via Closes #123 are closed when the PR merges.

- Manually: If pushed directly to the development branch, close the issue after verifying the changes are deployed.

- Reopen if the fix is incomplete or regresses.

#### Git Workflow Diagram

<img src="docs/development/workflow.png">

### Secrets management

- **Never commit secrets** to version control!

- Store secrets in:

    - GitHub Actions Secrets (for CI/CD).

    - `.env` files (added to `.gitignore`).

## Quality Assurance
### Quality attribute scenarios
[Link](https://github.com/Delta-Software-Innopolis/Database-Playground/blob/pre-chroma/docs/quality-assurance/quality-attribute-scenarios.md) for quality attribute scenarios

### Automated tests
Backend testing is done via PyTest package
Mainly, Integration testing is implemented, to check how program works in bound with exact database management systems (e.g PostgreSQL or MongoDB)
Unit tests are implemented to, to check some inner logic (e.g query parsing for MongoEngine)

All the tests are in [backend/tests](backend/tests) directory
The integration tests are marked with special decorator (@integration_test)
The decorator skips the test if INTEGRATION_TEST environment variable is not set or set false

Testing pipeline should be activated with scripts in [backend/scripts](backend/scripts) directory

```shell
# make sure to activate python virtual environment 
# and install required packages

cd backend
./scripts/run_unit_tests.sh  # runs pytest without INTEGRATION_TEST env var


# If you want to run integration testing

docker compose up -d
./scripts/run/all_tests.sh  # runs pytest with INTEGRATION_TEST env var
```

## Build and deployment
### Continuous Integration
- [backend.yml](https://github.com/Delta-Software-Innopolis/Database-Playground/blob/pre-chroma/.github/workflows/backend.yml):
  - isort - sorting imports for easier readability
  - flake8 - linter for python code
  - pytest (via script) - run unit tests for the app
- [frontend.yml](https://github.com/Delta-Software-Innopolis/Database-Playground/blob/pre-chroma/.github/workflows/frontend.yml):
  - ESLint - linter for JavaScript code
  - Prettier - formatter for JavaScript and CSS
  - Dependency cruiser - Validating frontend code dependencies
- [deploy.yml](https://github.com/Delta-Software-Innopolis/Database-Playground/blob/pre-chroma/.github/workflows/deploy.yml):
  - Github - to fetch the newest version of the code and run this workflow
  - SSH - to connect to the server and deploy
  - Docker Compose - to easily build and run code
  - [All workflow runs](https://github.com/Delta-Software-Innopolis/Database-Playground/actions)
