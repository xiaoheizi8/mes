<script setup>
import { ref, onMounted } from 'vue';
import { queryTotal } from "../../api/show.js";
import * as echarts from "echarts";

const data = ref([]);

// Fetch the data from API
const fetchData = async () => {
  const res = await queryTotal();
  data.value = Array.isArray(res.data.data) ? res.data.data : [];
  console.log("你想要的", data.value[0]?.yearMonth); // log the first year's month value
  renderChart(); // Now that we have data, render the chart
};

// Trigger fetchData on component mount
onMounted(async () => {
  await fetchData();
});

// Render the chart with the fetched data
const renderChart = () => {
  const chartDom = document.getElementById("sales-chart");
  const myChart = echarts.init(chartDom);

  // Extract the dates, total sales, and contract amounts from the fetched data
  const dates = data.value.map(item => item.yearMonth); // Extract "yearMonth" for the x-axis
  const totalSales = data.value.map(item => item.totalSalesAmount); // Extract total sales for the y-axis
  const contractAmounts = data.value.map(item => item.contractAmount); // Extract contract amounts for the y-axis

  // Set up the chart options
  const option = {
    title: {
      text: "销售统计曲线图",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const total = params[0].data;
        const contract = params[1].data;
        const date = params[0].axisValue;
        return `
          <div>
            <div><strong>年月:</strong> ${date}</div>
            <div><strong>总销售额:</strong> ${total} 万</div>
            <div><strong>合同额:</strong> ${contract} 万</div>
          </div>
        `;
      },
    },
    legend: {
      data: ["总销售额", "合同额"],
      bottom: 10,
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: {rotate: 45}, // Rotate labels to make them readable
    },
    yAxis: {
      type: "value",
      name: "金额 (万)",
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: [
      {
        name: "总销售额",
        type: "line",
        data: totalSales,
        itemStyle: {color: "#5470c6"},
        smooth: true,
      },
      {
        name: "合同额",
        type: "line",
        data: contractAmounts,
        itemStyle: {color: "#91cc75"},
        smooth: true,
      },
    ],
  };

  // Set the option to the chart
  myChart.setOption(option);
};
</script>

<template>
  <!-- This is where the chart will be rendered -->
  <div id="sales-chart" style="width: 100%; height: 400px;"></div>
</template>

<style scoped lang="css">
/* You can style your chart container here */
</style>
