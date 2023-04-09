<template>
  <search-bar></search-bar>
  <el-row>
    <el-col :span="8">
      <el-card>
        <p>商品图片</p>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-form>
        <p>商品信息</p>
      </el-form>
    </el-col>

  </el-row>
</template>

<script>
import SearchBar from "@/views/shopping/components/searchBar.vue";

export default {
  name: "oneProduct",
  components: {SearchBar}
}
</script>

<style scoped>

</style>
