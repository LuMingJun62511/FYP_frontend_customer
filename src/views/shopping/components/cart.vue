<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      Shopping Cart
    </span>
    <template #dropdown>
      <p style="text-align: center;">commodity name --- amount * single price</p>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in $store.state.cart" :key="item.id">
          <p style="text-align: center;">{{ item.name }} --- {{ item.amount }}*{{ item.price }} = {{ item.amount * item.price }} euros </p>
          <el-input-number size="small" v-model="item.amount" :min="1" ></el-input-number>
          <el-button size="small" @click="$store.commit('Cart_delete',item)">删除</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
      <div v-if="calculateAmount===0">
        <p style="text-align: center">购物车里还没有物品，快去购物吧</p>
      </div>
      <div v-if="calculateAmount!==0" style="display: flex; justify-content: center;">
        <p style="margin-right: 16px;">共{{calculateAmount}}商品，总计{{calculatePrice}}euros</p>
        <el-button type="primary" @click="handleJumpCheckout">结算</el-button>
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
