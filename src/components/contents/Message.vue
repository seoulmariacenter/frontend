<template>
  <div class="col-sm-12">
    <div v-show="checkoutMsg !== null" class="alert alert-danger" role="alert">
      <strong>{{checkoutMsg}}</strong>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "Message",
    computed: {
      ...mapGetters([
        'checkoutMsg'
      ])
    }
  }
</script>
<style scoped>
</style>
