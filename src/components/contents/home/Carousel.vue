<template>
  <div>
    <div v-if="loading" class="alert alert-info text-center" role="alert">
      <h4 class="mb-0"><strong>순례 상품을 불러 오는 중입니다. 잠시만 기다려주세요!</strong></h4>
    </div>
    <div v-show="show" id="mainCarouselIndicators" class="carousel slide" data-ride="carousel">
        <ol id="productIndicators" class="carousel-indicators">
          <li data-target="#mainCarouselIndicators" v-for="index in getPublishedProductLists" :key="index.id" :data-slide-to="getPublishedProductLists.indexOf(index)"></li>
        </ol>
        <div class="carousel-inner" id="carousel">
          <div class="carousel-item" v-for="product in getPublishedProductLists" :key="product.id">
            <div class="max-height">
              <img v-if="product.image" :src="product.image" class="w-100" alt="순례 상품 대표 이미지">
              <img v-else class="w-100" src="../../../assets/image/medjugorje_maria_01.jpg" alt="기본 이미지">
            </div>
            <div id="opacity" class="card rounded-0">
              <div class="m-4 ml-5 text-white">
                <h2 class="card-title mb-1"><strong>{{product.title}}</strong></h2>
                <h6 class="card-text mb-1"><strong>{{product.start_time}} ~ {{product.end_time}}</strong></h6>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#mainCarouselIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#mainCarouselIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "carousel",
    data() {
      return {
        show: null,
        loading: false
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      addClass() {
        const carousel = window.document.getElementById('carousel');
        const indicator = window.document.getElementById('productIndicators');
        setTimeout(() => {
          const firstChild = carousel.childNodes[0];
          firstChild.classList.add('active');
          const firstIndicator = indicator.childNodes[0];
          firstIndicator.classList.add('active');
        }, 50);

      },
      fetchData() {
        this.show = this.loading = null;
        this.loading = true;
        this.$store.dispatch('getPublishedProductListQuery', '?page=1');
        setTimeout(() => {
          this.addClass();
          this.loading = false;
          this.show = true;
        }, 500);
      }
    },
    computed: {
      ...mapGetters([
          'getPublishedProductLists'
      ])
    }
  }
</script>
<style scoped>
  #opacity {
    background-color: rgba(0, 129, 213, 0.8);
  }
  @media (max-width: 359.98px) {
    .max-height {
      max-height: 96.66px;
      overflow: hidden;
    }
  }

  @media (min-width: 360px) and (max-width: 469.98px) {
    .max-height {
      max-height: 115px;
      overflow: hidden;
    }
  }

  @media (min-width: 470px) and (max-width: 575.98px) {
    .max-height {
      max-height: 170px;
      overflow: hidden;
    }
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    .max-height {
      max-height: 170px;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .max-height {
      max-height: 230px;
    }
  }

  @media (min-width: 992px) and (max-width: 1199.98px) {
    .max-height {
      max-height: 310px;
    }
  }

  @media (min-width: 1200px) {
    .max-height {
      max-height: 370px;
    }
  }
</style>
