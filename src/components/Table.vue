<script setup>
import {ref} from 'vue';
// const data=[
//         {
//             "id": 1,
//             "materialCode": "M001",
//             "materialName": "钢板",
//             "ckCode": "W001",
//             "ckName": "一号仓库",
//             "currentStock": 50,
//             "stockStatus": "正常"
//         },
//         {
//             "id": 2,
//             "materialCode": "M002",
//             "materialName": "铝材",
//             "ckCode": "W002",
//             "ckName": "二号仓库",
//             "currentStock": 10,
//             "stockStatus": "不足"
//         },
//         {
//             "id": 3,
//             "materialCode": "M003",
//             "materialName": "塑料",
//             "ckCode": "W003",
//             "ckName": "三号仓库",
//             "currentStock": 200,
//             "stockStatus": "溢出"
//         },
//         {
//             "id": 4,
//             "materialCode": "M004",
//             "materialName": "玻璃",
//             "ckCode": "W004",
//             "ckName": "四号仓库",
//             "currentStock": 80,
//             "stockStatus": "正常"
//         },
//         {
//             "id": 5,
//             "materialCode": "M005",
//             "materialName": "铜管",
//             "ckCode": "W005",
//             "ckName": "五号仓库",
//             "currentStock": 5,
//             "stockStatus": "不足"
//         },
//         {
//             "id": 6,
//             "materialCode": "M001",
//             "materialName": "钢板",
//             "ckCode": "W001",
//             "ckName": "一号仓库",
//             "currentStock": 50,
//             "stockStatus": "正常"
//         },
//         {
//             "id": 7,
//             "materialCode": "M002",
//             "materialName": "铝材",
//             "ckCode": "W002",
//             "ckName": "二号仓库",
//             "currentStock": 10,
//             "stockStatus": "不足"
//         },
//         {
//             "id": 8,
//             "materialCode": "M003",
//             "materialName": "塑料",
//             "ckCode": "W003",
//             "ckName": "三号仓库",
//             "currentStock": 200,
//             "stockStatus": "溢出"
//         },
//         {
//             "id": 9,
//             "materialCode": "M004",
//             "materialName": "玻璃",
//             "ckCode": "W004",
//             "ckName": "四号仓库",
//             "currentStock": 80,
//             "stockStatus": "正常"
//         },
//         {
//             "id": 10,
//             "materialCode": "M005",
//             "materialName": "铜管",
//             "ckCode": "W005",
//             "ckName": "五号仓库",
//             "currentStock": 5,
//             "stockStatus": "不足"
//         }
//     ];


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
