import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      input: {
        name: "",
        age: "",
        height: ""
      }
    };
  }

  componentDidMount() {
    this.getSmurfs();
  }

  getSmurfs = () => {
    console.log("PANG")
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  };
  
  addSmurf = event => {
    event.preventDefault();
    console.log("POOOOOO")
    axios
    .post("http://localhost:3333/smurfs", this.state.input)
    .then(res => this.setState({ input: { name: "", age: "", height: "" } }))
    .then(this.getSmurfs)
    .catch(err => {
      console.log(err);
    });
  }

  handleInputChange = ev => {
    this.setState({ input: { ...this.state.input, [ev.target.name]: ev.target.value } });
  };


  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to={"/"}>LOOK AT ALL THE SMURFS</NavLink>
          <NavLink to={"/smurf-form"}>ADD A SMURFING SMURF</NavLink>
        </nav>
        <Route exact path="/" render={props =>
          <Smurfs
            {...props} 
            smurfs={this.state.smurfs}
          />
        }/>
        <Route path="/smurf-form" render={props =>
          <SmurfForm
            {...props}
            input={this.state.input}
            handleInputChange={this.handleInputChange}
            addSmurf={this.addSmurf}
          />
        }/>
      </div>
    );
  }
}

export default App;
