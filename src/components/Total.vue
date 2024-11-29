<template>
  <div class="total">
    <div id="electricity" style="width: 200px; height: 200px;"></div>
    <div id="water" style="width: 200px; height: 200px;"></div>
    <div id="carbon" style="width: 200px; height: 200px;"></div>
  </div>
</template>

<script setup lang="js">
import * as echarts from "echarts";
import { getTotal } from "../api/show.js";
import { onMounted, ref } from "vue";

// 使用 ref 来存储获取的数值
const totalElectricity = ref(0);
const totalWater = ref(0);
const totalCarbon = ref(0);

// 获取数据函数
async function getData() {
  const result = await getTotal();
  // console.log("接口返回数据:", result); // 打印数据，确保结构正确

  // 解构数据并更新响应式变量
  const { totalElectricity: electricity, totalWater: water, totalCarbon: carbon } = result.data.data;
  totalElectricity.value = electricity;
  totalWater.value = water;
  totalCarbon.value = carbon;
}

// 渲染图表函数
const renderElectricityChart = () => {
  const chart = echarts.init(document.getElementById("electricity"));
  chart.setOption({

    tooltip: { formatter: "{a} <br/>{c} kWh" },
    title: { text: "总耗电量", left: "center" },
    series: [
      {
        name: "耗电量",
        type: "gauge",
        detail: { formatter: "{value}" },
        data: [{ value: totalElectricity.value, name: "kWh" }],
      },
    ],
  });
};

const renderWaterChart = () => {
  const chart = echarts.init(document.getElementById("water"));
  chart.setOption({
    title: { text: "总耗水量", left: "center" },
    tooltip: { formatter: "{a} <br/>{c} m³" },
    series: [
      {
        name: "耗水量",
        type: "gauge",
        detail: { formatter: "{value}" },
        data: [{ value: totalWater.value, name: "m³" }],
      },
    ],
  });
};

const renderCarbonChart = () => {
  const chart = echarts.init(document.getElementById("carbon"));
  chart.setOption({
    title: { text: "总碳排放量", left: "center" },
    tooltip: { formatter: "{a} <br/>{c} kg" },
    series: [
      {
        name: "碳排放量",
        type: "gauge",
        detail: { formatter: "{value}" },
        data: [{ value: totalCarbon.value, name: "kg" }],
      },
    ],
  });
};

// 在组件挂载后获取数据并渲染图表
onMounted(async () => {
  await getData();  // 获取数据
  renderElectricityChart();  // 渲染电量图表
  renderWaterChart();  // 渲染水量图表
  renderCarbonChart();  // 渲染碳排放图表
});
</script>

<style scoped>

</style>
