<template>
  <section class="container">
      <main-product-view/>
    <div class="row">
      <div class="col-md-8">
        <carousel/>
      </div>
      <div class="col-md-4">
        <app-sidebar/>
      </div>
    </div>
  </section>
</template>
<script>
  import AppSidebar from '../structure/AppSidebar'
  import MainProductView from '../contents/home/MainProductView'
  import Carousel from '../contents/home/Carousel'
  export default {
    name: "home",
    components: {
      AppSidebar,
      MainProductView,
      Carousel
    }
  }
</script>
<style scoped>
</style>
