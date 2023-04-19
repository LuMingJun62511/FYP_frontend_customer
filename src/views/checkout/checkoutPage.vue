<template>
  <el-card style="align-content: center">
    <el-row>
      <el-col :span="3">
        <p>mark</p>
      </el-col>
      <el-col :span="5">
        <p>Process of placing an order</p>
      </el-col>
      <el-col :span="16">
        <el-steps :active="steps" finish-status="success" align-center>
          <el-step title="step 1" description="Check your cart"></el-step>
          <el-step title="step 2" description="Delivery detail"></el-step>
          <el-step title="step 3" description="Confirm order"></el-step>
          <el-step title="step 4" description="Payment method"></el-step>
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
                <el-button @click="handleGoBackToShop">continue shopping</el-button>
              </el-col>
              <el-col :span="4" :offset="12">
                <el-button @click="steps = 1">start checkout</el-button>
              </el-col>
            </el-row>

          </el-card>
        </el-card>
      </div>
      <div v-if="steps === 1">
        <el-card style="width: 850px; background-color: #f2f2f2; margin-left: auto;margin-right:auto ;margin-top: 10px" >
          <p>Please fill in important information about delivery</p>

          <p>选择送达时间,统一下周一送达，这里就只需要选时间段了</p>
          <el-select v-model="deliveryTimeChosen">
            <el-option
                v-for="item in deliveryTime"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
          <p>选择收货地址</p>
          <address-board></address-board>
          <el-row>
            <el-col :span="4" :offset="2">
              <el-button @click="steps = 0">previous step</el-button>
            </el-col>
            <el-col :span="4" :offset="12">
              <el-button @click="steps = 2">next step</el-button>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div v-if="steps === 2">
        <el-card style="width: 650px; background-color: #f2f2f2; margin-left: auto;margin-right:auto ;margin-top: 10px" >
          <p>Please confirm your order</p>
          <el-card>
            <p>您选择的送达时间是{{deliveryTimeChosen}}</p>
            <p>您选择的收货地址是{{Address}}</p>
            <p>您的运费总共{{calculateDelivery}}</p>
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
            <p style="text-align: center;">您一共需要支付{{calculatePrice+calculateDelivery}}euros</p>
            <el-row>
              <el-col :span="4" :offset="2">
                <el-button @click="steps = 1">previous step</el-button>
              </el-col>
              <el-col :span="4" :offset="12">
                <el-button @click="handleCreateOrder">next step</el-button>
              </el-col>
            </el-row>

          </el-card>
        </el-card>
      </div>
      <div v-if="steps === 3">
        <el-card style="width: 650px; background-color: #f2f2f2; margin-left: auto;margin-right:auto ;margin-top: 10px;text-align: center" >
          <p>choose your payment method</p>
          <el-radio-group v-model="paymentMethod">
            <el-radio :label="1" :checked="paymentMethod === 1">use card</el-radio>
            <el-radio :label="2" :checked="paymentMethod === 2">pay after delivery</el-radio>
          </el-radio-group>
          <my-checkout v-if="paymentMethod === 1"></my-checkout>
          <div>
            <el-button v-if="paymentMethod === 2">Finish</el-button>
          </div>
        </el-card>
      </div>
    </div>



  </el-card>
</template>

<script>
import addressBoard from "@/views/checkout/components/addressBoard.vue";
import MyCheckout from "@/views/checkout/components/myCheckout.vue";
import axios from "axios";


export default {
  name: "index",
  components: {MyCheckout, addressBoard},
  data() {
    return {
      steps: 0,
      deliveryTimeChosen: '',
      deliveryTime:[
        {value: '1', label: '8:00-10:00'},
        {value: '2', label: '10:00-12:00'},
        {value: '3', label: '12:00-14:00'},
        {value: '4', label: '14:00-16:00'},
        {value: '5', label: '16:00-18:00'},
        {value: '6', label: '18:00-20:00'},
        {value: '7', label: '20:00-22:00'},
      ],
      paymentMethod:0,
      order : {
        id: '',
        member: {
          id: this.$store.state.userId,
        },
        receiver: {
          id: this.$store.state.address.id,
        },
        createTime: new Date(),
        totalAmount: this.calculatePrice,
        deliveryAmount: 0,
        payAmount: this.calculatePrice,
        discountAmount: 0,
        status: 0,
        note: '',
        loyalPointGained: 0,
      },
      orderItems : [
        // {
        //   id: {
        //     id: this.order.id,
        //     abstractProductId: ''
        //   },
        //   order: {
        //     id: '',
        //   },
        //   abstractProduct: {
        //     id: '',
        //   },
        //   amount: 0,
        //   total_price: 0,
        // }
      ]
    };
  },
  methods: {
    handleGoBackToShop() {
      this.$router.push({path: '/home'});
    },
    async handleCreateOrder() {
      this.steps = 3;
      // 这时候address改了，需要刷新一下,需要更新的还有totalAmount,payAmount,note
      this.order.receiver.id = this.$store.state.address.id;
      this.order.totalAmount = this.calculatePrice;
      if(this.order.totalAmount < 50){
        this.order.deliveryAmount = 5;
        this.order.payAmount= this.calculatePrice+5;
      }else{
        this.order.deliveryAmount = 0;
        this.order.payAmount= this.calculatePrice;
      }
      this.order.note= this.deliveryTimeChosen;

      await axios.get('http://localhost:8080/api/cp/generateOrderID').then(response => {
        this.order.id = response.data;
      }).catch(error => {
        console.log(error);
      });

      await axios.post('http://localhost:8080/api/cp/saveOrder', this.order).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });

      await this.$store.state.cart.forEach(item => {
        this.orderItems.push({
          id: {
            id: this.order.id,
            abstractProductId:item.id,
          },
          order: {
            id: this.order.id,
          },
          abstractProduct: {
            id: item.id,
          },
          amount: item.amount,
          total_price: item.amount * item.price,
        })
      })

      await axios.post('http://localhost:8080/api/cp/saveOrderItems', this.orderItems).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
    }
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
    },
    Address() {
      return this.$store.state.address.line1+' '+this.$store.state.address.line2+' '+this.$store.state.address.city;
    },
    calculateDelivery() {
      if(this.calculatePrice < 50){
        return 5;
      }else{
        return 0;
      }
    },
  }
}
</script>

<style scoped>

</style>
