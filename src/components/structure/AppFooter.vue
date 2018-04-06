<template>
  <div class="container-fluid mt-4">
    <div class="jumbotron jumbotron-fluid mb-0">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-3 col-sm-3 ml-0 mt-3 mr-3 mb-3">
            <img src="../../assets/svg/logo_curved_grey.svg" width="130" alt="logo">
          </div>
          <div class="col-md-6 col-sm-6 m-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <ul class="list-inline mb-0">
                  <li v-for="(value, key) in informations" :key="key" class="list-inline-item text-secondary mb-0">
                    <strong>{{key}}:</strong> {{value}}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="col-md-2 col-sm-1">
            <router-link tag="button" :to="{name: 'signIn'}" class="btn btn-outline-secondary">관리자 모드</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "app-footer",
    data () {
      return {
        informations: {
          상호명: '서울마리아센터',
          대표: '김정순',
          사업자등록번호: '105-86-86705',
          통신판매업신고번호: '서울중구-제9876호',
          관광사업자등록번호: '국외 제2009-22호, 국내 제 2013-01호 (서울특별시 중구)',
          개인정보보호관리책임자: '김정순 (mariacenter@daum.net)',
          주소: '서울시 중구 명동길 80 가톨릭회관 326, 327호',
          TEL: '02-723-5425',
          FAX: '02-325-5645'
        }
      }
    }
  }
</script>
<style scoped>
  .list-inline-item {
    font-size: 0.7rem;
  }
</style>
