<template xmlns:el-col="http://www.w3.org/1999/html">
  <div style="height: 70%;">
    <el-row>
      <el-col :span="10" :offset="7" style="margin-top: 60px;">
        <el-card class="login-form-layout" >
          <el-form autoComplete="on"
                   :model="loginForm"
                   label-position="left">
            <h2 class="login-title color-main" style="text-align: center">Welcome to shopping </h2>
            <el-form-item prop="username">
              <el-input name="username"
                        type="text"
                        v-model="loginForm.username"
                        autoComplete="on"
                        placeholder="enter your username please">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password"
                        type="password"
                        @keyup.enter="handleLogin"
                        v-model="loginForm.password"
                        autoComplete="on"
                        placeholder="enter your password please">
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 60px;">
              <div style="width: 15%"></div>
              <el-button style="width: 70%;" type="primary" @click="handleLogin(loginForm)" >
                login
              </el-button>
              <router-link to="/signup" style="text-decoration: none; text-align: center ">
                Do not have an account yet? register here
              </router-link>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <div class="footer">
    <img src="@/assets/images/setu.png" class="setu" style="vertical-align: middle;max-width: 100px;max-height:100px ">
    <p>Shop Ease developed by Yikun Fan</p>
  </div>

</template>

<script>

import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
    }
  },
  computed:{
    checkLogin(){
      return this.$store.state.isLogin
    },
  },
  methods:{
    handleLogin (loginForm) {
      const store = this.$store
      axios.post(process.env.VUE_APP_BASE_URL+'/memberLogin',loginForm).then(response => {
        if(response.data){
          store.commit('SET_LOGIN',response.data)

          axios.post(process.env.VUE_APP_BASE_URL+'/findMember',loginForm).then(response => {
            store.commit('SET_USER_ID',response.data.id)
          })
          this.$router.push('/')
        }
      })

    },
  }
}
</script>

<style scoped>
.header-row {
  background-color:#a1e9d2;
  height:80px;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #a1e9d2;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10%;
  text-align: center;
}

</style>
