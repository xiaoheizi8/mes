<template>
<!--  <div class="timer">-->
<!--   -->
<!--  </div>-->
<div class="main">
    <div class="left">
      <total/>
      <PowerCount/>
      <DataTable/>
    </div>
    <div class="center">
<TotalShow/>

    </div>
    <div class="right">

      <ProductionTotal/>
    </div>
  
  <timer/>
</div>


</template>

<script>

import Total from "../components/Total.vue";
import Timer from "../components/Timer.vue";
import PowerCount from "../components/PowerCount.vue";
import DataTable from "../components/DataTable.vue";
import DataShow from "../components/DataShow.vue";
import ProductionTotal from "../components/ProductionTotal.vue";
import TotalShow from "../components/center/TotalShow.vue";
// import Table from "../components/Table.vue";

export default {
  name: "Index",
  components: {TotalShow, ProductionTotal, DataShow, DataTable, PowerCount, Timer, Total}
}


</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
}
.left{
   width: 35%;
  border: solid 1px black;
}
.center{
  width: 35%;

  border: solid 1px blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;*/
  top: 0;
}
.right{
  width: 35%;
  border: solid 1px red;
}
</style>