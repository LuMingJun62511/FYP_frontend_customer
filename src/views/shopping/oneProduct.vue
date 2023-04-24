<template>
    <el-row>
      <search-bar></search-bar>
      <el-col :span="6" :offset="1">
        <el-card style="height: 350px">
          <img :src="require('@/assets/images/' + product.pic + '.jpg')" class="image" alt="@/assets/images/image-not-found-icon.png" style="width: 300px; height: 300px; margin: auto">
        </el-card>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-card style="height: 350px">
          <h3>product information</h3>
          <p class="name">name: {{product.name}}</p>
          <p class="price">price: {{product.price}} euros</p>
          <el-input-number v-model="product.amount" :min="1"></el-input-number>
          <el-button type="text" @click="handlePutInCart()">add to the cart</el-button>
          <div v-if="product.isLow===1" style=" background-color: #da607a">
            <p>Note that the current product is out of stock, if you must buy it, you may receive a substitute selected by the merchant for you</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
        pic:'ad1',
        category:'test1',
        created_time:'test1',
        isLow:'test1',
        amount:1,
      }
    };
  },
  async created() {
    await axios.get(process.env.VUE_APP_BASE_URL+'/oneProduct/' + this.$route.params.id).then(response => {
      this.product.id = response.data.id;
      this.product.name = response.data.name;
      this.product.price = response.data.price;
      this.product.pic = response.data.pic;
      this.product.category = response.data.category;
      this.product.created_time = response.data.created_time;
      this.product.isLow = response.data.isLow;
      this.product.amount = 1;
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
