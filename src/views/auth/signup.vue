<template>
  <div style="height: 70%;">
    <el-row>
      <el-col :span="10" :offset="7" style="margin-top: 60px;">
        <el-card class="login-form-layout" >
          <el-form autoComplete="on"
                   :model="signUpForm"
                   label-position="left">
            <h2 class="login-title color-main" style="text-align: center">Welcome to shopping </h2>
            <el-form-item prop="username">
              <el-input name="username"
                        type="text"
                        v-model="signUpForm.username"
                        autoComplete="on"
                        placeholder="enter your username please">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password"
                        type="password"
                        v-model="signUpForm.password"
                        autoComplete="on"
                        placeholder="enter your password please">
              </el-input>
            </el-form-item>
            <el-form-item prop="passwordRepeat">
              <el-input name="passwordRepeat"
                        type="passwordRepeat"
                        v-model="signUpForm.passwordRepeat"
                        autoComplete="on"
                        placeholder="enter your password again please">
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 60px;">
              <div style="width: 15%"></div>
              <el-button style="width: 70%;" type="primary" @click="handleSignUpForm(signUpForm)" >
                sign up
              </el-button>
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
  name: 'signup',
  data () {
    return {
      signUpForm: {
        username: '',
        password: '',
        passwordRepeat:''
      },
    }
  },
  methods:{
    handleSignUpForm (signUpForm) {
      if(this.checkSignUpForm(signUpForm)){
        axios.post(process.env.VUE_APP_BASE_URL+'/memberSignUp',{username:signUpForm.username,password:signUpForm.password }).then(response => {
          this.$router.push('/login')
        })
      }
    },
    checkSignUpForm(signUpForm) {
      if(signUpForm.username===''||signUpForm.password===''||signUpForm.passwordRepeat==='') {
        this.$message({
          message: 'Please enter your username and password',
          type: 'warning'
        });
        return true
      }else if(signUpForm.password.length<6) {
        this.$message({
          message: 'Password length must be at least 6 characters',
          type: 'warning'
        });
        return false
      }else if(signUpForm.password.length>20){
        this.$message({
          message: 'Password length can not exceed 20 characters',
          type: 'warning'
        });
        return false
      } else if(signUpForm.password!==signUpForm.passwordRepeat){
        this.$message({
          message: 'The two passwords are inconsistent',
          type: 'warning'
        });
        return false
      }else{
        return true
      }
    }
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
