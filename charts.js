const colors = ["#f78f1e", "#3359FF", "#7333FF", "#30a6d3", "#775DD0", "#3F51B5", "#4CAF50", "#2B908F", "#2E294E", "#D7263D"];

// Historical Chart
const historical = (height, values, minDate, maxDate, yAxisText, toolTipXFormat, tooltipYMetric) => {
  // Set yaxis decimals
  let valuesArr = values.flatMap((item) => item.data.map((dataItem) => dataItem[1]));
  let maxVal = Math.max(...valuesArr);
  let yAxisDecimals = maxVal < 2 ? 2 : 0;
  let yAxisMax = maxVal > 2 ? undefined : Math.ceil(maxVal);

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
        export: {
          csv: {
            headerCategory: "Date",
            dateFormatter(timestamp) {
              return moment(timestamp).format("YYYY-MM-DD HH:mm");
            },
          },
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
    colors: colors,
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
        format: moment(minDate).format("YYYY-MM-DD") == moment(maxDate).format("YYYY-MM-DD") ? "MMM dd, HH:mm" : "MMM dd",
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
      max: yAxisMax,
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
            maximumFractionDigits: yAxisDecimals,
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
          return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(val) + tooltipYMetric;
        },
      },
    },
    noData: {
      text: "No Data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#000000",
        fontSize: "16px",
        fontFamily: "Helvetica",
      },
    },
  };

  return options;
};

// Historical Reservoir Chart
const historicalLevel = (height, values, minDate, maxDate, yAxisText, toolTipXFormat) => {
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
        export: {
          csv: {
            headerCategory: "Date",
            dateFormatter(timestamp) {
              return moment(timestamp).format("YYYY-MM-DD HH:mm");
            },
          },
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
    colors: colors,
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
        format: moment(minDate).format("YYYY-MM-DD") == moment(maxDate).format("YYYY-MM-DD") ? "MMM dd, HH:mm" : "MMM dd",
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
      max: 120,
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
          return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(val) + `%`;
        },
      },
    },
    annotations: {
      position: "back",
      yaxis: [
        {
          y: 100,
          strokeDashArray: 0,
          borderColor: "#007358",
          label: {
            borderColor: "#007358",
            style: {
              color: "#fff",
              background: "#007358",
            },
            text: "100% Capacity",
          },
        },
      ],
    },
    noData: {
      text: "No Data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#000000",
        fontSize: "16px",
        fontFamily: "Helvetica",
      },
    },
  };

  return options;
};

// Typical Day Chart
const typicalDay = (height, data, yAxisText, tooltipYMetric) => {
  const max = data.map((a) => a.max);
  const perc90 = data.map((a) => a.percentile90);
  const perc75 = data.map((a) => a.percentile75);
  const avg = data.map((a) => a.avg);
  const perc25 = data.map((a) => a.percentile25);
  const perc10 = data.map((a) => a.percentile10);
  const min = data.map((a) => a.min);
  const times = data.map((a) => `${a.time.split(":")[0]}:${a.time.split(":")[1]}`);

  // Set yaxis decimals
  let maxVal = Math.max(...max);
  let yAxisDecimals = maxVal < 2 ? 2 : 0;
  let yAxisMax = maxVal > 2 ? undefined : Math.ceil(maxVal);

  var options = {
    series: [
      {
        name: "Max",
        data: max,
      },
      {
        name: "90th Percentile",
        data: perc90,
      },
      {
        name: "75th Percentile",
        data: perc75,
      },
      {
        name: "Average",
        data: avg,
      },
      {
        name: "25th Percentile",
        data: perc25,
      },
      {
        name: "10th Percentile",
        data: perc10,
      },
      {
        name: "Min",
        data: min,
      },
    ],
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: "area",
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
      fontFamily: "inherit",
    },
    colors: ["#ececec", "#bbbbbb ", "#747474", "#000000", "#747474", "#bbbbbb ", "#ececec"],
    legend: {
      showForSingleSeries: true,
      position: "top",
      labels: {
        colors: "#565674",
      },
    },
    stroke: {
      curve: "smooth",
      width: [0, 0, 0, 2, 0, 0, 0],
      dashArray: [0, 0, 0, 0, 0, 0, 0],
    },
    fill: {
      type: "solid",
      opacity: 1,
      colors: [
        (value) => {
          if (value.seriesIndex == 2 || value.seriesIndex == 3) {
            return "#747474";
          } else if (value.seriesIndex == 1 || value.seriesIndex == 4) {
            return "#bbbbbb";
          } else if (value.seriesIndex == 0 || value.seriesIndex == 5) {
            return "#ececec";
          } else {
            return "#ffffff";
          }
        },
      ],
      gradient: "none",
    },
    xaxis: {
      tickAmount: 24,
      categories: times,
      axisBorder: {
        show: false,
      },
      title: {
        text: "Time",
        style: {
          color: "#565674",
          fontSize: "12px",
        },
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotateAlways: true,
        style: {
          colors: "#565674",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
      min: 0,
      max: yAxisMax,
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
            maximumFractionDigits: yAxisDecimals,
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
          show: false,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (val) => {
          return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(val) + tooltipYMetric;
        },
      },
    },
    noData: {
      text: "No Data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#000000",
        fontSize: "16px",
        fontFamily: "Helvetica",
      },
    },
  };

  return options;
};

// Typical Day Chart
const typicalDayLevel = (height, data, yAxisText, tooltipYMetric) => {
  const max = data.map((a) => a.max);
  const perc90 = data.map((a) => a.percentile90);
  const perc75 = data.map((a) => a.percentile75);
  const avg = data.map((a) => a.avg);
  const perc25 = data.map((a) => a.percentile25);
  const perc10 = data.map((a) => a.percentile10);
  const min = data.map((a) => a.min);
  const times = data.map((a) => `${a.time.split(":")[0]}:${a.time.split(":")[1]}`);

  // Set yaxis decimals
  let maxVal = Math.max(...max);
  let yAxisDecimals = maxVal < 2 ? 2 : 0;
  let yAxisMax = maxVal > 2 ? undefined : Math.ceil(maxVal);

  var options = {
    series: [
      {
        name: "Max",
        data: max,
      },
      {
        name: "90th Percentile",
        data: perc90,
      },
      {
        name: "75th Percentile",
        data: perc75,
      },
      {
        name: "Average",
        data: avg,
      },
      {
        name: "25th Percentile",
        data: perc25,
      },
      {
        name: "10th Percentile",
        data: perc10,
      },
      {
        name: "Min",
        data: min,
      },
    ],
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: "area",
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
      fontFamily: "inherit",
    },
    colors: ["#ececec", "#bbbbbb ", "#747474", "#000000", "#747474", "#bbbbbb ", "#ececec"],
    legend: {
      showForSingleSeries: true,
      position: "top",
      labels: {
        colors: "#565674",
      },
    },
    stroke: {
      curve: "smooth",
      width: [0, 0, 0, 2, 0, 0, 0],
      dashArray: [0, 0, 0, 0, 0, 0, 0],
    },
    fill: {
      type: "solid",
      opacity: 1,
      colors: [
        (value) => {
          if (value.seriesIndex == 2 || value.seriesIndex == 3) {
            return "#747474";
          } else if (value.seriesIndex == 1 || value.seriesIndex == 4) {
            return "#bbbbbb";
          } else if (value.seriesIndex == 0 || value.seriesIndex == 5) {
            return "#ececec";
          } else {
            return "#ffffff";
          }
        },
      ],
      gradient: "none",
    },
    xaxis: {
      tickAmount: 24,
      categories: times,
      axisBorder: {
        show: false,
      },
      title: {
        text: "Time",
        style: {
          color: "#565674",
          fontSize: "12px",
        },
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotateAlways: true,
        style: {
          colors: "#565674",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
      min: 0,
      max: 100,
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
            maximumFractionDigits: yAxisDecimals,
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
          show: false,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (val) => {
          return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(val) + tooltipYMetric;
        },
      },
    },
    noData: {
      text: "No Data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#000000",
        fontSize: "16px",
        fontFamily: "Helvetica",
      },
    },
  };

  return options;
};

const typicalDayAdvanced = (height, data, yAxisText, tooltipYMetric) => {
  const max = data.map((a) => a.max);
  const perc90 = data.map((a) => a.percentile90);
  const perc75 = data.map((a) => a.percentile75);
  const avg = data.map((a) => a.avg);
  const perc25 = data.map((a) => a.percentile25);
  const perc10 = data.map((a) => a.percentile10);
  const min = data.map((a) => a.min);
  let times = data.map((a) => a.time);

  if ($("#typical-timeframe-select").val() == "week") {
    times = times.map((value) => dayMapping[value] || value);
  }

  // Set yaxis decimals
  let maxVal = Math.max(...max);
  let yAxisDecimals = maxVal < 2 ? 2 : 0;
  let yAxisMax = maxVal > 2 ? undefined : Math.ceil(maxVal);

  typicalDaySeries = [
    {
      name: "Max",
      type: "area",
      data: max,
    },
    {
      name: "90th Percentile",
      type: "area",
      data: perc90,
    },
    {
      name: "75th Percentile",
      type: "area",
      data: perc75,
    },
    {
      name: "Average",
      type: "area",
      data: avg,
    },
    {
      name: "25th Percentile",
      type: "area",
      data: perc25,
    },
    {
      name: "10th Percentile",
      type: "area",
      data: perc10,
    },
    {
      name: "Min",
      data: min,
    },
  ];

  let options = {
    series: typicalDaySeries,
    dataLabels: {
      enabled: false,
    },
    chart: {
      //type: "area",
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
      fontFamily: "inherit",
    },
    colors: ["#ececec", "#bbbbbb ", "#747474", "#000000", "#747474", "#bbbbbb ", "#ececec", "#0000FF", "#6CB4EE"],
    legend: {
      showForSingleSeries: true,
      position: "top",
      labels: {
        colors: "#565674",
      },
    },
    stroke: {
      curve: "smooth",
      width: [0, 0, 0, 2, 0, 0, 0, 2, 2],
      dashArray: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    fill: {
      type: "solid",
      opacity: 1,
      colors: [
        (value) => {
          if (value.seriesIndex == 2 || value.seriesIndex == 3) {
            return "#747474";
          } else if (value.seriesIndex == 1 || value.seriesIndex == 4) {
            return "#bbbbbb";
          } else if (value.seriesIndex == 0 || value.seriesIndex == 5) {
            return "#ececec";
          } else if (value.seriesIndex == 7) {
            return "#0000FF";
          } else {
            return "#6CB4EE";
          }
        },
      ],
      gradient: "none",
    },
    xaxis: {
      categories: times,
      axisBorder: {
        show: false,
      },
      title: {
        text: "Time",
        style: {
          color: "#565674",
          fontSize: "12px",
        },
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotateAlways: true,
        style: {
          colors: "#565674",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
      min: 0,
      max: yAxisMax,
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
            maximumFractionDigits: yAxisDecimals,
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
          show: false,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (val) => {
          return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(val) + ` ${tooltipYMetric}`;
        },
      },
    },
    noData: {
      text: "No Data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#000000",
        fontSize: "16px",
        fontFamily: "Helvetica",
      },
    },
  };
};

// Add all functions in an object
const Charts = {
  historical: historical,
  historicalLevel: historicalLevel,
  typicalDay: typicalDay,
  typicalDayLevel: typicalDayLevel,
  typicalDayAdvanced: typicalDayAdvanced,
};
