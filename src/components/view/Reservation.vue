<template>
  <div class="container">
    hello
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "Reservation",
    data() {
      return {

      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.$store.dispatch('getProductListQuery')
      }
    },
    computed: {
      ...mapGetters([
        'getPublishedProductLists'
      ])
    }
  }
</script>
<style scoped>
</style>
