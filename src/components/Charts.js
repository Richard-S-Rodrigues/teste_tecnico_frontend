import Chart from 'react-apexcharts'

import PropTypes from 'prop-types'

function Charts ({ seriesData, chartType, title }) {

  const chartData = {
    options: {
      chart: {
        height: 350,
        type: 'bar',
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
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
          
    },
    series: [{
      name: 'Price',
      data: seriesData
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
  series: PropTypes.object
}

Charts.defaultProps = {
  series: {
    name: '',
    data: []
  }
}

export default Charts
