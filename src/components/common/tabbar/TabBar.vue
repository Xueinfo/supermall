<template>
    <div id="tab-bar">
        <slot></slot>
   </div>
</template>
<script>
export default {
    name:"tabbar"
}
</script>
<style scoped>
#tab-bar{
  display: flex;
  height: 49px;
  background-color: #f6f6f6;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow:0px -1px 0 rgba(100, 100, 100, .2);
  font-size: 14px;
}

</style>