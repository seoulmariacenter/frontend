<template>
  <div>
    <div v-if="loading" class="alert alert-info text-center" role="alert">
      <h4 class="mb-0"><strong>순례 상품을 불러 오는 중입니다. 잠시만 기다려주세요!</strong></h4>
    </div>
    <div v-show="show" class="d-flex overflow">
      <div class="ml-2 mr-2" v-for="index in getPublishedProductLists" :key="index.id">
        <router-link :to="{name: 'ClientProductDetail', params:{pk: index.pk}}" tag="a" class="text-dark decoration">
        <div class="card" style="width: 22rem;">
          <div class="img-height">
            <img v-if="index.image" :src="index.image" class="card-img-top"/>
            <img v-else class="card-img-top" src="../../../assets/image/medjugorje_maria_01.jpg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{index.title}}</h5>
            <p class="card-text">
              <span class="float-left">{{index.start_time}}~{{index.end_time}}</span>
              <span class="float-right"><strong>{{index.price}} 원</strong></span>
            </p>
          </div>
        </div>
        </router-link>
      </div>
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
      fetchData() {
        this.show = this.loading = null;
        this.loading = true;
        this.$store.dispatch('getPublishedProductListQuery', '?page=1');
        this.loading = false;
        this.show = true;
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
  .overflow {
    overflow-x: scroll;
  }
  .decoration:hover {
    text-decoration: none;
  }
  .img-height {
    max-height: 116.66px;
    overflow: hidden;
  }
</style>
