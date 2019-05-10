import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import SmurfDelete from "./components/SmurfDelete"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      input: {
        name: "",
        age: "",
        height: ""
      },
      deleteInput: ""
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
  
  addSmurf = ev => {
    ev.preventDefault();
    axios
    .post("http://localhost:3333/smurfs", this.state.input)
    .then(res => this.setState({ input: { name: "", age: "", height: "" } }))
    .then(this.getSmurfs)
    .catch(err => {
      console.log(err);
    });
  }

  killSmurf = ev => {
    ev.preventDefault();
    const doomedSmurf = this.state.smurfs.find(el => this.state.deleteInput == el.name);
    console.log(doomedSmurf)
    if (doomedSmurf) {
      axios
        .delete(`http://localhost:3333/smurfs/${doomedSmurf.id}`)
        .then(this.getSmurfs)
        .then(this.setState({deleteInput: ""}))
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleInputChange = ev => {
    this.setState({ input: { ...this.state.input, [ev.target.name]: ev.target.value } });
  };

  handleDeleteInputChange = ev => {
    this.setState({ deleteInput: ev.target.value });
  };


  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink exact className="nav-link" activeClassName="active" to={"/"}>LOOK AT ALL THE SMURFS</NavLink>
          <NavLink className="nav-link" activeClassName="active" to={"/smurf-form"}>ADD A SMURFING SMURF</NavLink>
          <NavLink className="nav-link" activeClassName="active" to={"/smurf-delete"}>REMOVE A SMURF</NavLink>
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
        <Route path="/smurf-delete" render={props =>
          <SmurfDelete
            {...props}
            input={this.state.deleteInput}
            handleInputChange={this.handleDeleteInputChange}
            killSmurf={this.killSmurf}
          />
        }/>
      </div>
    );
  }
}

export default App;
