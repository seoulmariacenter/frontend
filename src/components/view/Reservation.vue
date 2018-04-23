<template>
  <div class="container">
    <div class="row justify-content-between">
      <reservation-form/>
      <published-product-list/>
    </div>
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
  .height {
    height: 500px;
  }
</style>
