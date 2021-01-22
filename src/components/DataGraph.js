import React, { Component } from "react";
import SimpleChart from "../components/SimpleChart";
import '../App.css';

class DataGraph extends Component { 

  // data = [{ "x": 1, "y": 10 }, { "x": 1.4, "y": 100 }, { "x": 2.4, "y": 10 }];
  // data = "[{ x: 1, y: 10 }, { x: 1.4, y: 100 }, { x: 2.4, y: 10 }]";
  
  constructor() {
    super();
    this.state = {
      timeseries: []
    };
    this.refreshData();
  }


  refreshData() {
    fetch('http://localhost:8081/timevalues')
    .then(res => res.json())
    .then((data) => {
      this.setState({ timeseries: data })
    })
    .catch(console.log)
  }

  render() {
    // const data = [{ "x": 1, "y": 10 }, { "x": 1.4, "y": 100 }, { "x": 2.4, "y": 10 }];
    // const data = [{ x: 1, y: 108 }, { x: 1.4, y: 100 }, { x: 2.4, y: 10 }];
    return (
      <div>
      <SimpleChart chartData={this.state.timeseries}/>
      
      <div className="buttons">
        <button onClick={() => this.refreshData()}>
          refresh data
        </button>
      </div>
    </div>
    );
  }
}

export default DataGraph;
