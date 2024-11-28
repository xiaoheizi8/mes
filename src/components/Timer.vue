<template>
<div class="time-tag">

  <div class="time-content">
    <span>当前日期:{{currentDate}}</span>
    <span>当前星期:{{currentWeekday}}</span>
    <span>当前时间:{{currentTime}}</span>
  </div>
</div>
</template>

<script setup>
 import {ref, onMounted,onUnmounted} from "vue";
 //初始化日期,年份,日期
 const currentDate=ref();
 const currentWeekday=ref();
 const currentTime=ref();

 //获取时间
const getTime= ()=>{
   const date=new Date();
   currentDate.value=date.toLocaleDateString();
   currentWeekday.value=date.toLocaleString('zh',{weekday:'long'});
   currentTime.value=date.toLocaleTimeString();

 }
let timer=null;
 onMounted(()=>{
   timer=setInterval(getTime,1000)
 })
 onUnmounted(() => {
   clearInterval(timer); // 组件卸载时清除定时器
 });
</script>

<style scoped>
.time-tag {
  position: fixed;
  top: 20px; /* 可以根据需要调整 */
  right: 20px; /* 可以根据需要调整 */
  background-color: #f0f0f0; /* 标签背景颜色 */
  border: 1px solid #ddd; /* 标签边框 */
  border-radius: 8px; /* 标签圆角 */
  padding: 10px; /* 标签内边距 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 标签阴影 */
  z-index: 1000; /* 确保标签在最上层 */
}

.time-content {
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  color: #333;
}

.time-content span {
  display: block;
  margin-bottom: 5px;
}
</style>