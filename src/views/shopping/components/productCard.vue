<template>
  <el-card :body-style="{ padding: '0px' }">
<!--    <img src="~examples/assets/images/hamburger.png" class="image">-->
    <div style="padding: 14px;">
      <span>好吃的汉堡</span>
      <div class="bottom clearfix">
        <el-button type="text" class="button">操作按钮</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "productCard",
  props:['name','id','pic','price']
}
</script>

<style scoped>

</style>
