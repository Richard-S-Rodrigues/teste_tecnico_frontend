import Chart from 'react-apexcharts'

function Charts ({ series }) {
  const chartData = {
    options: {
      chart: {
        height: 350,
        type: 'bar'
      },

      xaxis: {
        categories: ['Open', 'Close']
      }

      /* colors: {
          backgroundBarColors: ['#ab2615'],
      }, */
    },

    series: series

  }

  return (
    <div>
      <div className='row'>
        <div className='mixed-chart'>
          <Chart
            options={chartData.options}
            series={chartData.series}
            width='100%'
          />
        </div>
      </div>
    </div>
  )
}

export default Charts
