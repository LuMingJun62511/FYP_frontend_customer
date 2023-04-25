<template>
  <h1 style="text-align: center;">Member Center</h1>
  <div class="user-info-container" style="margin: auto">
    <div class="profile-container" style="display: inline-block;background-color: #f2f2f2; height:330px;width: 680px;margin-right: 20px" >
      <h2 style="text-align: center">profile</h2>
      <el-form :model="userInfo" label-width="120px">
        <el-form-item label="user name">
          <el-input class="name-input" v-model="userInfo.username" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="gender">
          <el-radio-group v-model="userInfo.gender">
            <el-radio :label="1" :checked="userInfo.gender === 1">male</el-radio>
            <el-radio :label="2" :checked="userInfo.gender === 2">female</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="phone number">
          <el-input class="phone-input" v-model="userInfo.phone" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="personalized signature">
          <el-input class="sign-input" v-model="userInfo.personalizedSignature" type="textarea" style="width: 90%"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="modifyProfile">Modify</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="statistic-container" style="display: inline-block;background-color: #f2f2f2; height:330px;width: 400px;">
      <h2 style="text-align: center">statistics</h2>
      <el-form>
        <el-form-item class="statistic-item">
          <label class="statistic-label">Total consumption: </label>
          <p class="statistic-value">{{userStatistics.consumeAmount}}</p>
        </el-form-item>
        <el-form-item class="statistic-item">
          <label class="statistic-label">Total order count: </label>
          <p class="statistic-value">{{userStatistics.orderCount}}</p>
        </el-form-item>
        <el-form-item class="statistic-item">
          <label class="statistic-label">Loyal points: </label>
          <p class="statistic-value">{{userInfo.loyalPoints}}</p>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <div class="addresses-container">
    <address-manage></address-manage>
  </div>
</template>
<script>
import AddressManage from "@/views/user/components/addressManage.vue";
import axios from "axios";

export default {
  name: "memberCenter",
  data() {
    return {
      userInfo:{
        id:'',
        username:'',
        password:'',
        nickname:'',
        phone:'',
        gender:'',
        personalizedSignature:'',
        loyalPoints: 0,
      },
      userStatistics: {
        consumeAmount: 0,
        orderCount: 0,
        returnOrderCount: 0,
        recentOrderTime: '',
      },
    }
  },
  methods:{
    modifyProfile(){
      axios.post(process.env.VUE_APP_BASE_URL+'/updateProfile',this.userInfo).then(response => {
        console.log(response.status);
      })
    }
  },
  created() {
    axios.get(process.env.VUE_APP_BASE_URL+'/userProfile/'+this.$store.state.userId).then(response => {
      this.userInfo = response.data;
    })
    axios.get(process.env.VUE_APP_BASE_URL+'/userStatistics/'+this.$store.state.userId).then(response => {
      this.userStatistics = response.data;
    })
  },
  components: {AddressManage},
}
</script>

<style scoped>
.user-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

