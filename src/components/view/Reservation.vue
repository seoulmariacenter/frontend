<template>
  <div class="container">
    <published-product-list/>
    <reservation-form/>
  </div>
</template>
<script>
  import PublishedProductList from '../contents/reservation/PublishedProductList'
  import ReservationForm from  '../contents/reservation/ReservationForm'
  export default {
    name: "Reservation",
    components: {
      PublishedProductList,
      ReservationForm
    }
  }
</script>
<style scoped>
</style>
