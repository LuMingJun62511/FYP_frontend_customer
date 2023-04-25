<template>
  <el-card class="card-wrapper">
    <div>
      <el-row>
        <el-col :span="12">
          <img :src="require('@/assets/images/' + product.pic + '.jpg')" class="image" alt="@/assets/images/image-not-found-icon.png" style="width: 90px; height: 90px;">
        </el-col>
        <el-col :span="12">
          <div>
            <p class="name" style="display: block;">name: {{product.name}}</p>
            <p class="price" style="display: block;">price: {{product.price}} euros</p>
          </div>
        </el-col>
      </el-row>
      <div v-if="product.isLow===1" style="text-align: center; background-color: #da607a">
        <p>out of stock</p>
      </div>
      <el-input-number v-model="product.amount" :min="1"></el-input-number>
      <el-button @click="handlePutInCart()" style="margin-left: 5px">add to the cart</el-button>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 5px">
      <el-button @click="handleJump(product.id)">check product details</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "productCard",
  props:['product'],
  // created() {
  //   console.log("看看pic"+this.product.pic)
  // },
  methods:{
    handlePutInCart(){
      //首先看有没有
      const index = this.$store.state.cart.findIndex(c => c.id === this.product.id);
      if(index !== -1){//如果有
        this.$store.commit('Cart_modify',this.product);
      }else {//如果没有
        this.$store.commit('Cart_add',this.product);
      }
    },
    handleJump(id){
      this.$router.push({path:'/product/'+id})
    }
  }
}
</script>

<style scoped>
.card-wrapper{
  height: 257px;
}
</style>
