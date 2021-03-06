import Chart from 'react-apexcharts'

import PropTypes from 'prop-types'

function Charts ({ seriesData, chartType, title }) {

  const chartData = {
    options: {
      chart: {
        height: 350,
        type: chartType,
      },

      subtitle: {
        text: title,
        align: 'center',
        style: {
          fontSize: '26px',
        }
      },

      colors: [
        '#081524',
        '#4c92fc',
        '#669ced',
        '#ab2615'
      ],

      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '50%',
          distributed: true,
        },

        candlestick: {
          colors: {
            upward: '#669ced',
            downward: '#ab2615'
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
          
      responsive: [{
        breakpoint: 438,
        options: {
          subtitle: {
            style: {
              fontSize: '16px',           
            }
          },
          chart: {
            width: '100%',
            height: 500
          }
        }
      }],
    
    },
    
    series: [{
      name: 'Price',
      data: Array.from(seriesData).reverse()
    }],   

  }

  return (
    <div style={{margin: '0 auto'}}>   
      <Chart
        options={chartData.options}
        series={chartData.series}
        width='95%'
        type={chartType}
      />
    </div>
  )
}

Charts.propTypes = {
  series: PropTypes.object,
  chartType: PropTypes.string,
  title: PropTypes.string
}

Charts.defaultProps = {
  series: {
    name: '',
    data: []
  },
  chartType: '',
  title: ''
}

export default Charts
