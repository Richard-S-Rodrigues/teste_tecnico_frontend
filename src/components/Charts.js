import { useHistory } from "react-router-dom";

import Chart from "react-apexcharts";

import PropTypes from "prop-types";

function Charts({ seriesData, chartType, title }) {
  const history = useHistory();

  const chartBar = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: (event, chartContext, config) => {
          if (config.dataPointIndex !== -1) {
            // Redirect to specific company stocks when clicked in a bar
            history.push(
              `/stocks/${chartData.series[0].data[config.dataPointIndex].x}`
            );
          }
        },
        dataPointMouseEnter: (event) => {
          event.target.style.cursor = "pointer";
        },
      },
    },
  };

  const chartCandlestick = {
    chart: {
      height: 350,
      type: "candlestick",
    },
  };

  const chartPolarArea = {
    chart: {
      height: 350,
      type: "polarArea",
    },
  };

  const chartData = {
    series: [
      {
        name: "Price",
        data: Array.from(seriesData).reverse(),
      },
    ],

    options: {
      chart:
        chartType === "bar"
          ? chartBar.chart
          : chartType === "candlestick"
          ? chartCandlestick
          : chartType === "polarArea" && chartPolarArea,

      title: {
        text: title,
        align: "center",
        style: {
          fontSize: "26px",
        },
      },
      subtitle: {
        text:
          chartType === "bar"
            ? "Click in the bar to see company stock prices"
            : "",
        align: "center",
      },

      colors: ["#262e38", "#4f8ff7", "#216fed", "#de4343"],

      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "50%",
          distributed: true,
        },

        candlestick: {
          colors: {
            upward: "#216fed",
            downward: "#de4343",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },

      responsive: [
        {
          breakpoint: 438,
          options: {
            title: {
              style: {
                fontSize: "18px",
              },
            },
            subtitle: {
              style: {
                fontSize: "16px",
              },
            },
            chart: {
              width: "100%",
              height: 500,
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      {chartType === "bar" ? (
        <Chart
          options={chartData.options}
          series={chartData.series}
          width="85%"
          type="bar"
        />
      ) : chartType === "candlestick" ? (
        <Chart
          options={chartData.options}
          series={chartData.series}
          width="85%"
          type="candlestick"
        />
      ) : (
        chartType === "polarArea" && (
          <Chart
            options={chartData.options}
            series={chartData.series}
            width="85%"
            type="polarArea"
          />
        )
      )}
    </div>
  );
}

Charts.propTypes = {
  series: PropTypes.object,
  chartType: PropTypes.string,
  title: PropTypes.string,
};

Charts.defaultProps = {
  series: {
    name: "",
    data: [],
  },
  chartType: "",
  title: "",
};

export default Charts;
