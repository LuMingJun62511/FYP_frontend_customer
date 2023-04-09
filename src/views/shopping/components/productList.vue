<template>
  <p>一堆，分页</p>
  <div class="product-grid">
    <product-card v-for="product in products" :key="product.id" :name="product.name" />
  </div>
  <div>

  </div>
</template>

<script>
import ProductCard from "@/views/shopping/components/productCard.vue";

export default {
  name: "productList",
  components: {ProductCard},
  props:['products']
}
</script>

<style scoped>

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 576px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>
