<template>
  <shopping-header></shopping-header>
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
export default {
  name: "oneProduct"
}
</script>

<style scoped>

</style>
