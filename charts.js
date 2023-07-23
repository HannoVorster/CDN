const historical = (
  height,
  values,
  minDate,
  maxDate,
  yAxisText,
  toolTipXFormat,
  tooltipYMetric
) => {
  var options = {
    series: values,
    chart: {
      type: "line",
      height: height,
      toolbar: {
        show: true,
        offsetY: 300,
        tools: {
          selection: false,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
      },
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      fontFamily: "inherit",
      events: {
        beforeResetZoom: function (chartContext, opts) {
          return {
            xaxis: {
              min: moment(minDate).startOf("h").valueOf(),
              max: moment(maxDate).endOf("h").valueOf(),
            },
          };
        },
      },
    },
    colors: [
      "#f78f1e",
      "#3359FF",
      "#7333FF",
      "#30a6d3",
      "#775DD0",
      "#3F51B5",
      "#4CAF50",
      "#2B908F",
      "#2E294E",
      "#D7263D",
    ],
    legend: {
      showForSingleSeries: true,
      position: "top",
      labels: {
        colors: "#565674",
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      min: moment(minDate).startOf("h").valueOf(),
      max: moment(maxDate).endOf("h").valueOf(),
      labels: {
        datetimeUTC: false,
        format: "MMM dd, HH:mm",
      },
      title: {
        text: "Date Time",
        style: {
          color: "#565674",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
      min: 0,
      title: {
        text: yAxisText,
        style: {
          color: "#565674",
          fontSize: "12px",
        },
      },
      labels: {
        formatter: (val) => {
          return Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
          }).format(val);
        },
        style: {
          colors: "#565674",
          fontSize: "12px",
        },
      },
    },
    grid: {
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: "12px",
      },
      x: {
        show: true,
        format: toolTipXFormat,
      },
      y: {
        formatter: (val) => {
          if (isNaN(val) || val == null) {
            return "No Data";
          }
          return (
            Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
              val
            ) + tooltipYMetric
          );
        },
      },
    },
  };

  return options;
};

const Charts = {
  historical: historical,
};

//module.exports = Charts;
