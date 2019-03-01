import React, { Component } from "react";
import JokesPage from "./components/JokesPage.js";
import Authentication from "./Authentication.js";
import "./App.css";
import Login from "./components/Login.js";
import Register from "./components/Register.js"

class App extends Component {
  render() {
    return (
      <div>
        <ConditionalView />
      </div>
    );
  }
}

const ConditionalView = Authentication(JokesPage)(Login)(Register);

export default App;