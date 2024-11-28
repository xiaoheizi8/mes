<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { getAll } from '../api/show.js'; // 调用接口
import * as echarts from 'echarts';

const data = ref([]);
const tableStyle = ref({ transform: 'translateY(0px)' });
let intervalId;

const fetchData = async () => {
  const res = await getAll();
  console.log(res.data.data); // 在此查看返回的响应

  data.value = Array.isArray(res.data.data) ? res.data.data : [];
};

const startScrolling = () => {
  let translateY = 0;
  intervalId = setInterval(() => {
    translateY -= 30; // 每次滚动的高度
    if (Math.abs(translateY) >= data.value.length * 30) {
      translateY = 0; // 重置滚动位置
    }
    tableStyle.value.transform = `translateY(${translateY}px)`;
  }, 2000); // 滚动间隔
};

const renderChart = () => {
  const chartDom = document.getElementById('chart');
  const chartInstance = echarts.init(chartDom);

  const total = data.value.length;
  const statusCount = {
    正常: data.value.filter((item) => item.stockStatus === '正常').length,
    不足: data.value.filter((item) => item.stockStatus === '不足').length,
    溢出: data.value.filter((item) => item.stockStatus === '溢出').length,
  };

  const option = {
    title: {
      text: '库存状态统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '5%',
      left: 'center',
    },
    series: [
      {
        name: '库存状态',
        type: 'pie',
        radius: '50%',
        data: [
          { value: statusCount.正常, name: '正常' },
          { value: statusCount.不足, name: '不足' },
          { value: statusCount.溢出, name: '溢出' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  chartInstance.setOption(option);
};

onMounted(async () => {
  await fetchData();
  nextTick(() => {
    startScrolling();
    renderChart();
  });
});

onUnmounted(() => {
  clearInterval(intervalId);
});

// 使用 switch-case 返回对应的类
const getStockStatusClass = (status) => {
  switch (status) {
    case '正常':
      return '#ffffff'; // 白色
    case '不足':
      return '#c8f7c5'; // 绿色
    case '溢出':
      return '#f5a9a9'; // 红色
    default:
      return ''; // 默认不设置颜色
  }
};

</script>

<template>
  <el-row>
    <el-col :span="12">
      <div class="table-container">
        <div class="table-content" :style="tableStyle">
          <el-table :data="data" style="width: 900px; height: 900px;">
            <el-table-column prop="id" label="编号" width="50"></el-table-column>
            <el-table-column prop="materialCode" label="物料编码" width="100"></el-table-column>
            <el-table-column prop="materialName" label="物料名称" width="100"></el-table-column>
            <el-table-column prop="ckCode" label="仓库编码" width="100"></el-table-column>
            <el-table-column prop="ckName" label="仓库名称" width="120"></el-table-column>
            <el-table-column prop="currentStock" label="当前库存" width="100"></el-table-column>
            <el-table-column
              prop="stockStatus"
              label="库存状态"
              width="100"
              :class-name="(scope) => getStockStatusClass(scope.row.stockStatus)">
            </el-table-column>
          </el-table>

        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div id="chart" style="width: 100%; height: 400px;"></div>
    </el-col>
  </el-row>
</template>

<style scoped>
.table-container {
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  height: 200px; /* 表格可见区域高度 */
}

.table-content {
  transition: transform 1s linear;
  will-change: transform;
}

/* 添加动态的背景色 */
.normal {
  background-color: white;
}

.insufficient {
  background-color: green; /* 绿色 */
}

.overflow {
  background-color: red /* 红色 */
}
</style>
