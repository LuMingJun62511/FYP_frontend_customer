<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      Shopping Cart
    </span>
    <template #dropdown>
      <p> &nbsp;&nbsp;&nbsp;&nbsp; name --- amount * price</p>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in $store.state.cart" :key="item.id">
          <p>{{ item.name }} --- {{ item.amount }}*{{ item.price }} = {{ item.amount * item.price }} euros </p>
          <el-input-number size="small" v-model="item.amount" :min="1" ></el-input-number>
        </el-dropdown-item>
      </el-dropdown-menu>
      <p>共{{calculateAmount}}商品，总计{{calculatePrice}}euros</p>
      <el-button type="primary">结算</el-button>
    </template>
  </el-dropdown>
</template>
<!--现在要做的是把cart和product中的对象给分开，-->
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
