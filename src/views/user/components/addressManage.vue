<template>
  <div class="addresses-container" style="width: 1100px; background-color: #f2f2f2;margin: 20px auto;">
    <el-table
        :data="addresses"
        style="width: 1050px;margin-left: auto;margin-right: auto;margin-top: 20px">
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
          <el-button type="danger" @click="deleteAddress(scope.row.id)">
            delete this
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="create-new-address" style="width: 45%;background-color: #f2f2f2;margin-left: auto;margin-right: auto;margin-top: 20px">
    <h3 style="text-align: center">manage your address</h3>
        <el-form>
          <el-form-item label="receiver name">
            <el-input v-model="newAddress.name" style="width: 75%"></el-input>
          </el-form-item>
          <el-form-item label="receiver phone">
            <el-input v-model="newAddress.phoneNumber" style="width: 75%"></el-input>
          </el-form-item>
          <el-form-item label="line1">
            <el-input v-model="newAddress.line1" style="width: 75%"></el-input>
          </el-form-item>
          <el-form-item label="line2">
            <el-input v-model="newAddress.line2" style="width: 75%"></el-input>
          </el-form-item>
          <el-form-item label="city">
            <el-input v-model="newAddress.city" style="width: 75%"></el-input>
          </el-form-item>
        </el-form>
    <div class="save-button" style="display: flex; justify-content: center;">
      <el-button type="primary" @click="saveNewAddress">Save this address</el-button>
      <el-button type="primary" @click="clearContent">Clear the content</el-button>
    </div>
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
      if(this.newAddress.id === ''){
        this.newAddress.id = this.generateId();
      }
      // this.newAddress.id = this.generateId();
      await axios.post(process.env.VUE_APP_BASE_URL+'/updateAddress', this.newAddress)
          .then(response => {
          })
          .catch(error => {
            console.log(error);
          });
      await axios.get(process.env.VUE_APP_BASE_URL+'/getAddresses/'+this.$store.state.userId)
          .then(response => {
            this.addresses = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    clearContent(){
      this.newAddress = {
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
      axios.get(process.env.VUE_APP_BASE_URL+'/getAddresses/'+this.$store.state.userId)
          .then(response => {
            this.addresses = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    modifyAddress(id){
      const index = this.addresses.findIndex(item => item.id === id);
      this.newAddress = { ...this.addresses[index]};
    },

    async deleteAddress(id){
      const index = this.addresses.findIndex(item => item.id === id);
      this.addresses.splice(index, 1);
      await axios.post(process.env.VUE_APP_BASE_URL+'/deleteAddress/'+id).then(response => {
      }).catch(error => {
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
