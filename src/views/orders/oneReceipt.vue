<template>
<!--  <p>能想到的bug是这样的，我正常买了贵可乐和雪碧，商家没有雪碧了，就补了我两瓶贵可乐，也因此，这两瓶贵可乐就是便宜版本的贵可乐</p>-->
<!--  <p>就可能出现，同订单，同商品名，同批次的情况，这就出大问题</p>-->
<!--  <p>解决问题的方法就是加个唯一id,因为现在这情况下，这东西已经不唯一了，就得改</p>-->
<!--  <p>反正暂时就这样吧，也算是学了个教训，主键设计</p>-->
  <el-card style="width: 1000px; margin: auto">
    <el-table :data="items">
      <el-table-column
          label="product id"
          prop="product_id"
          width="200">
      </el-table-column>
      <el-table-column
          label="product name"
          prop="product_name"
          width="200">
      </el-table-column>
      <el-table-column
          label="amount"
          prop="amount"
          width="200">
      </el-table-column>
      <el-table-column
          label="total price"
          prop="totalPrice"
          width="200">
      </el-table-column>
      <el-table-column
          label="status"
          prop="status"
          width="200">
        <template v-slot="props">
          <el-button v-if="props.row.status !== 2 & props.row.amount !== 0" type="primary" @click="handleChooseToReturn(props.row.product_id)">return this</el-button>
          <p v-else-if="props.row.amount === 0">your apply finished</p>
          <p v-else>dealing your apply</p>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-card style="width: 400px; margin-left: auto;margin-right: auto;margin-top: 20px ">
    <p>product name: {{itemHandling.product_name}}</p>
    <div style="display: flex;">
      <p>amount:&nbsp;</p>
      <el-input-number v-model="itemHandling.amount" :min="1" :max="itemHandling.maxAmount"></el-input-number>
    </div>
    <p>single price: {{itemHandling.price}}</p>
    <div style="display: flex; justify-content: center; margin-top: 5px">
      <el-button @click="handleSubmitReturnApply">submit your apply</el-button>
    </div>
  </el-card>

  <p style="text-align: center">Our staff will come to pick up the returned goods every Monday</p>

</template>

<script>
import axios from "axios";

export default {
  name: "oneReceipt",
  data() {
    return {
      receipt: {
        // id: 1,
        // order_id: 1,
        // status: 1,
      },
      items: [
        // {
          // product_id: 1,
          // product_name: 'test1',
          // amount: 1,
          // totalPrice: 1,
          // status: 1,
        // }
      ],
      itemHandling: {
        product_id: null,
        product_name: null,
        amount: null,
        // price: null,
        totalPrice: null,
        status: null,
        maxAmount: null,
      },
    }
  },
  methods: {
    handleChooseToReturn(product_id) {
      this.itemHandling.product_id = product_id
      this.items.forEach(item => {
        if (item.product_id === product_id) {
          this.itemHandling.batchId = item.batchId;
          this.itemHandling.amount = 1;
          this.itemHandling.maxAmount = item.amount;
          this.itemHandling.product_id = item.product_id;
          this.itemHandling.product_name = item.product_name;
          this.itemHandling.totalPrice = item.price;
        }
      })
    },

    async handleSubmitReturnApply() {
      await axios.post(process.env.VUE_APP_BASE_URL+'/returnItem', {
        id: {
          batchId: this.itemHandling.batchId,
          productId: this.itemHandling.product_id,
          receiptId: this.receipt.id,
        },
        batch: {
          id: this.itemHandling.batchId,
        },
        product: {
          id: this.itemHandling.product_id,
        },
        receipt: {
          id: this.receipt.id,
        },
        amount: this.itemHandling.amount,
      }).then(response => {
        console.log(response)
      })

      // 改完记得更新一下
      await axios.get(process.env.VUE_APP_BASE_URL+'/receiptItems/' + this.$route.params.id).then(response => {
        this.items = [];
        response.data.forEach(item => {
          this.items.push({
            batchId: item.batch.id,
            product_id: item.product.id,
            product_name: item.product.name,
            amount: item.amount,
            totalPrice: item.totalPrice,
            // price: item.totalPrice/item.amount,
            status: item.status,
          })
        })
      })

    }
  },
  created() {
    // 很棒的是，现在status 2 就是标识pending了，
    this.receipt.id = this.$route.params.id

    axios.get(process.env.VUE_APP_BASE_URL+'/receiptItems/' + this.$route.params.id).then(response => {
      // console.log(response.data)
      response.data.forEach(item => {
        // if(item.amount === 0) {
        //   this.items.push({
        //     batchId: item.batch.id,
        //     product_id: item.product.id,
        //     product_name: item.product.name,
        //     amount: item.amount,
        //     price: item.totalPrice,
        //     status: item.status,
        //   })
        // }else {
          this.items.push({
            batchId: item.batch.id,
            product_id: item.product.id,
            product_name: item.product.name,
            amount: item.amount,
            totalPrice: item.totalPrice,
            status: item.status,
          })
        // }

      })
    })
  }
}
</script>

<style scoped>

</style>
