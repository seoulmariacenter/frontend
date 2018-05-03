<template>
  <div class="bg-light">
    <div class="p-3">
      <div class="d-block">
        <h2><strong>순례 상품 보기</strong></h2>
      </div>
      <hr>
      <div class="m-2">
        <div class="card">
          <img v-if="getProductRetrieve.image" class="card-img-top" :src="getProductRetrieve.image" alt="메인 이미지">
          <img v-else class="card-img-top" src="../../../assets/image/medjugorje_maria_01.jpg" alt="default image">
          <div class="card-header">
            <h5 class="mb-0"><strong>상품명:</strong> {{getProductRetrieve.title}}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>소요 시간:</strong> {{getProductRetrieve.start_time}} ~ {{getProductRetrieve.end_time}}
              <strong>({{calcDate}}박 {{calcDate+1}}일)</strong></li>
            <li class="list-group-item"><strong>가격:</strong> {{getProductRetrieve.price}}원</li>
          </ul>
        </div>
        <hr>
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0"><strong>설명</strong></h5>
          </div>
          <div class="card-body">
            <p>{{getProductRetrieve.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ClientProductDetail",
    data() {
      return {
        params: this.$route.params.pk
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
        this.$store.dispatch('getPublishedProductRetrieveQuery', this.params)
      }
    },
    computed: {
      ...mapGetters([
        'getProductRetrieve',
        'calcDate'
      ])
    }
  }
</script>
<style scoped>
</style>
