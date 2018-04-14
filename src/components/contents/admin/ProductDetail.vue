<template>
  <div class="col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block" v-if="product">
        <h2><strong>{{product.title}} 관리</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <div class="loading" v-if="parentLoading">
          <h4>잠시만 기다려 주세요...</h4>
        </div>
        <div class="content" v-if="error">
          {{error}}
        </div>
        <div class="content" v-if="product">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0"><strong>상품명:</strong> {{product.title}}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>소요 시간:</strong> {{product.start_time}} ~ {{product.end_time}}
                <strong>({{dateValue}}박 {{dateValue + 1}}일)</strong></li>
              <li class="list-group-item"><strong>가격:</strong> {{product.price}}원</li>
            </ul>
          </div>
        </div>
      </div>
      <hr>
      <div class="row m-2 d-flex justify-content-between">
          <button class="col-5 btn btn-outline-info mr-1" @click="tableResult">일정표 확인</button>
          <button class="col-5 btn btn-outline-primary ml-1">예약 확인</button>
      </div>
      <div class="row m-2 mt-5">
        <schedule-table v-bind:scheduleLoading="scheduleLoading" v-bind:product="product"/>
      </div>

    </div>
  </div>
</template>
<script>
  import axios from 'axios/index'
  import {mapGetters} from 'vuex'
  import ScheduleTable from './ScheduleTable'
  export default {
    name: "ProductDetail",
    components: {
      ScheduleTable
    },
    data() {
      return {
        parentLoading: false,
        scheduleLoading: false,
        error: null,
        product: null,
        dateValue: null,
        dateArray: Array(),
        scheduleTable: Object()
      }
    },
    created() {
      this.FetchData();
    },
    watch: {
      '$route': 'FetchData'
    },
    methods: {
      tableResult() {
        return this.scheduleLoading ? this.scheduleLoading = false : this.scheduleLoading = true
      },
      calcDate(startTime, endTime) {
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        const dayValue = 24 * 60 * 60 * 1000;
        this.dateValue = parseInt((endDate - startDate) / dayValue);
      },
      getProductRetrieveQuery() {
        axios({
          method: 'get',
          url: this.$store.state.endpoints.baseUrl + this.$store.state.endpoints.travel + this.$route.params.pk + '/',
          header: {
            'Content-Type': 'application/json'
          },
          xsrfHeaderName: 'X-XSRF-TOKEN',
          credentials: true
        }).then((response) => {
          this.parentLoading = false;
          this.product = response.data;
          this.calcDate(this.product.start_time, this.product.end_time)
        }).catch((error) => {
          this.parentLoading = false;
          this.error = error.message;
        })
      },
      FetchData() {
        this.getProductRetrieveQuery();
        this.$emit('manageContent', false)
      },
    ...mapGetters([
        'getDateCounts'
    ])
    }
  }
</script>
<style scoped>
</style>
