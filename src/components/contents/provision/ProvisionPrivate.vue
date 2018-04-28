<template>
  <div class="col-lg-8 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>개인정보 처리방침</strong></h2>
      </div>
      <hr>
      <div class="m-3">
        <div class="card border-secondary h750 overflow">
          <div class="card-body" v-html="privatePolicy"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ProvisionPrivate",
    computed: {
      privatePolicy() {
        return require('../../../assets/markdown/privacy_policy.md')
      }
    }
  }
</script>
<style scoped>
</style>
