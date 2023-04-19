<template>
  <search-bar></search-bar>
  <el-row>
    <el-col :span="8">
      <el-card>
        <p>商品图片</p>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-form>
        <p>商品信息</p>
      </el-form>
    </el-col>
  </el-row>

  <p class="name">name: {{product.name}}</p>
  <p class="price">price: {{product.price}} euros</p>
  <el-input-number v-model="product.amount" :min="1"></el-input-number>
        <div v-if="product.isLow===1" style="text-align: center; background-color: #da607a">
          <p>提示，当前商品处于缺货状态，如果您一定要购买，可能收到商家为您选择的替代品</p>
        </div>
  <el-button type="text" @click="handlePutInCart()">加入购物车</el-button>
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
    axios.get('http://localhost:8080/api/cp/oneProduct/' + this.$route.params.id)
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
