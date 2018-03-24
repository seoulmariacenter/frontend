<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        hello
      </div>
      <div class="col-md-4">
        <app-sidebar/>
      </div>
    </div>
  </div>
</template>
<script>
  import AppSidebar from '../structure/AppSidebar'
  export default {
    name: "home",
    components: {
      AppSidebar
    }
  }
</script>
<style scoped>
</style>
