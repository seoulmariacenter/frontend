<template>
  <section class="container">
      <carousel/>
    <div class="row">
      <div class="col-md-8">
        <advertisement/>
      </div>
      <div class="col-md-4">
        <app-sidebar/>
      </div>
    </div>
  </section>
</template>
<script>
  import AppSidebar from '../structure/AppSidebar'
  import Carousel from '../contents/home/Carousel'
  import Advertisement from '../contents/home/Advertisement'
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
