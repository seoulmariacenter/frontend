<template>
  <div class="bg-light col-md-6 col-sm-12 mb-4">
    <div class="pt-3 pb-3">
      <div class="d-block d-flex justify-content-between">
        <h2 class="mb-0"><strong>순례 상품 선택</strong></h2>
        <p class="mt-3 mb-0">총 <span class="text-info">{{getWholeProductLists.count}}</span> 개 상품</p>
      </div>
      <hr>
      <div class="m-0 justify-content-center h550 overflow">
        <div class="m-2" v-if="loading">
          <div class="alert alert-info text-center h-50" role="alert">
            <h4 class="mt-4"><strong>순례 상품을 불러 오는 중입니다.</strong></h4>
            <h4><strong>잠시만 기다려주세요!</strong></h4>
          </div>
        </div>
        <div class="row m-2" v-if="post">
          <div
          v-for="value in getPublishedProductLists"
          :key="value.id"
          :id="'card_' + value.pk"
          @click="callProductInfo([value.pk, value.title])"
          role="button"
          class="col-12 p-0 mb-4 product">
            <div class="card text-dark">
              <div style="max-height: 163px; overflow: hidden">
                <img v-if="value.image" class="card-img-top" :src="value.image" alt="Card image">
                <img v-else class="card-img-top" src="../../../assets/image/medjugorje_maria_01.jpg">
              </div>
              <div class="card-body bg-white">
                <h4 class="card-title mb-0"><strong>{{value.title}}</strong></h4>
                <div class="d-flex justify-content-between">
                  <span class="card-text d-inline-block">{{value.start_time}}~{{value.end_time}}</span>
                  <span class="card-text d-inline-block"><strong>{{value.price}}</strong> 원</span>
                </div>
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
      callProductInfo(payload) {
        const otherCardElement = window.document.getElementsByClassName('product');
        for (let key = 0; key < otherCardElement.length; key++ in otherCardElement) {
          otherCardElement[key].classList.remove('border', 'border-info')
        }
        const cardElement = window.document.getElementById('card_' + payload[0]);
        cardElement.classList.add('border', 'border-info');
        this.$emit('callProductInfo', payload)
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
  .h550 {
    height: 550px;
  }
  .overflow {
    overflow: scroll;
  }
  .product {
    cursor: pointer;
  }
</style>
