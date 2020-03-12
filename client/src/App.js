import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Budget from "./pages/Budgets";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

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
<<<<<<< HEAD
          <Route exact path="/budget/:id" component={Budget} />
=======
          <Route exact path="/logout" component={Login} />
>>>>>>> 2ad211ac6e29dda0004b66d455e989103fdec519
        </Switch>
          </div>
      </div>
    </Router>
    );
  }
}

export default App;
