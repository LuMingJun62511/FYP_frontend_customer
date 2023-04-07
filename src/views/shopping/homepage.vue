<template>
  <shopping-header></shopping-header>

  <el-row>
    <el-col :span="5">
      <p>大sider，展示所有商品种类</p>
    </el-col>
    <el-col :span="14">
      <p>大滚动栏，展示广告</p>
    </el-col>
    <el-col :span="5">
      <p>公告</p>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="12">
      <p>特价区</p>
    </el-col>
    <el-col :span="12">
      <p>新品区</p>
    </el-col>
  </el-row>
</template>

<script>
import ShoppingHeader from "@/views/layout/shoppingHeader.vue";

export default {
  name: "homepage",
  components: {ShoppingHeader}
}
</script>

<style scoped>

</style>
