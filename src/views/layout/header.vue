<template>
  <div class="header-container">
    <el-row
        class="header-row"
        align="middle"
    >
      <el-col :span="10" >
        <p>Delivery at every Monday, order before Sunday midnight please</p>
      </el-col>

      <el-col :span="3" :offset="2" style="text-align: center">
        <router-link to="/home" style="text-decoration: none">
          home page
        </router-link>
      </el-col>
      <el-col :span="3" style="text-align: center">
        <router-link to="/memberCenter" style="text-decoration: none">
          member center
        </router-link>
      </el-col>
      <el-col :span="3" style="text-align: center">
        <router-link to="/myOrders" style="text-decoration: none">
          orders
        </router-link>
      </el-col>
      <el-col :span="3" style="text-align: center">
        <router-link v-show="!checkLogin" to="/login" style="text-decoration: none">
          log in
        </router-link>
        <p v-show="checkLogin" style="cursor: pointer" @click="handleLogOut">
          logout
        </p>
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
  methods:{
    handleLogOut(){
      this.$store.commit('SET_LOGIN',false)
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.header-container {
  background-color: #a1e9d2;
  height: 50px;
  align-content: center;
}
</style>
