<template>
  <search-bar></search-bar>
  <el-row class="display1">
    <el-col :span="4" style="background-color: #f2f2f2">
      <el-row>
        <el-col>
          <h3 style="height: 30px;text-align: center">All categories</h3>
        </el-col>
        <el-col v-for="category in categories">
          <div style="width: 100%;height: 40px;border-top: 2px solid;" @click="handleJumpToViewProducts(category.categoryID)" >
            <p style="text-align: center">
              {{category.label}}
            </p>
          </div>
        </el-col>
      </el-row>
    </el-col>

    <el-col :span="13" :offset="1" style="background-color: #f2f2f2" >
      <el-carousel height="350px">
        <el-carousel-item :key="1">
          <img src="@/assets/images/ad1.jpg" alt="advertisement 1" />
<!--          Advertisement 1 to be placed here-->
        </el-carousel-item>
        <el-carousel-item :key="2">
          <img src="@/assets/images/ad2.jpg" alt="advertisement 2" />
<!--          Advertisement 2 to be placed here-->
        </el-carousel-item>
        <el-carousel-item :key="3">
          <img src="@/assets/images/ad3.jpg" alt="advertisement 3" />
<!--          Advertisement 3 to be placed here-->
        </el-carousel-item>
        <el-carousel-item :key="4">
          <img src="@/assets/images/ad4.jpg" alt="advertisement 4" />
<!--          Advertisement 4 to be placed here-->
        </el-carousel-item>
      </el-carousel>
    </el-col>

    <el-col :span="5" :offset="1" style="background-color: #f2f2f2">
      <el-row>
        <el-col>
          <h4 style="text-align: center">
            Rectification Announcement
          </h4>
        </el-col>
        <el-col>
          <h4 style="text-align: center">
            Return Rules Announcement
          </h4>
        </el-col>
        <el-col>
          <h4 style="text-align: center">
            Offer Announcement
          </h4>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row class="display2">
    <el-col :span="11">
      <h4>Hot Sale Products Area</h4>
      <div class="scroll-container">
        <el-scrollbar style="width: 100%; white-space: nowrap;">
          <div class="hot-sale-product-cards">
            <product-card v-for="product in hot_sale_products" :product="product" style="display: inline-block; margin-right: 10px;"></product-card>
          </div>
        </el-scrollbar>
      </div>
    </el-col>
    <el-col :span="11" :offset="2">
      <h4>New Items Area</h4>
      <div class="scroll-container">
        <el-scrollbar style="width: 100%; white-space: nowrap;">
          <div class="new-product-cards">
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
      axios.get(process.env.VUE_APP_BASE_URL+'/productsByCategory?id=' + id)
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
    axios.get(process.env.VUE_APP_BASE_URL+'/findCategories').then(response => {
      this.categories = []
      response.data.forEach(category =>{
        this.categories.push({
          categoryID: category.id,
          label: category.name
        })
      })
    })

    axios.get(process.env.VUE_APP_BASE_URL+'/findHotSale').then(response => {
      let res = []
      response.data.forEach(product =>{
        product.amount = 1
        res.push(product)
      })
      this.$store.commit('SET_HOT_SALE_PRODUCTS', res)
    })

    axios.get(process.env.VUE_APP_BASE_URL+'/findNew').then(response => {
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
