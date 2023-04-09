<template class="rootApp">
  <my-header></my-header>
  <router-view/>
</template>
<script setup>
import MyHeader from "@/views/layout/header.vue";
</script>

<style>
.rootApp{
  background-color: gray;

}
</style>

