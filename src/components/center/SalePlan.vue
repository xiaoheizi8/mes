<script setup>
import {ref,onMounted} from "vue";
import { getTwoSales} from "../../api/show.js";
import * as echarts from 'echarts';

const object=ref({ salesOver: 0, salesPlan: 0 })

const fetchData = async () => {
  const res = await getTwoSales(); // 从接口获取数据
  // console.log('接口返回的数据:', res.data.data.salesOver);  // 打印数据，查看是否正确
  object.value = res.data.data;  // 如果数据存在，保存到 data.value 中
  getEcharts()

};

onMounted(async ()=>{
  fetchData();
  getEcharts();
})
function getEcharts(){
  var chartDom = document.getElementById('sales');
  var myChart = echarts.init(chartDom);
  var option;

// prettier-ignore
  let dataAxis = ['已销售额', '计划销售'];
// prettier-ignore
  let data = [object.value.salesOver,object.value.salesPlan];
  let yMax = 500;
  let dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  option = {
    title: {
      text: '渲染柱形图',
      subtext: '销售额'
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: 'pink'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'blue'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: function (params) {
            // 根据索引设置不同颜色
            return params.dataIndex === 0
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 1, color: '#188df0' }
                ])
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#ff9f7f' },
                  { offset: 1, color: '#fb7293' }
                ]);
          }
        },
        emphasis: {
          itemStyle: {
            color: function (params) {
              return params.dataIndex === 0
                  ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'red' },
                    { offset: 1, color: 'orange' }
                  ])
                  : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'green' },
                    { offset: 1, color: 'yellow' }
                  ]);
            }
          }
        },
        data: data
      }
    ]

  };
// Enable data zoom when user click bar.
  const zoomSize = 6;
  myChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
          dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
  });

  option && myChart.setOption(option);

}
</script>

<template>
  <div id="sales" style="width: 80%;height: 240px">

  </div>
</template>

<style scoped lang="css">

</style>