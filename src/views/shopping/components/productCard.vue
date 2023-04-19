<template>
  <el-card>
    <div>
      <!--    <img src="~examples/assets/images/hamburger.png" class="image">-->
      <p class="name">name: {{product.name}}</p>
      <p class="price">price: {{product.price}} euros</p>
      <div v-if="product.isLow===1" style="text-align: center; background-color: #da607a">
        <p>out of stock</p>
      </div>
      <el-input-number v-model="product.amount" :min="1"></el-input-number>
      <el-button @click="handlePutInCart()" style="margin-left: 5px">加入购物车</el-button>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 5px">
      <el-button @click="handleJump(product.id)">查看详情</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "productCard",
  props:['product'],
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
/*.el-card{*/
/*  max-width:100px;*/
/*}*/
</style>
