<script setup>
import {ref, onMounted, nextTick} from 'vue';
import * as echarts from "echarts";
import {salesRank} from "../../api/show.js";  // Assuming this is the API to get sales data

const salesData = ref([]);

// Fetch the sales ranking data
const fetchSalesData = async () => {
  try {
    const res = await salesRank();  // Call the sales ranking API
    if (res.data.code === 200 && Array.isArray(res.data.data)) {
      salesData.value = res.data.data;  // Extract the sales data (an array) from the response
      console.log("Sales Data:", salesData.value);  // Log the data to verify it's an array
      nextTick(() => {
        renderChart();  // Ensure the chart is rendered after data update
      });
    } else {
      console.error("Failed to fetch sales data or data is not an array", res);
    }
  } catch (error) {
    console.error("Error fetching sales data:", error);
  }
};

// Call fetchSalesData on component mount
onMounted(() => {
  fetchSalesData();
});

// Render the bar chart
const renderChart = () => {
  const chartDom = document.getElementById("sales-ranking-chart");
  const myChart = echarts.init(chartDom);

  // Ensure salesData.value is an array before calling map()
  if (!Array.isArray(salesData.value)) {
    console.error("Invalid sales data format", salesData.value);
    return;
  }

  const companyNames = salesData.value.map(item => item.companyName);
  const salesValues = salesData.value.map(item => item.salesStatus);

  // Define the chart options
  const option = {
    title: {
      text: "销售排名（TOP8）",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const companyName = params.name;
        const sales = params.value;
        return `<div><strong>${companyName}:</strong> ${sales} 万</div>`;
      },
    },
    xAxis: {
      type: "value",
      name: "销售额 (万)",
      axisLabel: {
        formatter: "{value}",
      },
    },
    yAxis: {
      type: "category",
      data: companyNames,
      axisLabel: {
        rotate: 45,  // Rotate the company names to avoid overlap
      },
    },
    series: [
      {
        name: "销售额",
        type: "bar",
        data: salesValues,
        itemStyle: {
          color: (params) => {
            // Assign a different color to each bar (you can customize this)
            const colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'];
            return colorList[params.dataIndex]; // Color from the list
          },
        },
      },
    ],
  };

  // Set the options to the chart
  myChart.setOption(option);
};
</script>

<template>
  <!-- Chart container where the sales ranking chart will be rendered -->
  <div id="sales-ranking-chart" style="width: 100%; height: 400px;"></div>
</template>

<style scoped lang="css">
/* You can add custom styles for the chart container if needed */
</style>
