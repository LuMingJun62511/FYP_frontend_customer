<template>
  <search-bar></search-bar>
  <product-list :products="computedProducts"></product-list>
</template>
<script>
import ProductList from "@/views/shopping/components/productList.vue";
import SearchBar from "@/views/shopping/components/searchBar.vue";

export default {
  name: "products",
  components: {SearchBar, ProductList},
  computed: {
    computedProducts() {
      return this.$store.state.products;
    }
  },
  // created() {
  //   console.log(this.$store.state.hotSaleProducts)
  //   console.log(this.$store.state.newProducts)
  // }
}
</script>
<style scoped>

</style>
