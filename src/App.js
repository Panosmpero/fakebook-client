import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import AuthRoute from "./util/authRoutes";
import SinglePost from "./screens/SinglePost";

function App() {
  return (
    <Container>
      <MenuBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/register" component={Register} />
        <Route path="/posts/:postId" component={SinglePost} />
      </Switch>
    </Container>
  );
}

export default App;
