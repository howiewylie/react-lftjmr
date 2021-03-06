import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import '../App.css';

// import Websocket from 'react-websocket';

const URL = 'wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD'

class DynamicChart extends Component {

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.afterChartCreated = this.afterChartCreated.bind(this);
  }

  state = {
    trade: "x",
  }
  

  ws = new WebSocket(URL)

  componentDidMount() {    
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onerror = () => {
      // on connecting, do nothing but log it to the console
      var socket = this.ws;
      console.log('error')
    }

  }

  componentWillUnmount() {
    this.ws.close();
  }

  afterChartCreated(highcharts) {
    this.internalChart = highcharts;


      this.ws.onmessage = evt => {
        // on receiving a message, set the state with the client data
        // const message = JSON.parse(evt.data)
          var series = this.internalChart.series;

          const message = JSON.parse(evt.data);
          console.log(message);
          if(message.table != null) {
          // this.processMessage(message)
        let trade = message;
        // tradeMap.map(trade => (
            console.log(trade.table);
            // this.setState(state => ({ trade: trade.table }));
            // trade.data.map(processMessage);
            for(let i = 0; i < trade.data.length; i++) {
              this.processMessage(trade.data[i], series);
            }
        // ));
  

        }
      }
    
    
      this.ws.onclose = () => {
        console.log('disconnected')
      }
  
  }

  processMessage(data, series) {

    var x = (new Date(data.timestamp)).getTime(), // current time
    y = data.price,
    z = data.size;

    if(data.side === "Buy") {
      series[0].addPoint([x, y], true, false);
    }
    else if(data.side === "Sell") {
      series[1].addPoint([x, y], true, false);
    }
    if(data.side === "Buy" || data.side === "Sell") {
      series[2].addPoint([x, z], true, false);
    }
  }

   options = {
    chart: {
    },

    time: {
        useUTC: true
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        enabled: true,
        inputEnabled: false,
    },

    xAxis: {
        // tickPixelInterval: 150
     },
     yAxis: [{
        title: {
           text: 'Value'
        },
        plotLines: [{
           value: 0,
           width: 1,
           color: '#808080'
        }]
     },{
        	opposite: true
        }],
            tooltip: {
      enabled: true
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        marker: {
          enabled: true
        }
      }
    },

    title: {
        text: 'Live random data'
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: "Buy",
        type: "line",
        data: [null],
        yAxis: 0
    },
    {
        
        name: "Sell",
        type: "line",
        data: [null],
        yAxis: 0
    }
    ,
    {
        
        name: "Size",
        type: "column",
        data: [null],
        yAxis: 1
    }
    ]

    // series: [{
    //   name: 'Random data',
    //   data: [null]
      // data: (function () {
      //     // generate an array of random data
      //     var data = [],
      //         time = (new Date()).getTime(),
      //         i;

      //     for (i = -999; i <= 0; i += 1) {
      //         data.push([
      //             time + i * 1000,
      //             Math.round(Math.random() * 100)
      //         ]);
      //     }
      //     return data;
      // }())
  // }]

  };

render() {
  return (
      <div>
    <div>
        <HighchartsReact highcharts={Highcharts} ref={"chartRef"} constructorType={"stockChart"} options={this.options} callback={this.afterChartCreated}/>
    </div>
    </div>
  )
}
}

export default DynamicChart;
