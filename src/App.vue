<template class="rootApp">
  <my-header class="header"></my-header>
  <router-view/>
</template>
<script setup>
import MyHeader from "@/views/layout/header.vue";
</script>

<style>
.rootApp{
  padding: 0;
  margin: 0;
}
.header {
  margin-bottom: 10px;
}

</style>

