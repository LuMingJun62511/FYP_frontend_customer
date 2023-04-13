<template>
  <search-bar></search-bar>
  <el-row class="display1">
    <el-col :span="4" style="background-color: #f2f2f2">
      <el-row>
        <el-col>所有商品种类</el-col>
        <el-col v-for="category in categories">
          <el-divider />
          <p @click="handleJumpToViewProducts(category.categoryID)" >
            {{category.label}}
          </p>
        </el-col>
      </el-row>
    </el-col>

    <el-col :span="13" :offset="1" style="background-color: #f2f2f2" >
      <el-carousel height="350px">
        <el-carousel-item :key="1">
          广告1
        </el-carousel-item>
        <el-carousel-item :key="2">
          广告2
        </el-carousel-item>
        <el-carousel-item :key="3">
          广告3
        </el-carousel-item>
        <el-carousel-item :key="4">
          广告4
        </el-carousel-item>
      </el-carousel>
    </el-col>

    <el-col :span="5" :offset="1" style="background-color: #f2f2f2">
      <el-row>
        <el-col>整顿公告</el-col>
        <el-col>退货公告</el-col>
        <el-col>优惠公告</el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row class="display2">
    <el-col :span="11">
      <p>热销区</p>
      <div class="scroll-container">
        <el-scrollbar style="width: 100%; white-space: nowrap;">
          <div>
            <product-card v-for="product in hot_sale_products" :product="product" style="display: inline-block; margin-right: 10px;"></product-card>
          </div>
        </el-scrollbar>
      </div>
    </el-col>
    <el-col :span="11" :offset="2">
      <p>新品区</p>
      <div class="scroll-container">
        <el-scrollbar style="width: 100%; white-space: nowrap;">
          <div>
            <product-card v-for="product in new_products" :product="product" style="display: inline-block; margin-right: 10px;"></product-card>
          </div>
        </el-scrollbar>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import axios from "axios";
import ShoppingHeader from "@/views/shopping/components/searchBar.vue";
import SearchBar from "@/views/shopping/components/searchBar.vue";
import ProductCard from "@/views/shopping/components/productCard.vue";

export default {
  name: "homepage",
  data() {
    return {
      categories: [{
        categoryID: 'test1',
        label: 'test'
      }],
    }
  },
  methods:{
    handleJumpToViewProducts(id){
      axios.get('http://localhost:8080/api/cp/productsByCategory?id=' + id)
          .then(response => {
            let res = []
            response.data.forEach(product =>{
              product.amount = 1
              res.push(product)
            })
            this.$store.commit('SET_PRODUCTS', res)
            this.$router.push({path: '/viewProducts'})
          })
    }
  },
  created() {
    axios.get('http://localhost:8080/api/cp/findCategories').then(response => {
      this.categories = []
      response.data.forEach(category =>{
        this.categories.push({
          categoryID: category.id,
          label: category.name
        })
      })
    })

    axios.get('http://localhost:8080/api/cp/findHotSale').then(response => {
      let res = []
      response.data.forEach(product =>{
        product.amount = 1
        res.push(product)
      })
      this.$store.commit('SET_HOT_SALE_PRODUCTS', res)
    })

    axios.get('http://localhost:8080/api/cp/findNew').then(response => {
      let res = []
      response.data.forEach(product =>{
        product.amount = 1
        res.push(product)
      })
      this.$store.commit('SET_NEW_PRODUCTS', res)
    })

  },
  computed: {
    new_products() {
      return this.$store.state.newProducts;
    },
    hot_sale_products() {
      return this.$store.state.hotSaleProducts;
    }
  },
  components: {ProductCard, SearchBar, ShoppingHeader}
}
</script>

<style scoped>
search-bar{
  height: 20%;
}
.display1{
  height: 40%;
  /*background-color: #f2f2f2;*/
}

.display2 {
  height: 40%;
  background-color: #f2f2f2;
  margin-top: 10px;
}

</style>
