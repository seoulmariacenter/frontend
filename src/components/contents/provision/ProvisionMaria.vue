<template>
  <div class="col-lg-8 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>성모님의 부르심을 찾아서</strong></h2>
      </div>
      <hr>
      <div class="m-3">
        <p>서울마리아센터의 중심 순례지인 <strong>메쥬고리예</strong> 성모 성지를 소개합니다.</p>
        <p>출처: <a target="_blank"
        class="text-info"
        href="http://www.qpmm.org/">평화의 모후 선교회</a>
        </p>
        <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-lg-2 mr-sm-1 mb-2" role="group" aria-label="First group">
            <button
            class="btn btn-outline-secondary"
            type="button">메쥬고리예 소개
            </button>
          </div>
          <div class="btn-group mr-lg-2 mr-sm-1 mb-2" role="group" aria-label="Second group">
            <button
            class="btn btn-outline-info"
            type="button">메쥬고리예 발현 기록
            </button>
          </div>
          <div class="btn-group mr-lg-2 mr-sm-1 mb-2" role="group" aria-label="Third group">
            <button
            class="btn btn-outline-primary"
            type="button">가톨릭 교회의 입장
            </button>
          </div>
          <div class="btn-group mr-lg-2 mr-sm-0 mb-2" role="group" aria-label="Fourth group">
            <button
            class="btn btn-outline-warning"
            type="button">유스페스티벌
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 mb-3">
            <transition name="slide-fade">
              <div class="card border-secondary h750 overflow">
                <h4 class="card-header text-secondary">
                  <strong>메쥬고리예 소개</strong>
                </h4>
                <div class="card-body" v-html="aboutMedjugorje">
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
    name: "ProvisionMaria",
    data() {
      return {

      }
    },
    computed: {
      aboutMedjugorje() {
        return require('../../../assets/markdown/about_medjugorje.md')
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
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
