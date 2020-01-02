import React, { Component } from "react";
import axios from "axios";

// axios
//   .get("http://localhost:5002/api/users")
//   .then(res => {
//     console.log(res.data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

class Landing extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get(`http://localhost:5002/api/users`).then(res => {
      const users = res.data;
      this.setState({ users });
    });
  }

  render() {
    return (
      <div>
        <h2>Landing Page</h2>
        <ul>
          {this.state.users.map(person => (
            <li>{person.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Landing;
