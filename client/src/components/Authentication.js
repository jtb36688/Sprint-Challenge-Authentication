import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Authentication = JokesPage => Login => Register =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        registering: false,
        usernamevalue: "",
        passwordvalue: ""
      };
    }

    componentDidMount() {
      if (localStorage.getItem("jwt")) {
        let token = localStorage.getItem("jwt")
        axios
          .post("http://localhost:5000/api/auth/checkauth", {token: token})
          .then(res => {
            res.data ? this.setState({ loggedIn: true }) : localStorage.clear();
          });
      }
    }

    handleChanges = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    submitLogin = e => {
      e.preventDefault();
      axios
        .post("http://localhost:3300/api/login", {
          username: `${this.state.usernamevalue}`,
          password: `${this.state.passwordvalue}`
        })
        .then(res => {
          localStorage.setItem("jwt", res.data.token);
          this.setState({ loggedIn: true });
        })
        .catch(err => alert(err));
    };

    toggleRegister = () => {
      this.setState(currentState => ({
        registering: !currentState.registering
      }));
    };

    handleLogout = () => {
      localStorage.clear();
      this.setState({ loggedIn: false })
    };

    conditionalRender = () => {
      if (this.state.loggedIn) {
        return (
          <JokesPage
            handleLogout={this.handleLogout}
          />
        );
      } else {
        if (this.state.registering) {
          return <Register toggleRegister={this.toggleRegister} />;
        } else {
          return (
            <Login
              passwordvalue={this.state.passwordvalue}
              usernamevalue={this.state.usernamevalue}
              handleChanges={this.handleChanges}
              submitLogin={this.submitLogin}
              toggleRegister={this.toggleRegister}
            />
          );
        }
      }
    };

    render() {
      return this.conditionalRender();
    }
  };

export default Authentication;
