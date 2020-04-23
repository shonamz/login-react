import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";

class App extends Component {
  state = {
    logins: [],
    login: {
      uname: "sample username",
      password: "sample password"
    }
  };

  componentDidMount() {
    this.getLogin();
  }

  getLogin = _ => {
    fetch("http://localhost:4000/logins")
      .then(response => response.json())
      .then(response => this.setState({ logins: response.data }))
      .catch(err => console.error(err));
  };
  addLogin = _ => {
    const { logins, login } = this.state;
    fetch(
      `http://localhost:4000/logins/add?uname=${login.uname}&password=${login.password}`
    )
      .then(this.getLogin)
      .catch(err => console.err(err));
  };
  renderLogin = ({ id, uname }) => <div key={id}>{uname}</div>;

  render() {
    const { logins, login } = this.state;
    return (
      <div className="App">
        {logins.map(this.renderLogin)}
        <div>
          <input
            value={login.uname}
            onChange={e =>
              this.setState({ login: { ...login, uname: e.target.value } })
            }
          />
          <input
            value={login.password}
            onChange={e =>
              this.setState({ login: { ...login, password: e.target.value } })
            }
          />
          <button onClick={this.addLogin}>Add login</button>
        </div>
      </div>
    );
  }
}

export default App;
