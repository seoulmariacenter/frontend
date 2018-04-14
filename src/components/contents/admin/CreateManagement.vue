<template>
  <div class="col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>순례 상품 만들기</strong></h2>
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
  export default {
    name: "CreateManagement",
    props: ['property'],
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
       this.$emit('manageContent', false)
     }
    }
  }
</script>
<style scoped>
</style>
