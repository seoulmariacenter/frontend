<template>
  <div class="bg-light col-md-6 col-sm-12">
    <div class="m-3 pt-3 pb-3">
      <div class="d-block d-flex justify-content-between">
        <h2><strong>순례 상품 선택</strong></h2>
        <p class="mt-3 mb-0">총 <span class="text-info">{{getWholeProductLists.count}}</span> 개의 상품이 있습니다.</p>
      </div>
      <hr>
      <div class="row m-0 justify-content-center h500 overflow">
        <div v-if="loading" class="alert alert-info text-center" role="alert">
          <h4 class="mb-0"><strong>순례 상품을 가지고 오는 중입니다. 잠시만 기다려주세요!</strong></h4>
        </div>
        <div class="row m-2" v-if="post">
          <div class="col-12 p-0 mb-4" v-for="value in getPublishedProductLists" :key="value.id">
            <div class="card text-dark">
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
    name: "PublishedProductList",
    data() {
      return {
        loading: false,
        post: false

      }
    },
    created() {
      this.fetchData()
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
        setTimeout(() => {
          this.loading = false;
          this.post = true
        }, 100)
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
  .h500 {
    height: 330px;
  }
  .overflow {
    overflow: scroll;
  }
</style>
