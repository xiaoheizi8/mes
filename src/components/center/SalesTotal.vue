<script setup>
import { queryPlan } from "../../api/show.js";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const data = ref([]);

const mergeData = (rawData) => {
  const merged = {};
  rawData.forEach((item) => {
    if (!merged[item.date]) {
      merged[item.date] = { ...item };
    } else {
      merged[item.date].salesPlan += item.salesPlan;
      merged[item.date].salesOver += item.salesOver;
      merged[item.date].percentage =
          (merged[item.date].salesOver / merged[item.date].salesPlan) * 100;
    }
  });
  return Object.values(merged);
};

const fetchData = async () => {
  const res = await queryPlan();
  const rawData = Array.isArray(res.data.data) ? res.data.data : [];
  data.value = mergeData(rawData);
  renderChart();
};

const renderChart = () => {
  const chartDom = document.getElementById("completion-rate-chart");
  const myChart = echarts.init(chartDom);

  const dates = data.value.map((item) => item.date); // 获取年月
  const salesPlans = data.value.map((item) => item.salesPlan); // 计划销售额
  const salesOvers = data.value.map((item) => item.salesOver); // 已销售额
  const completionRates = data.value.map(
      (item) => (item.salesOver / item.salesPlan) * 100
  ); // 完成率百分比

  const option = {
    title: {
      text: "完成率统计折线图",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const item = data.value[params[0].dataIndex];
        return `
          <div>
            <div><strong>年月:</strong> ${item.date}</div>
            <div><strong>已销售额:</strong> ${item.salesOver}</div>
            <div><strong>计划销售额:</strong> ${item.salesPlan}</div>
            <div><strong>完成率:</strong> ${item.percentage.toFixed(2)}%</div>
          </div>
        `;
      },
    },
    legend: {
      data: ["计划销售额", "已销售额", "完成率"],
      bottom: 10,
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: { rotate: 45 },
    },
    yAxis: [
      {
        type: "value",
        name: "销售额",
        position: "left",
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "完成率 (%)",
        position: "right",
        axisLabel: {
          formatter: "{value}%",
        },
      },
    ],
    series: [
      {
        name: "计划销售额",
        type: "bar",
        data: salesPlans,
        itemStyle: { color: "#73c0de" },
        emphasis: { focus: "series" },
      },
      {
        name: "已销售额",
        type: "bar",
        data: salesOvers,
        itemStyle: { color: "#5470c6" },
        emphasis: { focus: "series" },
      },
      {
        name: "完成率",
        type: "line",
        yAxisIndex: 1,
        data: completionRates,
        itemStyle: { color: "#91cc75" },
        emphasis: { focus: "series" },
      },
    ],
  };

  myChart.setOption(option);
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div id="completion-rate-chart" style="width: 400px; height: 400px;"></div>
</template>

<style scoped>
</style>
