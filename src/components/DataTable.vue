<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { getAll } from '../api/show.js'; // 调用接口
import * as echarts from 'echarts';

const data = ref([]);

let intervalId;
const getStockStatusClass = (status) => {
  console.log(status); // 打印 scope 对象以便于调试
  switch (status) {
    case '正常':
      return 'stock-status-normal';
    case '不足':
      return 'stock-status-low';
    case '溢出':
      return 'stock-status-overflow';
    default:
      return ''; // 默认不设置颜色
  }
};
const fetchData = async () => {
  const res = await getAll();
  console.log(res.data.data); // 在此查看返回的响应

  data.value = Array.isArray(res.data.data) ? res.data.data : [];
  // data.value=String.isPrototypeOf(res.data.data)
};


onMounted(async () => {
  await fetchData();
  nextTick(() => {
     startScrolling();
    // renderChart();*/
  });
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>


<template>
  <el-row class="table" data:data>
    <el-col :span="12" class="cow">
      <div class="table-container">
        <div class="table-content">
          <el-table :data="data">
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
             >
             <template #default="scope">
               <div :class="getStockStatusClass(scope.row.stockStatus)">{{ scope.row.stockStatus }}</div>
             </template>
            </el-table-column>
          </el-table>

        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>


.cow{
  width: 100%;
  max-width: 100%;
  margin: auto;
}
.table-container {
  width: 100%;
  overflow: hidden;
  border: 1px solid black;
  color: black !important;
  padding-bottom: 20px;

}

.table-content {
  transition: transform 1s linear;
  will-change: transform;
}



/* 动态背景色和字体颜色 */
.stock-status-normal {
  background-color: white; /* 背景白色 */
  color: black !important; /* 字体黑色 */
}

.stock-status-low {
  background-color: #dff0d8; /* 浅绿色背景 */
  color: green !important;  /* 字体绿色 */
}

.stock-status-overflow {
  background-color: #f2dede; /* 浅红色背景 */
  color: red !important;    /* 字体红色 */
}

</style>
