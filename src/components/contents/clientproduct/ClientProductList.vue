<template>
  <div class="bg-light">
    <div class="p-3">
      <div class="d-block">
        <h2><strong>순례 상품 보기</strong></h2>
      </div>
      <hr>
      <div class="m-2">
        <div class="loading" v-if="loading">
          <h4>잠시만 기다려 주세요...</h4>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-auto p-0 m-1" v-for="value in getPublishedProductLists" :key="value.id">
            <router-link :to="{name: 'ClientProductDetail', params: {pk: value.pk}}" tag="a" class="hovering">
              <div class="card text-dark" style="width: 18rem">
                <div style="max-height: 190px">
                  <img v-if="value.image" class="card-img-top" :src="value.image" alt="Card image">
                  <img v-else class="card-img-top" src="../../../assets/image/medjugorje_maria_01.jpg">
                </div>
                <div class="card-body bg-white">
                  <h4 class="card-title mb-0"><strong>{{value.title}}</strong></h4>
                  <p class="card-text mb-2">{{value.start_time}} - {{value.end_time}}</p>
                  <p class="card-text mb-0 text-right"><strong>{{value.price}}</strong> 원</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="m-2">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" v-for="num in pageListCount" :key="num.id">
              <button @click="callPaginatedList(num)" class="page-link text-info">{{num}}</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ClientProductList",
    data () {
      return {
        loading: false,
      }
    },
    created () {
      this.fetchData();
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      callPaginatedList(payload) {
        const pageNum = '?page=' + String(payload);
        this.$store.dispatch('getPublishedProductListQuery', pageNum)
      },
      fetchData() {
        this.loading = true;
        this.$store.dispatch('getPublishedProductListQuery', '?page=1');
        this.loading = false;
      }
    },
    computed: {
      ...mapGetters([
        'getPublishedProductLists',
        'getWholeProductLists'
      ]),
      pageListCount() {
        let total;
        let resultArray = Array();

        if (Number.isInteger(parseInt(this.getWholeProductLists.count) / 6)) {
          total = parseInt(this.getWholeProductLists.count) / 6
        } else {
          total = parseInt(this.getWholeProductLists.count / 6) + 1
        }

        for (let key = 1; key < total + 1; key++) {
          resultArray.push(key)
        }
        return resultArray;
      }
    }
  }
</script>
<style scoped>
  .hovering:hover {
    text-decoration: none;
  }
</style>
