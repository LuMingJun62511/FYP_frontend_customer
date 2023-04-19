<template>
  <div class="scroll-container" style="overflow-x: auto;">
    <div style="display: flex;">
      <el-scrollbar style="flex: 1;">
        <div style="display: flex;">
          <address-card v-for="address in addresses" :address="address" :key="address.id"></address-card>
          <div style="width: 300px;height: 330px">
            <p>创建新地址</p>
            <el-form>
              <el-form-item label="收货人姓名">
                <el-input v-model="newAddress.name"></el-input>
              </el-form-item>
              <el-form-item label="收货人电话">
                <el-input v-model="newAddress.phoneNumber"></el-input>
              </el-form-item>
              <el-form-item label="line1">
                <el-input v-model="newAddress.line1"></el-input>
              </el-form-item>
              <el-form-item label="line2">
                <el-input v-model="newAddress.line2"></el-input>
              </el-form-item>
              <el-form-item label="city">
                <el-input v-model="newAddress.city"></el-input>
              </el-form-item>
              <div style="display: flex; justify-content: center;">
                <el-button type="primary" @click="saveInfo">Save this address</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>


</template>

<script>
import axios from "axios";
import AddressCard from "@/views/checkout/components/addressCard.vue";

export default {
  name: "addressBoard",
  components: {AddressCard},
  data() {
    return {
      addresses: [],
      newAddress:{
        id:'',
        name:'',
        member:{
          id:this.$store.state.userId
        },
        phoneNumber:'',
        line1:'',
        line2:'',
        city:'',
        defaultStatus:0
      }
    }
  },
  methods: {
    async saveInfo() {
      this.newAddress.id = this.generateId();
      await axios.post('http://localhost:8080/api/cp/updateAddress', this.newAddress)
          .then(response => {
          })
          .catch(error => {
            console.log(error);
          });
      await axios.get('http://localhost:8080/api/cp/getAddresses/'+this.$store.state.userId)
          .then(response => {
            this.addresses = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    generateId(){
      let id = 0;
      for(let i=0;i<this.addresses.length;i++){
        if(this.addresses[i].id>id){
          id = this.addresses[i].id;
        }
      }
      return id+1;
    },

    getAddresses(){
      axios.get('http://localhost:8080/api/cp/getAddresses/'+this.$store.state.userId)
          .then(response => {
            this.addresses = response.data;
            // console.log(response);
            // console.log(this.addresses)
          })
          .catch(error => {
            console.log(error);
          });
    }

  },
  created() {
    this.getAddresses();
  }
}
</script>

<style scoped>
.scroll-container {
  width: 100%;
  background-color: #f2f2f2;
  display: flex;
  overflow-x: auto;
}
</style>
