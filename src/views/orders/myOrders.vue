<template>
  <el-card style="width: 900px; margin: auto">
    <el-table
        :data="orders"
        style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="props">
          <el-row>
            <el-col :span="6">id</el-col>
            <el-col :span="6">name</el-col>
            <el-col :span="6">amount bought</el-col>
            <el-col :span="6">single price</el-col>
          </el-row>
          <div v-for="item in props.row.items">
            <el-row>
              <el-col :span="6">{{item.product_id}}</el-col>
              <el-col :span="6">{{item.product_name}}</el-col>
              <el-col :span="6">{{item.amount}}</el-col>
              <el-col :span="6">{{item.price}}</el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="order id"
          prop="id"
          width="200">
      </el-table-column>
      <el-table-column
          label="amount paid"
          prop="payAmount"
          width="200">
      </el-table-column>
      <el-table-column
          label="notes"
          prop="note"
          width="200">
      </el-table-column>
      <el-table-column
          label="status"
          prop="status"
          width="200">
        <template v-slot="props">
          <el-button v-if="props.row.status === 2" type="primary" @click="handleJumpToReceipt(props.row.id)">check receipt</el-button>
          <p v-else>yet finished</p>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import axios from "axios";

export default {
  name: "allOrders",
  data() {
    return {
      orders: []
    }
  },
  methods: {
    handleJumpToReceipt(orderId) {
      this.$router.push({path: '/receipt/'+orderId})
    }
  },
  async created() {
    await axios.get(process.env.VUE_APP_BASE_URL+'/ordersById/' + this.$store.state.userId).then(response => {
          this.orders = response.data;
        }).catch(error => {
          console.log(error);
        });
    await this.orders.forEach(order =>{
      axios.get(process.env.VUE_APP_BASE_URL+'/orderItems/'+order.id).then(response => {
        let tempOrderItems = []
        response.data.forEach(item=>{
          tempOrderItems.push({
            product_id:item.abstractProduct.id,
            product_name:item.abstractProduct.name,
            amount:item.amount,
            price:item.abstractProduct.price,
            total_price:item.totalPrice,
          })
        })
        order.items = tempOrderItems;
      })
    })

  }
}
</script>

<style scoped>

</style>
