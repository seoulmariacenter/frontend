<template>
  <div class="container">
    <transition name="fade">
      <carousel v-show="show"/>
    </transition>
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
  import Carousel from '../contents/home/Carousel'
  import Advertisement from '../contents/home/Advertisement'
  export default {
    name: "home",
    components: {
      AppSidebar,
      Carousel,
      Advertisement
    },
    data() {
      return {
        show: false
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.show = true
      }
    }
  }
</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
