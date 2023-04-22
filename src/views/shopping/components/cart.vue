<template>
  <el-dropdown>
    <span class="el-dropdown-link" style="font-size: 20px">
      Shopping Cart
    </span>
    <template #dropdown>
      <p style="text-align: center;">commodity name --- amount * single price</p>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in $store.state.cart" :key="item.id">
          <p style="text-align: center;">{{ item.name }} --- {{ item.amount }}*{{ item.price }} = {{ item.amount * item.price }} euros </p>
          <el-input-number size="small" v-model="item.amount" :min="1" ></el-input-number>
          <el-button size="small" @click="$store.commit('Cart_delete',item)">Delete</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
      <div v-if="calculateAmount===0">
        <p style="text-align: center">There are no items in the shopping cart</p>
      </div>
      <div v-if="calculateAmount!==0" style="display: flex; justify-content: center;">
        <p style="margin-right: 16px;">Total {{calculateAmount}} products, total {{calculatePrice}}euros</p>
        <el-button type="primary" @click="handleJumpCheckout">checkout</el-button>
      </div>
    </template>
  </el-dropdown>
</template>
<script>
export default {
  name: "cart",
  methods: {
    handleJumpCheckout() {
      this.$router.push({path: '/checkout'})
    }
  },
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
