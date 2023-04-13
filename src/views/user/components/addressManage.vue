<template>
  <div style="width: 1050px; margin: auto">
    <el-table
        :data="addresses"
        style="width: 100%">
      <el-table-column
          label="receiver name"
          prop="name"
          width="150">
      </el-table-column>
      <el-table-column
          label="phone number"
          prop="phoneNumber"
          width="150">
      </el-table-column>
      <el-table-column
          label="line1"
          prop="line1"
          width="150">
      </el-table-column>
      <el-table-column
          label="line2"
          prop="line2"
          width="150">
      </el-table-column>
      <el-table-column
          label="city"
          prop="city"
          width="150">
      </el-table-column>
      <el-table-column
          label="modify"
          prop="id"
          width="150">
        <template v-slot="scope">
          <el-button @click="modifyAddress(scope.row.id)">
            modify this
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
          label="delete"
          prop="id"
          width="150">
        <template v-slot="scope">
          <el-button @click="deleteAddress(scope.row.id)">
            delete this
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div style="width: 75%;margin: auto">
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
        <el-button type="primary" @click="saveNewAddress">Save this address</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addressManage",
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
    async saveNewAddress() {
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
            console.log(response);
            console.log(this.addresses)
          })
          .catch(error => {
            console.log(error);
          });
    },

    modifyAddress(id){
      const index = this.addresses.findIndex(item => item.id === id);
      this.newAddress = this.addresses[index];
    },

    async deleteAddress(id){
      const index = this.addresses.findIndex(item => item.id === id);
      this.addresses.splice(index, 1);
      await axios.post('http://localhost:8080/api/cp/deleteAddress/'+id)
          .then(response => {
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

</style>
