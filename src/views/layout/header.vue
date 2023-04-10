<template>
  <div class="header-container">
    <el-row
        v-if="!checkLogin"
        class="header-row"
        align="middle"
    >
      <el-col :span="8" >
        <p>统一每周一配送，请于每周天晚12点前下单</p>
      </el-col>

      <el-col :span="3" :offset="4">
        <router-link to="/home" style="text-decoration: none">
          log in
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="/home" style="text-decoration: none">
          home page
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="/home" style="text-decoration: none">
          member center
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="/home" style="text-decoration: none">
          orders
        </router-link>
      </el-col>
    </el-row>

    <el-row
        v-if="checkLogin"
        class="header-row"
        align="middle"
    >
      <el-col :span="8" >
        <p>统一每周一配送，请于每周天晚12点前下单</p>
      </el-col>

      <el-col :span="3" :offset="7">
        <router-link to="/home" style="text-decoration: none">
          home page
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="/home" style="text-decoration: none">
          member center
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="/home" style="text-decoration: none">
          orders
        </router-link>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: "myHeader",
  computed:{
    checkLogin() {
      return this.$store.state.isLogin;
    }
  },

  created() {
    this.$store.commit('SET_LOGIN',true);
  }

}
</script>

<style scoped>
.header-container {
  background-color: #f2f2f2;
  height: 50px;
  align-content: center;
}
</style>
