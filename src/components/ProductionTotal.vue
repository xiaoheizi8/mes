<script setup>
import {ref,onMounted} from "vue";
import {getTables} from "../api/show.js";

const data = ref([]);
const fetchData = async () => {
  const res = await getTables();
  console.log("生产统计")
  console.log(res); // 在此查看返回的响应

  data.value = Array.isArray(res.data.data) ? res.data.data : [];
  // data.value=String.isPrototypeOf(res.data.data)
};
onMounted(async ()=>{
  fetchData();
})
</script>

<template>
  <el-row class="table" data:data>
    <el-col :span="12" class="cow">
      <div class="table-container">
        <div class="table-content">
          <el-table :data="data">
            <el-table-column prop="id" label="编号" width="50"></el-table-column>
            <el-table-column prop="type" label="型号" width="60"></el-table-column>
            <el-table-column prop="typeName" label="型号名称" width="60"></el-table-column>
            <el-table-column prop="product" label="产品" width="60"></el-table-column>
            <el-table-column prop="productName" label="产品名称" width="60"></el-table-column>
            <el-table-column prop="specification" label="规格" width="60"></el-table-column>
            <el-table-column prop="specificationContent" label="规格上下文" width="60"></el-table-column>
            <el-table-column prop="carbon" label="碳排放" width="60"></el-table-column>
            <el-table-column prop="carbonValue" label="碳排放值构成" width="60"></el-table-column>
          </el-table>

        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="css">
.cow {
  bottom: 20px;
  width: 100%;
  max-width: 100%;
  margin: auto;
}
.table-container {
  width: 80%;
  overflow: hidden;
  border: 1px solid black;
  color: black !important;
  padding-bottom: 20px;
  height: 300px; /* 设置一个固定高度 */
}

.table-content {
  transition: transform 1s linear;
  will-change: transform;
}
/* 动态背景色和字体颜色 */
.stock-status-normal {
  background-color: white;
  color: black !important;
}

.stock-status-low {
  background-color: #dff0d8;
  color: green !important;
}

.stock-status-overflow {
  background-color: #f2dede;
  color: red !important;
}
</style>