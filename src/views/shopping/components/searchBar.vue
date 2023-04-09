<template>
  <el-row>
    <el-col :span="4" class="big-icon">
      <p>标志</p>
    </el-col>
    <el-col :span="14" class="search">
      <el-input v-model="searchItem" placeholder="search for something"></el-input>
      <el-button @click="search"></el-button>
    </el-col>
    <el-col :span="6" class="cart">
      <p>下拉的购物车</p>
    </el-col>

  </el-row>
</template>

<script>

export default {
  name: "searchBar",
  data() {
    return {
      searchItem: 'meat',
      cart:[
        {
          id:101,
          name:'test1',
          price:0,
          amount:0
        },
      ]
    };
  },
  methods: {
    search() {
      //其实这个搜索函数并没有执行搜索，他只是将页面导向了viewProducts,具体的搜索是viewProducts完成的
      this.$router.push({path: '/viewProducts', query: { name: this.searchItem }})
    }
  }

}
</script>

<style scoped>

</style>
