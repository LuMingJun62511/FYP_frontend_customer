<template>

  <p>这个对应的是最上面窄窄一条</p>
  <el-row
      v-if="!checkLogin"
      class="header-row"
      align="middle"
      style="margin-top: 10px"
  >
    <el-col :span="8" >
      <p>统一每周一配送，请于每周天晚12点前下单</p>
    </el-col>

    <el-col :span="4" :offset="2">
      <p>登陆</p>
    </el-col>
    <el-col :span="4">
      <p>首页</p>
    </el-col>
    <el-col :span="3">
      <p>会员中心</p>
    </el-col>
    <el-col :span="3">
      <p>orders</p>
    </el-col>
  </el-row>

  <el-row
      v-if="checkLogin"
      class="header-row"
      align="middle"
      style="margin-top: 10px"
  >
    <el-col :span="8" >
      <p>统一每周一配送，请于每周天晚12点前下单</p>
    </el-col>

    <el-col :span="4" :offset="6">
      <p>首页</p>
    </el-col>
    <el-col :span="3">
      <p>会员中心</p>
    </el-col>
    <el-col :span="3">
      <p>orders</p>
    </el-col>
  </el-row>


</template>

<script>
export default {
  name: "myHeader",
  computed:{
    checkLogin() {
      console.log(this.$store.state.isLogin);
      return this.$store.state.isLogin;
    }
  },

  created() {
    this.$store.commit('SET_LOGIN',true);
  }

}
</script>

<style scoped>

</style>
