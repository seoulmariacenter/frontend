<template>
  <div class="col-lg-8 col-md-8 bg-light pl-0 pr-0">
    <div class="m-3">
      <div class="d-block ml-3">
        <h2><strong>여행 약관</strong></h2>
      </div>
      <hr>
      <div class="m-3">
        <p>출처: <a target="_blank"
        class="text-info"
        href="http://www.ftc.go.kr/www/cop/bbs/selectBoardList.do?key=201&bbsId=BBSMSTR_000000002320&bbsTyCode=BBST01">공정거래위원회</a>
        </p>
        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-2 mb-2" role="group" aria-label="First group">
            <button @click="callProvision('domestic')"
            class="btn btn-outline-secondary"
            type="button">국내 여행 표준 약관
            </button>
          </div>
          <div class="btn-group mb-2" role="group" aria-label="Second group">
            <button @click="callProvision('foreign')"
            class="btn btn-outline-info"
            type="button">국외 여행 표준 약관</button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 mb-3">
            <transition name="slide-fade">
              <div class="card border-secondary" v-if="isDomesticProvision">
                <h4 class="card-header text-secondary">
                  <strong>국내 여행 표준 약관</strong>
                </h4>
                <div class="card-body" v-html="domesticTravel">
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="card border-info" v-if="isForeignProvision">
                <h4 class="card-header text-info">
                  <strong>국외 여행 표준 약관</strong>
                </h4>
                <div class="card-body" v-html="foreignTravel">
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ProvisionTravel",
    data() {
      return {
        isDomesticProvision: false,
        isForeignProvision: true
      }
    },
    methods: {
      callProvision(payload) {
        if (payload === 'domestic') {
          this.isDomesticProvision = true;
          this.isForeignProvision = false
        } else if (payload === 'foreign') {
          this.isDomesticProvision = false;
          this.isForeignProvision = true
        }
      }
    },
    computed: {
      domesticTravel() {
        return require('../../../assets/markdown/domestic_travel.md');
      },
      foreignTravel() {
        return require('../../../assets/markdown/foreign_travel.md');
      }
    }
  }
</script>
<style scoped>
  .slide-fade-enter-active {
    transition: all .6s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
