<template>
  <div class="search-bar-container">
    <div class="icon-container">
      <img src="@/assets/icons/logo.png" style="width: 90px;height: 90px;margin-left: 30px">
<!--      <p>Logo</p>-->
    </div>
    <div class="search-container">
      <div style="display: flex; align-items: center; justify-content: center;">
        <el-input class="search-bar-input" v-model="searchItem" placeholder="search for something" style="min-width: 450px"></el-input>
        <el-button class="search-bar-button" @click="search" style="margin-left: 15px"> search </el-button>
      </div>
    </div>
    <div class="cart-container">
      <cart></cart>
    </div>
  </div>

</template>

<script>

import Cart from "@/views/shopping/components/cart.vue";
import axios from "axios";

export default {
  name: "searchBar",
  components: {Cart},
  data() {
    return {
      searchItem: '',
    };
  },
  methods: {
    search() {
      axios.get(process.env.VUE_APP_BASE_URL+'/productsNameLike?name=' + this.searchItem)
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
  }

}
</script>

<style scoped>
.search-bar-container{
  background-color: #f2f2f2;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.icon-container {
  flex: 20% 0 0;
}

.search-container {
  flex: 0 60% 0;
}

.cart-container {
  flex: 0 0 20%;
}
</style>
