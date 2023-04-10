<template>
  <el-card>
    <div style="padding: 14px;">
      <!--    <img src="~examples/assets/images/hamburger.png" class="image">-->
      <p class="name">name: {{product.name}}</p>
      <p class="price">price: {{product.price}} euros</p>
      <el-button type="text" @click="handlePutInCart()">加入购物车</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "productCard",
  props:['product'],
}
</script>

<style scoped>

</style>
