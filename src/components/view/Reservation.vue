<template>
  <div class="container">
    <div class="row justify-content-between">
      <reservation-form v-bind:productTitle="productTitle"/>
      <published-product-list v-on:callProductInfo="callProductInfo"/>
    </div>
  </div>
</template>
<script>
  import 'popper.js/dist/popper.min'
  import PublishedProductList from '../contents/reservation/PublishedProductList'
  import ReservationForm from  '../contents/reservation/ReservationForm'
  export default {
    name: "Reservation",
    components: {
      PublishedProductList,
      ReservationForm
    },
    data() {
      return {
        productPK: 0,
        productTitle: ''
      }
    },
    methods: {
      callProductInfo(payload) {
        this.productPK = payload[0];
        this.productTitle = payload[1]
      }
    }
  }
</script>
<style scoped>
</style>
