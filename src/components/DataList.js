import React, { Component } from "react";
import '../App.css';
// Import Highcharts
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.min.js";
import HighchartsReact from "highcharts-react-official";

// import Websocket from 'react-websocket';

const URL = 'ws://localhost:8081/ws'

class DataList extends Component {

//   state = {
//     clients: [],
//   }

//   ws = new WebSocket(URL)

//   componentDidMount() {
//     this.ws.onopen = () => {
//       // on connecting, do nothing but log it to the console
//       console.log('connected')
//     }

//     this.ws.onmessage = evt => {
//       // on receiving a message, set the state with the client data
//       // const message = JSON.parse(evt.data)
//       const message = JSON.parse(evt.data);


//       console.log(message);
//       this.processMessage(message)
//     }

//     this.ws.onclose = () => {
//       console.log('disconnected')
//     }
//   }

//   componentWillUnmount() {
//     this.ws.close();
//   }

//   processMessage = message =>
//   this.setState(state => ({ clients: message }))


// render() {
//   return (
//     <div className="clientTable">
//       <table>
//         <tbody>
//     {this.state.clients.map(client => (
//       <div key={client.id}>
//               <tr>
//                 <td>{client.id}</td>
//                 <td>{client.packets}</td>
//                 <td>{client.bandwidth}</td>
//               </tr>
//       </div>
//       ))}
//         </tbody>
//       </table>

//     </div>
//   )
// }
//}

constructor(props) {
  super(props);
  this.chartUpdate = this.chartUpdate.bind(this);
  this.chartRef = React.createRef();
  this.state = {
    options: {
      chart: {
        style: {
          fontFamily: "Circular, sans-serif"
        }
      },
      series: [
        {
          type: "scatter",
          data: [10, 15, 20]
        }
      ]
    }
  };
}

componentDidMount() {
  var chart = this.refs.chartRef.chart;
  console.log(chart);
  chart.addSeries({                        
    data: [13,15,17]
}, false);
}

chartUpdate(e) {
  this.setState({
    options: {
      series: [
        { data: [Math.random() * 20, Math.random() * 20, Math.random() * 20] }
      ]
    }
  });
}

render() {
  return (
    <div id="container">
      <button onClick={this.chartUpdate}>redraw</button>
      <HighchartsReact
        constructorType={"stockChart"}
        updateArgs={[true, true, true]}
        highcharts={Highcharts}
        ref={"chartRef"}
        options={this.state.options}
      />
    </div>
  );
}
}


export default DataList;
