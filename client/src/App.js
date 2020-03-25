import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Budget from "./pages/Budgets";
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  state = {
    Login
  };

  render() {
    return (
    <Router>
      <div>

      <div>
        <Nav />
      </div>

      <div className="container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Budget} />
          <Route exact path="/budget/:id" component={Budget} />
          <Route exact path="/logout" component={Login} />
        </Switch>
          </div>
      </div>
    </Router>
    );
  }
}

export default App;
