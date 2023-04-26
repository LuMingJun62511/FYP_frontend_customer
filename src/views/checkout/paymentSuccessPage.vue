<template>
  <el-card style="background-color: #f2f2f2;width: 550px;margin-right: auto;margin-left: auto;margin-top: 100px">
    <p style="text-align: center">Your order has been placed successfully</p>
    <el-button @click="handleBackToHome" style="margin: 0 auto; display: block;">back to homepage</el-button>
  </el-card>
</template>

<script>
export default {
  name: "paymentSuccessPage",
  methods: {
    handleBackToHome() {
      this.$router.push("/home");
    },
  },
}
</script>

<style scoped>

</style>
