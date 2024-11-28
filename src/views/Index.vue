<template>
<!--  <div class="timer">-->
<!--   -->
<!--  </div>-->
<div class="main">
    <div class="left">
      <total/>
    </div>
    <div class="center">
      <PowerCount/>
<!--      <DataShow/>-->
      <DataTable/>

    </div>
    <div class="right">
      <timer/>
    </div>
</div>


</template>

<script>

import Total from "../components/Total.vue";
import Timer from "../components/Timer.vue";
import PowerCount from "../components/PowerCount.vue";
import DataTable from "../components/DataTable.vue";
import DataShow from "../components/DataShow.vue";
// import Table from "../components/Table.vue";

export default {
  name: "Index",
  components: { DataShow, DataTable, PowerCount, Timer, Total}
}


</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
}
.left{
  width: 20%;
  border: solid 1px black;
}
.center{
  width: 60%;
  border: solid 1px blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.right{
  width: 20%;
  border: solid 1px red;
}
</style>