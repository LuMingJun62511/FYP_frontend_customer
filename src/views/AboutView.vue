<template>
  <div class="about">
    <p>the commodities belong to</p>
    <el-select v-model="categoryID" placeholder="please choose a category">
      <el-option
          v-for="item in options"
          :key="item.categoryID"
          :label="item.label"
          :value="item.categoryID">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'commodities',

  data(){
    return {
      options: [{
        categoryID: 'test1',
        label: 'test'
      }],
      categoryID: '',
      nameStr: '',
      products:[
        // { id:401,
        // name:'',
        // stock:'',
        // price:'', }
      ]
    }
  },
  methods:{
  },
  created () {
    axios.get('http://localhost:8080/api/pms/findCategories').then(response => {
      this.options = []
      response.data.forEach(category =>{
        this.options.push({
          categoryID: category.id,
          label: category.name
        })
      })
    })
  }
}
</script>

<style scoped>

</style>
