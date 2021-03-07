import Chart from 'react-apexcharts'

import PropTypes from 'prop-types'

function Charts ({ seriesData, chartType, title, getData }) {

  const chartData = {
    series: [{
      name: 'Price',
      data: Array.from(seriesData).reverse()
    }],

    options: {
      chart: {
        height: 350,
        type: chartType,
        events: {
          click: (event, chartContext, config) => {
            if (config.dataPointIndex !== -1 
              && chartData.options.chart.type === 'bar') {

              getData(chartData.series[0].data[config.dataPointIndex].x)  
            }
          },
          dataPointMouseEnter: (event) => {
            event.target.style.cursor = "pointer"
          }
        }
      },

      title: {
        text: title,
        align: 'center',
        style: {
          fontSize: '26px',
        }
      },
      subtitle: {
        text: chartType === 'bar' ? 
          'Click in the bar to see company stock prices' : '',
        align: 'center'
      },

      colors: [
        '#081524',
        '#4f8ff7',
        '#216fed',
        '#de4343'
      ],

      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '50%',
          distributed: true,
        },

        candlestick: {
          colors: {
            upward: '#216fed',
            downward: '#de4343'
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
          title: {
            style: {
              fontSize: '18px'
            }
          },
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
    

  }

  return (
    <div>
        <Chart
          options={chartData.options}
          series={chartData.series}
          width='85%'
          type={chartType}
        />   
    </div>
  )
}

Charts.propTypes = {
  series: PropTypes.object,
  chartType: PropTypes.string,
  title: PropTypes.string,
  getData: PropTypes.func,
}

Charts.defaultProps = {
  series: {
    name: '',
    data: []
  },
  chartType: '',
  title: '',
  getData: null
}

export default Charts
