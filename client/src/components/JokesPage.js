import React, { Component } from "react";
import axios from "axios";
import Jokes from "./Jokes";
axios.defaults.withCredentials = true;

class JokesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("jwt")
    axios
      .get("http://localhost:3300/api/jokes/", {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Jokes jokesarray={this.state.jokes} />
         <button style={buttonstyles} onClick={this.props.handleLogout}>Log Out</button>
      </div>
    );
  }
}

const buttonstyles = {
  width: '30%',
  height: '100px',
  backgroundColor: "orange",
  color: "black",
  textAlign: "center",
  fontSize: "20px"
}

export default JokesPage;