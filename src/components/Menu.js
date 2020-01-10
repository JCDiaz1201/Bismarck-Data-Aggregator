import React from "react";

const Menu = props => {
  return (
    <div>
      <div>
        <h1>Welcome to Bismarck</h1>
        <form onSubmit={props.handleSubmit}>
          <h3>API Call</h3>
          {/* <input id="search-api" name="search-api" /> */}
          <button>Request Data</button>
        </form>
      </div>
      <div>
        <button onClick={props.gatherData}>Gather Data</button>
      </div>
    </div>
  );
};

export default Menu;
