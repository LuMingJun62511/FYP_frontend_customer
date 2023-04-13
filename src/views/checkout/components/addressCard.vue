<template>
  <el-card shadow="always" class="ad-card">
    <el-form :model="address" v-if="!changing">
      <el-form-item >
        <p>收货人: {{address.name}} 联系电话 :{{address.phoneNumber}}  </p>
      </el-form-item>
      <el-form-item >
        <p>line1: {{address.line1}} line2 :{{address.line2}} city: {{address.line1}}  </p>
      </el-form-item>
      <div style="display: flex; justify-content: center;">
        <el-button type="primary" @click="changeInfo">modify this</el-button>
        <el-button type="primary" @click="useInfo">use this</el-button>
      </div>
    </el-form>


    <el-form :model="address" v-if="changing">
      <el-form-item label="name">
        <el-input v-model="address.name">{{address.name}}</el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="address.phoneNumber">{{address.phoneNumber}}</el-input>
      </el-form-item>
      <el-form-item label="line1">
        <el-input v-model="address.line1">{{address.line1}}</el-input>
      </el-form-item>
      <el-form-item label="line2">
        <el-input v-model="address.line2">{{address.line2}}</el-input>
      </el-form-item>
      <el-form-item label="city">
        <el-input v-model="address.city">{{address.city}}</el-input>
      </el-form-item>
      <div style="display: flex; justify-content: center;">
        <el-button type="primary" @click="saveInfo">save this</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>

import axios from "axios";

export default {
  name: "addressCard",
  data(){
    return {
      changing:false,
    }
  },
  props:['address'],
  // props:{
  //   address:{
  //     type:Object,
  //     default(){
  //       return {
  //         id: 2101,
  //         member_id: 1,
  //         name: 'fyk',
  //         phone_number: '089123123',
  //         line1: 'test1',
  //         line2: 'test2',
  //         city: 'dublin',
  //         default_status: 1,
  //       }
  //     }
  //   }
  // },
  methods:{
    changeInfo(){
      this.changing = true;
    },
    useInfo(){
      console.log("待会把这套信息直接存到新订单里")
      // this.$emit('useInfo',this.address);
    },
    saveInfo(){
      this.changing = false;
      axios.post('http://localhost:8080/api/cp/updateAddress',this.address)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },


}
</script>

<style scoped>
.ad-card{
  width: 300px;
  margin: 20px;
}
</style>
