import React from 'react';

const SmurfDelete = (props) => {
    return (
      <div className="SmurfDelete">
        <form onSubmit={props.killSmurf}>
          <input
            onChange={props.handleInputChange}
            placeholder="name"
            value={props.input}
          />
          <button type="submit">Time to leave the village</button>
        </form>
      </div>
    );
}

export default SmurfDelete;