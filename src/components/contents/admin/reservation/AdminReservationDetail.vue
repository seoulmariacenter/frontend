<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block d-flex">
        <h2 class="mb-0"><strong>관리</strong></h2>
        {{getReservationInfo}}
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "AdminReservationDetail",
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.$emit('manageContent', false);
        const formData = {
          pk: this.$route.params.pk,
          host: this.$route.params.host
        };
        this.$store.dispatch('getReservationRetrieveQuery', formData)
      }
    },
    computed: {
      ...mapGetters([
        'getReservationInfo'
      ])
    }
  }
</script>
<style scoped>
</style>
