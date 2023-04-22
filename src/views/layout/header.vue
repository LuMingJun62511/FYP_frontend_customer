<template>
  <div class="header-container">
    <el-row
        v-if="!checkLogin"
        class="header-row"
        align="middle"
    >
      <el-col :span="10" >
        <p>Delivery at every Monday, order before Sunday midnight please</p>
      </el-col>

      <el-col :span="3" :offset="2">
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
        <router-link to="/memberCenter" style="text-decoration: none">
          member center
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="/myOrders" style="text-decoration: none">
          orders
        </router-link>
      </el-col>
    </el-row>

    <el-row
        v-if="checkLogin"
        class="header-row"
        align="middle"
    >
      <el-col :span="10" >
        <p>Delivery at every Monday, order before Sunday midnight please</p>
      </el-col>

      <el-col :span="3" :offset="5">
        <router-link to="/home" style="text-decoration: none">
          home page
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="/memberCenter" style="text-decoration: none">
          member center
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="/myOrders" style="text-decoration: none">
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
    this.$store.commit('SET_USER_ID',1);
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
