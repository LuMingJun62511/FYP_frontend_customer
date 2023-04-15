<template>
  <el-card style="align-content: center">
    <el-row>
      <el-col :span="4">
        <p>mark</p>
      </el-col>
      <el-col :span="7">
        <p>Process of placing an order</p>
      </el-col>
      <el-col :span="13">
        <el-steps :active="steps" finish-status="success" align-center>
          <el-step title="step 1" description="Confirm cart"></el-step>
          <el-step title="step 2" description="Payment detail"></el-step>
          <el-step title="step 3" description="Submit"></el-step>
        </el-steps>
      </el-col>
    </el-row>

    <div>
      <div v-if="steps === 0">
        <el-card style="width: 650px; background-color: #f2f2f2; margin-left: auto;margin-right:auto ;margin-top: 10px" >
          <p>Please view commodities in your cart</p>
          <el-card>
            <div style="width: 600px">
              <el-table
                  :data="$store.state.cart"
                  style="width: 100%">
                <el-table-column
                    label="commodity name"
                    prop="name"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="amount"
                    prop="amount"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="single price"
                    prop="price"
                    width="200">
                </el-table-column>
              </el-table>
            </div>
            <p style="text-align: center;">您总共购买了{{calculateAmount}}件商品，总消费{{calculatePrice}}euros</p>
            <el-row>
              <el-col :span="4" :offset="2">
                <el-button @click="handleGoBackToShop">继续购物</el-button>
              </el-col>
              <el-col :span="4" :offset="12">
                <el-button @click="handleBeginToCheckOut">开始结算</el-button>
              </el-col>
            </el-row>

          </el-card>
        </el-card>
      </div>
      <div v-if="steps === 1">
        <el-card style="width: 850px; background-color: #f2f2f2; margin-left: auto;margin-right:auto ;margin-top: 10px" >
          <p>Please fill in important information about delivery</p>

          <p>选择送达时间,反正默认是下周一送达，这里就只显示时间段了</p>
          <el-select>
            <el-option
                v-for="item in deliveryTime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <p>选择收货地址</p>
          <address-board></address-board>

        </el-card>
      </div>
      <div v-if="steps === 2">
        <el-card style="width: 650px; background-color: #f2f2f2; margin-left: auto;margin-right:auto ;margin-top: 10px" >
          <p>Please confirm your order</p>
          <p>这就是用stripe的地方了</p>
        </el-card>
      </div>


    </div>



  </el-card>
</template>

<script>
import addressBoard from "@/views/checkout/components/addressBoard.vue";


export default {
  name: "index",
  components: {addressBoard},
  data() {
    return {
      steps: 0,
      deliveryTime:[
        {value: '1', label: '8:00-10:00'},
        {value: '2', label: '10:00-12:00'},
        {value: '3', label: '12:00-14:00'},
        {value: '4', label: '14:00-16:00'},
        {value: '5', label: '16:00-18:00'},
        {value: '6', label: '18:00-20:00'},
        {value: '7', label: '20:00-22:00'},
      ]
    };
  },
  methods: {
    handleGoBackToShop() {
      this.$router.push({path: '/home'});
    },
    handleBeginToCheckOut() {
      this.steps = 1;
    },
  },
  computed: {
    calculateAmount() {
      let res = 0;
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        res += this.$store.state.cart[i].amount;
      }
      return res;
    },
    calculatePrice() {
      let res = 0;
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        res += this.$store.state.cart[i].amount * this.$store.state.cart[i].price;
      }
      return res;
    }
  }
}
</script>

<style scoped>

</style>
