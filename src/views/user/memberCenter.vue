<template>
  <el-row>
    <el-col :span="15" :offset="1">
      <div class="profile-container" style="background-color: #f2f2f2; height:300px" >
        <p style="text-align: center">profile</p>
        <el-form :model="userInfo" label-width="120px">
          <el-form-item label="user name">
            <el-input v-model="userInfo.username" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="gender">
            <el-radio-group v-model="userInfo.gender">
              <el-radio :label="1" :checked="userInfo.gender === 1">male</el-radio>
              <el-radio :label="2" :checked="userInfo.gender === 2">female</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="phone number">
            <el-input v-model="userInfo.phone" style="width: 60%"/>
          </el-form-item>

          <el-form-item label="personalized signature">
            <el-input v-model="userInfo.personalizedSignature" type="textarea" style="width: 90%"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="modifyProfile">Modify</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-col>
    <el-col :span="6" :offset="1">
      <div class="statistic-container" style="background-color: #f2f2f2; height:300px">
        <p style="text-align: center">statistics</p>
        <el-form>
          <el-form-item label="总消费额">
            <p>{{userStatistics.consumeAmount}}</p>
          </el-form-item>
          <el-form-item label="总订单数">
            <p>{{userStatistics.orderCount}}</p>
          </el-form-item>
          <el-form-item label="loyal points数">
            <p>{{userInfo.loyalPoints}}</p>
          </el-form-item>
        </el-form>
      </div>

    </el-col>
  </el-row>
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
      axios.post('http://localhost:8080/api/cp/updateProfile',this.userInfo).then(response => {
        console.log(response.status);
      })
    }
  },
  created() {
    axios.get('http://localhost:8080/api/cp/userProfile/'+this.$store.state.userId).then(response => {
      this.userInfo = response.data;
      // console.log(this.userInfo);
    })
    axios.get('http://localhost:8080/api/cp/userStatistics/'+this.$store.state.userId).then(response => {
      this.userStatistics = response.data;
      // console.log(this.userStatistics)
    })

  },
  components: {AddressManage},
}
</script>

<style scoped>

</style>

