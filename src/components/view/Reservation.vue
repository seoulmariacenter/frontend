<template>
  <div class="container">
    <published-product-list/>
  </div>
</template>
<script>
  import PublishedProductList from '../contents/reservation/PublishedProductList'
  export default {
    name: "Reservation",
    components: {
      PublishedProductList
    }
  }
</script>
<style scoped>
</style>
