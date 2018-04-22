<template>
  <div class="container">
    <div class="loading" v-if="loading">
      <h4>잠시만 기다려 주세요...</h4>
    </div>
    <published-product-list/>
  </div>
</template>
<script>
  import PublishedProductList from '../contents/reservation/PublishedProductList'
  export default {
    name: "Reservation",
    components: {
      PublishedProductList
    },
    data() {
      return {
        loading: false
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
        this.$store.dispatch('getProductListQuery');
      }
    }
  }
</script>
<style scoped>
</style>
