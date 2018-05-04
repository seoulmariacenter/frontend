<template>
  <div class="row justify-content-between">
    <reservation-form v-bind:productTitle="productTitle" v-bind:productPk="productPk"/>
    <published-product-list v-on:callProductInfo="callProductInfo"/>
  </div>
</template>
<script>
  import PublishedProductList from './PublishedProductList'
  import ReservationForm from  './ReservationForm'
  export default {
    name: "ReservationManagement",
    components: {
      PublishedProductList,
      ReservationForm
    },
    data() {
      return {
        productPk: 0,
        productTitle: ''
      }
    },
    methods: {
      callProductInfo(payload) {
        this.productPk = payload[0];
        this.productTitle = payload[1]
      }
    }
  }
</script>
<style scoped>
</style>
