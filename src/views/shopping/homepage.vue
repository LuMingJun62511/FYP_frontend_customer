<template>
  <search-bar></search-bar>
  <el-row class="display1">
    <el-col :span="5">
      <el-row>
        <el-col>所有商品种类</el-col>
        <el-col v-for="category in categories">
          <el-button @click="handleJumpToViewProducts(category.categoryID)" >
            {{category.label}}
          </el-button>
        </el-col>
      </el-row>

    </el-col>
    <el-col :span="14">
      <el-carousel height="150px">
        <el-carousel-item :key="1">
          广告1
        </el-carousel-item>
        <el-carousel-item :key="2">
          广告2
        </el-carousel-item>
        <el-carousel-item :key="3">
          广告3
        </el-carousel-item>
        <el-carousel-item :key="4">
          广告4
        </el-carousel-item>
      </el-carousel>
    </el-col>

    <el-col :span="5">
      <el-row>
        <el-col>整顿公告</el-col>
        <el-col>退货公告</el-col>
        <el-col>优惠公告</el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row class="display2">
    <el-col :span="12">
      <p>特价区</p>
    </el-col>
    <el-col :span="12">
      <p>新品区</p>
    </el-col>
  </el-row>
</template>

<script>
import ShoppingHeader from "@/views/shopping/components/searchBar.vue";
import SearchBar from "@/views/shopping/components/searchBar.vue";
import axios from "axios";

export default {
  name: "homepage",
  data() {
    return {
      categories: [{
        categoryID: 'test1',
        label: 'test'
      }],
    }
  },
  methods:{
    handleJumpToViewProducts(id){
      this.$router.push({path: '/viewProducts', query: { id: id }})
    }
  },
  created() {
    axios.get('http://localhost:8080/api/cp/findCategories').then(response => {
      this.categories = []
      response.data.forEach(category =>{
        this.categories.push({
          categoryID: category.id,
          label: category.name
        })
      })
    })
  },
  components: {SearchBar, ShoppingHeader}
}
</script>

<style scoped>
search-bar{
  height: 20%;
}
.display1{
  height: 40%;
}

.display2{
  height: 40%;
}
</style>
