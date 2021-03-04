import { useEffect } from 'react'
import Chart from "react-apexcharts";

function Charts({ series, times }) {

  console.log(series)

  const chartData = {
    options: {
      chart: {
        height: 350,
        type: 'bar'
      },

      xaxis: {
        categories: times
      },

      /* colors: {
          backgroundBarColors: ['#ab2615'],
      }, */
    },

    series: {
      name: 'AAPL',
      price: 2000
    },

  }


  return (
    <div>
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            width="100%"
          />
        </div>
      </div>
    </div>
  )
  
}

export default Charts
