<template>
  <div class="col-lg-8 col-md-8 bg-light pl-0 pr-0">
    <div class="m-3">
      <div class="d-block ml-3">
        <h2><strong>성모님의 부르심을 찾아서</strong></h2>
      </div>
      <hr>
      <div class="m-3">
        <p>서울마리아센터의 중심 순례지인 <strong>메주고리예</strong> 성모 성지를 소개합니다.</p>
        <p>출처: <a target="_blank"
        class="text-info"
        href="http://www.qpmm.org/">평화의 모후 선교회</a>,
          <a target="_blank"
          class="text-info"
          href="https://www.medjugorje.com/medjugorje">메주고리예 성지 공식 홈페이지</a>
        </p>
        <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-lg-2 mr-sm-1 mb-2" role="group" aria-label="First group">
            <button
            @click="callMedjugorje('medjugorje')"
            class="btn btn-outline-secondary"
            type="button">메주고리예 소개
            </button>
          </div>
          <div class="btn-group mr-lg-2 mr-sm-0 mb-2" role="group" aria-label="Second group">
            <button
            @click="callMedjugorje('visionaries')"
            class="btn btn-outline-info"
            type="button">메주고리예 발현 기록
            </button>
          </div>
          <div class="btn-group mr-lg-2 mr-sm-1 mb-2" role="group" aria-label="Third group">
            <button
            @click="callMedjugorje('bishops')"
            class="btn btn-outline-primary"
            type="button">가톨릭 교회의 입장
            </button>
          </div>
          <div class="btn-group mr-lg-0 mr-sm-0 mb-2" role="group" aria-label="Fourth group">
            <button
            @click="callMedjugorje('youth')"
            class="btn btn-outline-warning"
            type="button">유스페스티벌
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 mb-3">
            <transition name="slide-fade">
              <div class="card border-secondary" v-if="isMedjugorje">
                <h4 class="card-header text-secondary">
                  <strong>메주고리예 소개</strong>
                </h4>
                <div class="card-body" v-html="aboutMedjugorje">
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="card border-info" v-if="isVisionaries">
                <h4 class="card-header text-info">
                  <strong>메주고리예 발현 기록</strong>
                </h4>
                <div class="card-body" v-html="aboutVisionaries">
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="card border-primary" v-if="isBishops">
                <h4 class="card-header text-primary">
                  <strong>가톨릭 교회의 입장</strong>
                </h4>
                <div class="card-body" v-html="aboutBishops">
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="card border-warning" v-if="isYouth">
                <h4 class="card-header text-warning">
                  <strong>유스페스티벌</strong>
                </h4>
                <div class="card-body">
                  <h3>메주고리예 유스페스티벌이란?</h3>
                  <p class="mb-1">메주고리예에서는 1989년부터 매년 7-8월마다 전 세계의 청년들이 함께 모여 성모님을 찬양하는 축제를 벌이고 있습니다.
                    2017년 기준으로 28회 째를 맞이하고 있는 유스페스티벌은 회를 거듭할수록 규모가 커져 참가 사제 약 5백 명, 순례객 약 5만 명에 이르는 국제적 규모의 행사가 되었습니다.</p>
                  <p><a target="_blank"
                  href="https://www.facebook.com/Medjugorje-Youth-festival-310061499090138/"
                  class="text-warning">
                    <strong>유스페스티벌 페이스북 페이지 바로 가기</strong>
                  </a></p>
                  <hr>
                  <h3>영상 보기</h3>
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe
                    class="embed-responsive-item"
                    src="https://www.youtube.com/embed/8iWlBLxGIjw?rel=0"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen></iframe>
                  </div>
                  <hr>
                  <h3>사진으로 보는 유스페스티벌</h3>
                  <div class="row">
                    <div class="col-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_01.jpg" class="img-fluid">
                    </div>
                    <div class="col-md-6 col-sm-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_02.jpg" class="img-fluid">
                    </div>
                    <div class="col-md-6 col-sm-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_04.jpg" class="img-fluid">
                    </div>
                    <div class="col-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_03.jpg" class="img-fluid">
                    </div>
                  </div>
                  <p>유럽, 미국, 아시아, 남미, 아프리카 등 세계 각국에서 모인 청년들은 성모님의 은총 아래 서로의 신앙을 공유하고, 우리 모두가 하나의 가톨릭 공동체임을 재확인합니다.</p>
                  <div class="row">
                    <div class="col-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_07.jpg" class="img-fluid mb-4">
                      <p class="mb-0">유스페스티벌 기간 동안에는 여러 나라에서 오신 신부님들이 야외 광장에서 각국의 언어로 고해성사를 베풀어주십니다. 광장 전체에 고해성사를 보는 청년들이 가득 차 있는 광경은 우리의 가슴을 벅차오르게 합니다.</p>
                    </div>
                    <div class="col-md-6 col-sm-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_05.jpg" class="img-fluid">
                    </div>
                    <div class="col-md-6 col-sm-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_06.jpg" class="img-fluid">
                    </div>
                    <div class="col-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_08.jpg" class="img-fluid">
                    </div>
                  </div>
                  <p>유스페스티벌의 하이라이트는 야외 제단에서 다함께 바치는 공동체 미사입니다. 5백여 명의 사제와 7만 명이 넘는 신자들이 거룩하신 성체를 나누어 먹고 성령의 불꽃으로 가슴이 타오르는 기쁨을 체험합니다.</p>
                  <div class="row">
                    <div class="col-12 mb-4">
                      <img src="../../../assets/image/midafest/midafest_09.jpg" class="img-fluid mb-4">
                      <p class="mb-0">유스페스티벌은 십자가 산 밤샘 순례를 끝으로 마무리됩니다. 새벽 일출과 함께 십자가 산 정상에서 드리는 미사의 감동을 여러분도 함께 느끼셨으면 좋겠습니다.</p>
                    </div>
                  </div>
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
        isMedjugorje: true,
        isVisionaries: false,
        isBishops: false,
        isYouth: false
      }
    },
    methods: {
      callMedjugorje(payload) {
        if (payload === 'medjugorje') {
          this.isMedjugorje = true;
          this.isVisionaries = this.isBishops = this.isYouth = false;
        } else if (payload === 'visionaries') {
          this.isVisionaries = true;
          this.isMedjugorje = this.isBishops = this.isYouth = false;
        } else if (payload === 'bishops') {
          this.isBishops = true;
          this.isMedjugorje = this.isVisionaries = this.isYouth = false;
        } else if (payload === 'youth') {
          this.isYouth = true;
          this.isMedjugorje = this.isVisionaries = this.isBishops = false;
        }
      }
    },
    computed: {
      aboutMedjugorje() {
        return require('../../../assets/markdown/about_medjugorje.md')
      },
      aboutVisionaries() {
        return require('../../../assets/markdown/about_visionaries.md')
      },
      aboutBishops() {
        return require('../../../assets/markdown/about_bishops_opinion.md')
      }
    }
  }
</script>
<style scoped>
  blockquote {
    margin-left: 4rem;
    margin-right: 4rem;
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
