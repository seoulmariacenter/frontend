<template>
  <div class="container-fluid pr-4">
    <router-view/>
  </div>
</template>
<script>
  import SignIn from '../contents/admin/SignIn'
  export default {
    name: "Admin",
    components: {
      SignIn
    }
  }
</script>
<style scoped>
</style>
