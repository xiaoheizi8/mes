<template>
  <div id="main" style="width: 100%; height: 300px; justify-content: top; display: flex;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, nextTick } from 'vue';
import { getTotalCount } from "../api/show.js";

const officeWaterPercentage = ref(0);
const officeElectricityPercentage = ref(0);
const prodWaterPercentage = ref(0);
const prodElectricityPercentage = ref(0);
const totalAll = ref(0);

async function getData() {
  const result = await getTotalCount();
  const {
    officeWaterPercentage: officeWater,
    officeElectricityPercentage: officeElectricity,
    prodWaterPercentage: prodWater,
    prodElectricityPercentage: prodElectricity,
    totalAll: all
  } = result.data.data;

  officeWaterPercentage.value = officeWater;
  officeElectricityPercentage.value = officeElectricity;
  prodWaterPercentage.value = prodWater;
  prodElectricityPercentage.value = prodElectricity;
  totalAll.value = all;
}

function renderChart() {
  const chartDom = document.getElementById('main');
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)' // 显示数量和百分比
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '能耗占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        // label: {
        //   show: true,
        //   formatter: '{b}: {c} ({d}%)' // 标签显示数量和百分比
        // },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: officeWaterPercentage.value, name: '办公用水' },
          { value: officeElectricityPercentage.value, name: '办公耗电' },
          { value: prodWaterPercentage.value, name: '生产用水' },
          { value: prodElectricityPercentage.value, name: '生产耗电' }
        ]
      }
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: `总能耗\n${totalAll.value}`,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
      }
    }
  };




  myChart.setOption(option);
}

onMounted(async () => {
  await getData();
  nextTick(() => {
    renderChart();
  });
});
</script>

<style scoped>
</style>
