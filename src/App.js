import React, { Component } from "react";
import ReactDOM from "react-dom";
import C3Chart from "react-c3js";
import "c3/c3.css";
import Axios from "axios";

import Menu from "./components/Menu";
import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      igData: {
        columns: [
          ["political", 0],
          ["Non-Political", 10]
        ],
        type: "donut",
        onclick: function(d, i) {},
        onmouseover: function(d, i) {},
        onmouseout: function(d, i) {}
      },
      twtData: {
        columns: [
          ["political", 0],
          ["Non-Political", 10]
        ],
        type: "donut",
        onclick: function(d, i) {},
        onmouseover: function(d, i) {},
        onmouseout: function(d, i) {}
      },
      tumbData: {
        columns: [
          ["political", 0],
          ["Non-Political", 10]
        ],
        type: "donut",
        onclick: function(d, i) {},
        onmouseover: function(d, i) {},
        onmouseout: function(d, i) {}
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gatherData = this.gatherData.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    Axios.get("http://localhost:5000/getinstagram", {
      params: {
        item: "Dummy Data"
      }
    })
      .then(response => {
        console.log("IG working...");
        console.log("IG done!");
      })
      .catch(error => {
        console.log(error);
      });

    Axios.get("http://localhost:5000/gettwitter", {
      params: {
        item: "Dummy Data"
      }
    })
      .then(response => {
        console.log("Twitter working...");
        console.log("Twitter done!");
      })
      .catch(error => {
        console.log(error);
      });

    Axios.get("http://localhost:5000/gettumblr", {
      params: {
        item: "Dummy Data"
      }
    })
      .then(response => {
        console.log("Tumblr working...");
        console.log("Tumblr done!");
      })
      .catch(error => {
        console.log(error);
      });
  }

  gatherData() {
    Axios.get("http://localhost:5000/gatherdata", {})
      .then(response => {
        console.log(response);
        let igData = { ...this.state.igData }; // this makes a copy of the default state params
        igData.columns[0][1] = response.data[0][0];
        igData.columns[1][1] = response.data[0][1];
        this.setState({ igData });

        let twtData = { ...this.state.twtData };
        twtData.columns[0][1] = response.data[1][0];
        twtData.columns[1][1] = response.data[1][1];
        this.setState({ twtData });

        let tumbData = { ...this.state.tumbData };
        tumbData.columns[0][1] = response.data[2][0];
        tumbData.columns[1][1] = response.data[2][1];
        this.setState({ tumbData });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="menu">
          <Menu
            handleSubmit={this.handleSubmit}
            gatherData={this.gatherData}
            readyToCompileData={this.state.dataReadyToCompile}
            data={this.state.data}
            compileData={this.compileData}
          />
        </div>
        <div className="graph-tables">
          <div className="graph">
            <h2>Instagram</h2>
            <C3Chart data={this.state.igData} />
          </div>
          <div className="graph">
            <h2>Twitter</h2>
            <C3Chart data={this.state.twtData} />
          </div>
          <div className="graph">
            <h2>Tumblr</h2>
            <C3Chart data={this.state.tumbData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
