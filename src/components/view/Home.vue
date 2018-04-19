<template>
  <div class="container">
    <carousel/>
    <div class="row">
      <div class="col-md-8">
        <advertisement/>
      </div>
      <div class="col-md-4">
        <app-sidebar/>
      </div>
    </div>
  </div>
</template>
<script>
  import AppSidebar from '../structure/AppSidebar'
  import Carousel from '../contents/Carousel'
  import Advertisement from '../contents/Advertisement'
  export default {
    name: "home",
    components: {
      AppSidebar,
      Carousel,
      Advertisement
    }
  }
</script>
<style scoped>
</style>
