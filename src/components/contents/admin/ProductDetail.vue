<template>
  <div class="col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block" v-if="product">
        <h2><strong>{{product.title}} 관리</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <div class="loading" v-if="loading">
          <h4>잠시만 기다려 주세요...</h4>
        </div>
        <div class="content" v-if="error">
          {{error}}
        </div>
        <div class="content row" v-if="product">
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
      <div class="row m-2">
        <div class="content table-responsive-sm" v-if="dateTable">
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">DATE<br/>날짜</th>
              <th scope="col">PLACE<br/>장소</th>
              <th scope="col">VIA<br/>교통</th>
              <th scope="col">TIME<br/>시간</th>
              <th scope="col">ITINERARY<br/>일정</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="value in dateTable.results" :key="value.id">
              <th scope="row">
                <p class="m-0">제 {{value.date_num}} 일</p>
                <p class="m-0">{{value.date_time}}</p>
              </th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>abc</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios/index'

  export default {
    name: "ProductDetail", data() {
      return {
        loading: false,
        error: null,
        product: null,
        dateValue: null,
        dateTable: null
      }
    }, created() {
      this.fetchData()
    }, watch: {
      '$route': 'fetchData'
    }, methods: {
      calcDate(startTime, endTime) {
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        const dayValue = 24 * 60 * 60 * 1000;
        this.dateValue = parseInt((endDate - startDate) / dayValue);
      }, getProductRetrieveQuery() {
        axios({
          method: 'get',
          url: this.$store.state.endpoints.baseUrl + this.$store.state.endpoints.travel + this.$route.params.pk + '/',
          header: {
            'Content-Type': 'application/json'
          },
          xsrfHeaderName: 'X-XSRF-TOKEN',
          credentials: true
        }).then((response) => {
          this.loading = false;
          this.product = response.data;
          this.calcDate(this.product.start_time, this.product.end_time)
        }).catch((error) => {
          this.loading = false;
          this.error = error.message;
        })
      }, getDateListQuery() {
        axios({
          method: 'get',
          url: this.$store.state.endpoints.baseUrl + this.$store.state.endpoints.travel + this.$route.params.pk + '/' +
          this.$store.state.endpoints.date,
          header: {
            'Content-Type': 'application/json'
          },
          xsrfHeaderName: 'X-XSRF-TOKEN',
          credentials: true
        }).then((response) => {
          this.dateTable = response.data;
        })
      }, fetchData() {
        this.error = this.product = null;
        this.loading = true;
        this.getProductRetrieveQuery();
        this.getDateListQuery();
      }
    }
  }
</script>
<style scoped>
</style>
