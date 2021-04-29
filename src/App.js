import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import AuthRoute from "./util/authRoutes";

function App() {
  return (
    <Container>
      <MenuBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/register" component={Register} />
      </Switch>
    </Container>
  );
}

export default App;
