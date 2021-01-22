import React, { Component } from "react";
import DataGraph from "./components/DataGraph";
import DataList from "./components/DataList";
import DynamicChart from "./components/DynamicChart";

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showHideGraph: false,
      showHideList: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {
      case "showHideGraph":
        this.setState({ showHideGraph: !this.state.showHideGraph });
        this.setState({showHideList: false});
        break;
      case "showHideList":
        this.setState({ showHideList: !this.state.showHideList });
        this.setState({showHideGraph: false});
        break;
      default:
        console.log("error setting state");
    }
  }

  render() {
    const { showHideGraph, showHideList } = this.state;
    return (
      <div>
        <div className="buttons">
          <button onClick={() => this.hideComponent("showHideGraph")}>
            Click to toggle Graph component
          </button>
          <button onClick={() => this.hideComponent("showHideList")}>
            Click to toggle List component
          </button>
        </div>
        {showHideGraph && <DynamicChart />}

        {showHideList && <DataList />}

      </div>
    );
  }
}

export default App;
