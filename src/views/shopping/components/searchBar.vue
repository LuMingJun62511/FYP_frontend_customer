<template>
  <el-row>
    <el-col :span="4" class="big-icon">
      <p>标志</p>
    </el-col>
    <el-col :span="14" class="search" >
      <div style="display: flex; align-items: center; justify-content: center;">
        <el-input v-model="searchItem" placeholder="search for something"></el-input>
        <el-button @click="search"> search </el-button>
      </div>
    </el-col>
    <el-col :span="6" class="cart">
      <cart></cart>
    </el-col>

  </el-row>
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
            this.$store.commit('SET_PRODUCTS', response.data)
            this.$router.push({path: '/viewProducts'})
          })
    }
  }

}
</script>

<style scoped>

</style>
