<template>
  <div class="block">
    <div class="product-grid">
      <product-card v-for="(product, index) in paginatedProducts" :key="index" :product="product" />
    </div>
    <div class="pagination-container">
      <div class="pagination-wrapper">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="products.length"
            class="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/views/shopping/components/productCard.vue";

export default {
  name: "ProductList",
  components: { ProductCard },
  props: ["products"],
  data() {
    return {
      currentPage: 1,
      pageSize: 12,
      pageSizes: [4, 8, 12, 16]
    };
  },
  created() {
    console.log("Products 有问题？");
    console.log(this.products);
  },
  computed: {
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.products.slice(startIndex, endIndex);
    }
  },
  methods: {
    handleSizeChange(newSize) {
      this.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    }
  }
};
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (min-width: 576px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 762px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
