<script setup>
import {ref,onMounted} from "vue";

const yearSale=ref();
const monthSale=ref();
const yearCarbon=ref();
const monthCarbon=ref();
const dayCarbon=ref();
import * as echarts from 'echarts';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
};

option && myChart.setOption(option);



</script>

<template>
  <div class="el-main">
    <div class="first">
      <el-main>
        <el-dialog>

        </el-dialog>
      </el-main>
      <el-container>
    <div class="main">

    </div>
        </el-container>
    </div>



  </div>
</template>

<style scoped lang="scss">

</style>