<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>순례 상품 관리</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <div class="loading" v-if="loading">
          <h4>잠시만 기다려 주세요...</h4>
        </div>
        <div class="row content">
          <div class="col-md-auto p-0 m-1" v-for="value in getProductLists" :key="value.id">
            <router-link :to="{name: 'Product', params: {pk: value.pk} }" class="hovering">
            <div class="card text-dark" style="width: 18rem">
              <div v-if="value.image">
                <img class="card-img-top" :src="value.image" alt="Card image">
              </div>
              <div v-else>
                <img class="card-img-top" src="../../../../assets/image/medjugorje_maria_01.jpg">
              </div>
              <div class="card-body bg-white">
                <h4 class="card-title mb-0"><strong>{{value.title}}</strong></h4>
                <p class="card-text">{{value.start_time}} - {{value.end_time}}</p>
              </div>
            </div>
            </router-link>
          </div>
        </div>
        <message/>
      </div>
      <div class="m-2">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" v-for="num in pageListCount">
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
  import ProductDetail from './ProductDetail'
  import Message from '../../../structure/AppMessage'
  export default {
    name: "ProductManagement",
    components: {
      ProductDetail,
      Message
    },
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
        this.$store.dispatch('getProductListQuery', pageNum)
      },
      fetchData() {
        this.$emit('manageContent', false);
        this.loading = true;
        this.$store.dispatch('getProductListQuery', '?page=1');
        this.loading = false;
      }
    },
    computed: {
      ...mapGetters([
        'getProductLists',
        'getWholeProductLists'
      ]),
      pageListCount() {
        const total = parseInt(parseInt(this.getWholeProductLists.count) / 6) + 1;
        let resultArray = Array();
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
