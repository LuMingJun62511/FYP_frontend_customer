<template>
  <search-bar></search-bar>
  <el-row>
    <el-col :span="8">
      <el-card>
        <p>product picture to be placed here</p>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-form>
        <p>product information</p>
      </el-form>
    </el-col>
  </el-row>

  <p class="name">name: {{product.name}}</p>
  <p class="price">price: {{product.price}} euros</p>
  <el-input-number v-model="product.amount" :min="1"></el-input-number>
  <el-button type="text" @click="handlePutInCart()">add to the cart</el-button>
  <div v-if="product.isLow===1" style="text-align: center; background-color: #da607a">
    <p>Note that the current product is out of stock, if you must buy it, you may receive a substitute selected by the merchant for you</p>
  </div>
</template>

<script>
import SearchBar from "@/views/shopping/components/searchBar.vue";
import axios from "axios";

export default {
  name: "oneProduct",
  data() {
    return {
      product: {
        id:101,
        name:'test1',
        price:1,
        image:'test1',
        category:'test1',
        created_time:'test1',
        isLow:'test1',
        amount:1,
      }
    };
  },
  created() {
    axios.get(process.env.VUE_APP_BASE_URL+'/oneProduct/' + this.$route.params.id)
        .then(response => {
          this.product = response.data
          this.product.amount = 1
        })
  },
  methods:{
    handlePutInCart(){
      //首先看有没有
      const index = this.$store.state.cart.findIndex(c => c.id === this.product.id);
      if(index !== -1){//如果有
        this.$store.commit('Cart_modify',this.product);
      }else {//如果没有
        this.$store.commit('Cart_add',this.product);
      }
    }
  },

  components: {SearchBar}
}
</script>

<style scoped>

</style>
