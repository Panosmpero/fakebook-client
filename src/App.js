import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  return (
    <Container>
      <MenuBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Container>
  );
}

export default App;
