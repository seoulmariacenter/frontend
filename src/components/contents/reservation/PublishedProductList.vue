<template>
  <div class="bg-light">
    <div class="m-3 pt-3 pb-3">
      <div class="d-block">
        <h2><strong>순례 상품 관리</strong></h2>
      </div>
      <hr>
      <div class="loading" v-if="loading">
        <h2>잠시만 기다려 주세요...</h2>
      </div>
      <div class="row m-2" v-else>
        <div class="col-auto p-0 m-3" v-for="value in getPublishedProductLists" :key="value.id">
          <div class="card text-dark" style="width: 20rem">
            <div v-if="value.image">
              <img class="card-img-top" :src="value.image" alt="Card image">
            </div>
            <div v-else>
              <img class="card-img-top" src="../../../assets/image/medjugorje_maria_01.jpg">
            </div>
            <div class="card-body bg-white">
              <h4 class="card-title mb-0"><strong>{{value.title}}</strong></h4>
              <p class="card-text">{{value.start_time}} - {{value.end_time}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "PublishedProductList",
    data() {
      return {
        loading: true
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
        if (this.getPublishedProductLists) {
          this.loading = false
        }
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
</style>
