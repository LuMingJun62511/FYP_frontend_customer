<template>
  <el-row>
    <el-col :span="4" class="big-icon">

    </el-col>
    <el-col :span="14" class="search">
      <el-input v-model="searchItem" placeholder="search for something"></el-input>
      <el-button @click="search"></el-button>
    </el-col>
    <el-col :span="6" class="cart">

    </el-col>

  </el-row>
  <p>这个对应的是第二个header</p>

</template>

<script>
import axios from "axios";

export default {
  name: "shoppingHeader",
  data() {
    return {
      searchItem: 'meat'
    };
  },
  methods: {
    search() {
      axios.get("http://localhost:8080/search?keyword=" + this.searchItem)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      console.log(this.searchItem);
    }
  }

}
</script>

<style scoped>

</style>
