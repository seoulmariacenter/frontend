<template>
  <div class="col-lg-8 col-md-8 bg-light pl-0 pr-0">
    <div class="m-3">
      <div class="d-block ml-3">
        <h2><strong>개인정보 처리방침</strong></h2>
      </div>
      <hr>
      <div class="m-3">
        <p>출처: <a target="_blank"
        class="text-info"
        href="http://www.privacy.go.kr">개인정보보호 종합포털</a>
        </p>
        <div class="card border-secondary">
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
