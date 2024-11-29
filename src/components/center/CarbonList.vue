<script setup>

import { ref, onMounted } from 'vue';
import { getCarbonTotal } from '../../api/show.js';

// 创建一个响应式变量来存储数据
const data = ref([]);

// 在组件挂载时获取数据
onMounted(async () => {
  const response = await getCarbonTotal();
  console.log("响应",response)

    // 将数据存储到响应式变量中，并按照碳排放量降序排序
    data.value = Array.isArray(response.data.data) ? response.data.data : [];

});

</script>

<template>
  <el-row class="table" data:data>
    <el-col :span="12" class="cow">
      <div class="table-container">
        <div class="table-content">
          <el-table :data="data">
            <el-table-column prop="id" label="编号" width="50"></el-table-column>
            <el-table-column prop="equipment" label="设备" width="75"></el-table-column>
            <el-table-column prop="productionNum" label="生产数量" width="75"></el-table-column>
            <el-table-column prop="carbon" label="碳排放量" width="75"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="css">

</style>