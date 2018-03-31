<template>
  <div class="container">
    <router-view/>
  </div>
</template>
<script>
  import SignIn from '../contents/SignIn'
  export default {
    name: "Admin",
    components: {
      SignIn
    }
  }
</script>
<style scoped>
</style>
