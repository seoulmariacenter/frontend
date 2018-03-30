<template>
  <div class="container">
    <div class="row mt-5 mb-5">
      <div class="col-md-3"></div>
      <div class="col-md-6 col-sm-12 mt-5 mb-5">
        <router-view/>
      </div>
      <div class="col-md-3"></div>
    </div>
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
