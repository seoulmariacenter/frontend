<template>
  <div class="col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>예약 관리</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <div class="loading" v-if="loading">
          Loading...
        </div>
        <div class="content" v-if="error">
          {{error}}
        </div>
        <div class="row content justify-content-between" v-if="post">
          <div class="col-md-auto p-0 m-2" v-for="value in post.results" :key="value.id">
            <router-link :to="{path: 'product/' + value.pk + '/' }">
            <div class="card bg-dark text-white">
              <img class="card-img" src="http://via.placeholder.com/200x150" alt="Card image">
              <div class="card-img-overlay">
                <h5 class="card-title">{{value.title}}</h5>
                <p class="card-text">{{value.start_time}} - {{value.end_time}}</p>
                <p class="card-text text-right">{{value.price}}원</p>
              </div>
            </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios/index'
  export default {
    name: "ReservationManagement",
    props: ['value.pk'],
    data () {
      return {
        url: 'http://localhost:8080/admin/dashboard/',
        loading: false,
        error: null,
        post: null
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      getProductQuery() {
        axios({
          method: 'get',
          url: this.$store.state.endpoints.baseUrl + this.$store.state.endpoints.travel,
          headers: {
            'Content-Type': 'application/json'
          },
          xsrfHeaderName: 'X-XSRF-TOKEN',
          credentials: true
        }).then((response) => {
          this.loading = false;
          this.post = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      fetchData() {
        this.error = this.post = null;
        this.loading = true;
        this.getProductQuery()
      }
    }
  }
</script>
<style scoped>
</style>
