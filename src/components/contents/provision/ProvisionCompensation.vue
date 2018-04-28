<template>
  <div class="col-lg-8 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>소비자 분쟁 해결 기준</strong></h2>
      </div>
      <hr>
      <div class="m-3">
        <p>출처: <a target="_blank" class="text-info" href="http://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%EC%86%8C%EB%B9%84%EC%9E%90%EB%B6%84%EC%9F%81%ED%95%B4%EA%B2%B0%EA%B8%B0%EC%A4%80">국가법령정보센터</a></p>
        <div class="d-flex">
          <button @click="callCompensation('domestic')" class="btn btn-outline-secondary mr-3" type="button">국내 여행 소비자 분쟁 해결 기준</button>
          <button @click="callCompensation('foreign')" class="btn btn-outline-info ml-3" type="button">국외 여행 소비자 분쟁 해결 기준</button>
        </div>
        <div class="row mt-3">
          <div class="col-12 mb-3">
            <transition name="slide-fade">
              <div class="card border-secondary h750 overflow" v-if="isCompensationDomestic">
                <h4 class="card-header text-secondary">
                  <strong>국내 여행 소비자 분쟁 해결 기준</strong>
                </h4>
                <div class="card-body" v-html="compensationDomesticTravel">
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="card border-info h750 overflow" v-if="isCompensationForeign">
                <h4 class="card-header text-info">
                  <strong>국외 여행 소비자 분쟁 해결 기준</strong>
                </h4>
                <div class="card-body" v-html="compensationForeignTravel">
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
    name: "ProvisionCompensation",
    data() {
      return {
        isCompensationDomestic: false,
        isCompensationForeign: true
      }
    },
    methods: {
      callCompensation(payload) {
        if (payload === 'domestic') {
          this.isCompensationDomestic = true;
          this.isCompensationForeign = false
        } else if (payload === 'foreign') {
          this.isCompensationDomestic = false;
          this.isCompensationForeign = true
        }
      }
    },
    computed: {
      compensationDomesticTravel() {
        return require('../../../assets/markdown/compensation_domestic_travel.md')
      },
      compensationForeignTravel() {
        return require('../../../assets/markdown/compensation_foreign_travel.md')
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
  .slide-fade-enter-active {
    transition: all .6s ease;
  }
  .slide-fade-leave-active {
    transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
