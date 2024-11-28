<template>
  <div class="timer">
    <timer/>
  </div>
<div class="left">
<total/>
</div>
  <div class="center">
<PowerCount/>
  </div>
  <div class="right">
<DataTable/>
  </div>
</template>

<script>
import Total from "../components/Total.vue";
import Timer from "../components/Timer.vue";
import PowerCount from "../components/PowerCount.vue";
import DataTable from "../components/DataTable.vue";

export default {
  name: "Index",
  components: {DataTable, PowerCount, Timer, Total}
}
</script>

<style scoped>
.left{
  top:0;
  left:0;
  display: flex;
  flex-direction: column;
}
</style>