<template>
  <div class="container">
    <div class="row justify-content-between">
      <provision-sidebar/>
      <router-view/>
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
