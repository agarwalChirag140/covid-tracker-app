import axios from "axios"
import React from "react"
import { Line } from "react-chartjs-2"


const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.deaths) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
};
  

export const LineGraph = ({casesType, country}) => {
    const [data, setData] = React.useState({})

    React.useEffect(() => {
        axios({
            method: "get",
            url: `https://disease.sh/v3/covid-19/historical/all?lastdays=11`
        })
        .then((res) => {
            let chartData = buildChartData(res.data, casesType);
            setData(chartData)
        })
        .catch((err) => {
            console.log(err)
        })
    },[casesType])
    
    return (
        <div>
            {data?.length > 0 && (
                <Line
                data={{
                    datasets: [
                    {
                        label: `number of ${casesType}`,
                        backgroundColor: "red",
                        borderColor: "#CC1034",
                        data: data,
                    },
                    ]
                }}
                // options={options}
                />
            )}
        </div>
    )
}

