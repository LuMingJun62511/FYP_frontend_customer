<!--<template>-->
<!--  <p>个人信息的一个dashboard</p>-->
<!--  <p>送货地址CRUD的入口</p>-->
<!--</template>-->
<template>
  <p>dashboard</p>
  <p>用户名</p>
  <p>手机</p>
  <p>city</p>


  <p>只读的</p>
  <p>总消费额</p>
  <p>总订单数</p>
  <p>loyal points数</p>

  <div class="addresses-container">
    <address-manage></address-manage>
  </div>
  <div>
    <router-link to="/myOrders">我的订单</router-link>
  </div>
</template>
<script>
import AddressManage from "@/views/user/components/addressManage.vue";

export default {
  name: "memberCenter",
  components: {AddressManage},
}
</script>

<style scoped>

</style>

