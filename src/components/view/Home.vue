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
    <Modal/>
  </section>
</template>
<script>
  import AppSidebar from '../structure/AppSidebar'
  import MainProductView from '../contents/home/MainProductView'
  import Carousel from '../contents/home/Carousel'
  import Modal from '../contents/modal/Modal'
  export default {
    name: "home",
    components: {
      AppSidebar,
      MainProductView,
      Carousel,
      Modal,
    }
  }
</script>
<style scoped>
</style>
