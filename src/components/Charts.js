import Chart from 'react-apexcharts'

import PropTypes from 'prop-types'

function Charts ({ series }) {
  
  const chartData = {
    options: {
      chart: {
        height: 450,
        type: 'line'
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

Charts.propTypes = {
  series: PropTypes.array
}

Charts.defaultProps = {
  series: {
    name: '',
    data: []
  }
}

export default Charts
