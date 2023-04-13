<template>
  <p>点进来这个，可以看到完成了的订单，然后，可以对商品进行退货申请，{{this.$route.params.id}}</p>
  <p>能想到的bug就是用户可以无限退货，所以receipt items里加一个状态，提交退货申请后商品被挂起，挂起的商品不能再退货</p>

</template>

<script>
export default {
  name: "oneReceipt"
}
</script>

<style scoped>

</style>
