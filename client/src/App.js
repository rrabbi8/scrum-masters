import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Contacts from "./pages/Contacts";
import Contracts from "./pages/Contracts";
import Orders from "./pages/Orders";
import Welcome from "./pages/Welcome";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Welcome} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/orders" component={Orders} />
                <Route path="/users" component={Users} />
                <Route path="/contracts" component={Contracts} />
            </Switch>
        </Router>
    );
}

export default App;
