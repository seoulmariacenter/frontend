<template>
  <div id="mainCarouselIndicators" class="carousel slide" data-ride="carousel">
    <ol id="productIndicators" class="carousel-indicators">
      <li data-target="#mainCarouselIndicators" v-for="index in getPublishedProductLists" :key="index.id" :data-slide-to="getPublishedProductLists.indexOf(index)"></li>
    </ol>
    <div class="carousel-inner" id="carousel">
      <div class="carousel-item" v-for="product in getPublishedProductLists" :key="product.id">
        <img v-if="product.image" :src="product.image" class="d-block w-100" alt="순례 상품 대표 이미지">
        <img v-else class="d-block w-100" src="../../../assets/image/medjugorje_maria_01.jpg" alt="기본 이미지">
        <div id="opacity" class="card rounded-0">
          <div class="m-4 ml-5 text-white">
            <h1 class="card-title"><strong>{{product.title}}</strong></h1>
            <h5 class="card-text mb-1"><strong>{{product.start_time}} ~ {{product.end_time}}</strong></h5>
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
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "carousel",
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
        }, 1000);

      },
      fetchData() {
        this.$store.dispatch('getPublishedProductListQuery', '?page=1');
        setTimeout(() => {
          this.addClass()
        }, 1000)
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
</style>
