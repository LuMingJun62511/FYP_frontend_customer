<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      Dropdown List
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in $store.state.cart" :key="item.id">
          {{ item.name }} - {{ item.price }} euros
        </el-dropdown-item>
      </el-dropdown-menu>
      <p>共{{calculateAmount}}商品，总计{{calculatePrice}}euros</p>
      <el-button type="primary">结算</el-button>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: "cart",
  computed: {
    calculateAmount() {
      let res = 0;
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        res += this.$store.state.cart[i].amount;
      }
      return res;
    },
    calculatePrice() {
      let res = 0;
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        res += this.$store.state.cart[i].amount * this.$store.state.cart[i].price;
      }
      return res;
    }
  }
}
</script>

<style scoped>

</style>
