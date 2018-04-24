<template>
  <div class="">
    hello
    {{getReservationInfo}}
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ReservationDetail",
    computed: {
      ...mapGetters([
        'getReservationInfo'
      ])
    }
  }
</script>
<style scoped>
</style>
