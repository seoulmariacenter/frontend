<template>
  <div class="row justify-content-between">
    <admin-sidebar/>
    <router-view/>
  </div>
</template>
<script>
  import AdminSidebar from '../contents/admin/AdminSidebar'
  export default {
    name: "Dashboard",
    components: {
      AdminSidebar
    }
  }
</script>
<style scoped>
</style>
