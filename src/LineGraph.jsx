import { responsiveFontSizes } from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral'


const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };


  const chartData = (lineData, chartType='cases') => {
    const dataPoints = [];
    let lastDataPoint;
    var tempData = lineData[chartType];
    for (let date in tempData) {
        if(lastDataPoint){
            const currValue = {
                x: date,
                y: tempData[date] - lastDataPoint
            }
            dataPoints.push(currValue);
        }
        lastDataPoint = tempData[date]
    }
    return dataPoints;
}

function LineGraph({chartType = "cases"}) {
    const [data, setdata] = useState({});   
    
    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then(datas => {
                let chrtData = chartData(datas, chartType)
                setdata(chrtData);
            })
        }
        fetchData();       
    }, [chartType])

    


    return (
        <div>
            {data?.length > 0 && (
            <Line data={{
                datasets: [
                   {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },   
                ]
            }}
            options={options}
            /> )}
            
        </div>
    )
}

export default LineGraph
