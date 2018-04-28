<template>
  <div class="col-lg-8 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>서비스 이용 약관</strong></h2>
      </div>
      <hr>
      <div class="m-3">
        <p>출처: <a target="_blank"
        class="text-info"
        href="http://www.ftc.go.kr/www/cop/bbs/selectBoardList.do?key=201&bbsId=BBSMSTR_000000002320&bbsTyCode=BBST01">공정거래위원회</a>
        </p>
        <div class="card border-secondary h750 overflow">
          <div class="card-body" v-html="cyberMallProvision"></div>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ProvisionService",
    computed: {
      cyberMallProvision() {
        return require('../../../assets/markdown/cyber_mall_provision.md')
      }
    }
  }
</script>
<style scoped>
  .h750 {
    height: 750px;
  }
  .overflow {
    overflow: scroll;
  }
</style>
