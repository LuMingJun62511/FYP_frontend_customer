<template>
  <div class="search-bar-container">
    <div class="icon-container">
      <p>标志</p>
    </div>
    <div class="search-container">
      <div style="display: flex; align-items: center; justify-content: center;">
        <el-input v-model="searchItem" placeholder="search for something" style="width: 100%"></el-input>
        <el-button @click="search"> search </el-button>
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
      axios.get('http://localhost:8080/api/cp/productsNameLike?name=' + this.searchItem)
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
