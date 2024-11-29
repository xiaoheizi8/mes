<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { totalAll } from "../../api/show.js"; // 获取接口数据
import * as echarts from 'echarts';

const data = ref({});  // 用于保存接口返回的数据

// 获取数据
const fetchData = async () => {
  const res = await totalAll(); // 从接口获取数据
  console.log('接口返回的数据:', res);  // 打印数据，查看是否正确
  if (res && res.data) {
    data.value = res.data.data;  // 如果数据存在，保存到 data.value 中
    renderCharts();  // 调用 renderCharts 函数渲染图表
  }
};

// 渲染销售额和碳排放图表
const renderCharts = () => {
  nextTick(() => {
    // 销售额图表
    var salesChartDom = document.getElementById('salesChart');
    if (!salesChartDom) return;

    var mySalesChart = echarts.init(salesChartDom);
    var salesOption = {
      title: {
        text: '销售额',
        subtext: '销售额数据总览'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
      },
      grid: {
        left: '12%',
        right: '20%',
        bottom: '20%',  // 修改了底部的距离，确保标签不被遮挡
        containLabel: true
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['年销售量', '月销售量', '今日销售量']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: [
            data.value.total_sales_year || 0,
            data.value.total_sales_month || 0,
            data.value.total_sales_day || 0
          ]
        },
        {
          name: 'Sales',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'inside'  // 确保标签显示在柱子内
          },
          data: [
            data.value.total_sales_year || 0,
            data.value.total_sales_month || 0,
            data.value.total_sales_day || 0
          ]
        }
      ]
    };
    mySalesChart.setOption(salesOption);

    // 碳排放图表
    var carbonChartDom = document.getElementById('carbonChart');
    if (!carbonChartDom) return;

    var myCarbonChart = echarts.init(carbonChartDom);
    var carbonOption = {
      title: {
        text: '碳排放',
        subtext: '碳排放数据总览'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
      },
      grid: {
        left: '12%',
        right: '20%',
        bottom: '20%',  // 修改了底部的距离，确保标签不被遮挡
        containLabel: true
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['年碳排放量', '月碳排放量', '今日碳排放量']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: [
            data.value.total_carbon_year || 0,
            data.value.total_carbon_month || 0,
            data.value.total_carbon_day || 0
          ]
        },
        {
          name: 'Carbon Emissions',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'inside'  // 确保标签显示在柱子内
          },
          data: [
            data.value.total_carbon_year || 0,
            data.value.total_carbon_month || 0,
            data.value.total_carbon_day || 0
          ]
        }
      ]
    };
    myCarbonChart.setOption(carbonOption);
  });
};

// 页面加载时调用 fetchData 获取数据
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="main">
    <!-- 销售额图表 -->
    <div id="salesChart" style="width: 100%; height: 300px;"></div>
    <!-- 碳排放图表 -->
    <div id="carbonChart" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<style scoped>
.main{
  position: fixed;
  top: 0;
}
</style>
