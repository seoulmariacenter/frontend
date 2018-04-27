<template>
  <div class="container">
    <div class="row justify-content-between">
      <provision-sidebar/>
      <router-view class="col-lg-8 col-md-8 bg-light"/>
    </div>
  </div>
</template>
<script>
  import ProvisionSidebar from '../contents/provision/ProvisionSidebar'
  export default {
    name: "Provision",
    components: {
      ProvisionSidebar
    }
  }
</script>
<style scoped>
</style>
