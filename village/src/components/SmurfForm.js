import React, { Component } from 'react';

const SmurfForm = (props) => {
    return (
      <div className="SmurfForm">
        <form onSubmit={props.addSmurf}>
          <input
            onChange={props.handleInputChange}
            placeholder="name"
            value={props.input.name}
            name="name"
          />
          <input
            onChange={props.handleInputChange}
            placeholder="age"
            value={props.input.age}
            name="age"
          />
          <input
            onChange={props.handleInputChange}
            placeholder="height"
            value={props.input.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
}

export default SmurfForm;
