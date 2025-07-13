## Architecture

### Static View

#### Components of backend

<img src="static-view/backend.png" style="height: 20em">

#### Components of Frontend:

Our frontend architecture uses many small single responsibility components combined togheter. This ensures modularity and reusability in the application.

- Playground Page
  <img src="static-view/frontend_playground.png" style="height: 20em">

- Template Choice Page
  <img src="static-view/frontend_template.png" style="height: 20em">

- Dashboard Page
  <img src="static-view/frontend_topbar.png" style="height: 20em">

### Dynamic View

#### Sequence Diagram of Main Backend Workflows

These scenarios executes almost instantly, as each of them is mostly IO bound tasks
<img src="dynamic-view/sequence_diagram.png">

### Deployment View

<img src="deployment-view/deployment_diagram.png">
