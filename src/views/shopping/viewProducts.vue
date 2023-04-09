<template>
  <search-bar></search-bar>
  <p>排序按钮</p>
  <product-list :products="products"></product-list>
</template>

<script>
import ProductList from "@/views/shopping/components/productList.vue";
import SearchBar from "@/views/shopping/components/searchBar.vue";
import axios from "axios";

export default {
  name: "products",
  data() {
    return {
      // categories: [{
      //   categoryID: 'test1',
      //   label: 'test'
      // }],
      products:[]
    }
  },
  created() {
    if (this.$route.query.name) {
      axios.get('http://localhost:8080/api/cp/productsNameLike?name=' + this.$route.query.name)
          .then(response => {
            this.products = response.data
            console.log(this.products)
          })
    } else if (this.$route.query.id) {
      axios.get('http://localhost:8080/api/cp/productsByCategory?id=' + this.$route.query.id)
          .then(response => {
            this.products = response.data
            console.log(this.products)
          })
    } else {
      console.log("something went wrong!")
    }
  },
  components: {SearchBar, ProductList}
}
</script>

<style scoped>

</style>
