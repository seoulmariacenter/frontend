<template>
  <div class="col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block" v-if="post">
        <h2><strong>{{post.title}} 관리</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <div class="loading" v-if="loading">
          <h4>잠시만 기다려 주세요...</h4>
        </div>
        <div class="content" v-if="error">
          {{error}}
        </div>
        <div class="row" v-if="post">
          {{post}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios/index'
  export default {
    name: "ProductDetail",
    data () {
      return {
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
      getProductRetrieveQuery() {
        axios({
          method: 'get',
          url: this.$store.state.endpoints.baseUrl + this.$store.state.endpoints.travel + this.$route.params.pk + '/',
          header: {
            'Content-Type': 'application/json'
          },
          xsrfHeaderName:'X-XSRF-TOKEN',
          credentials: true
        }).then((response) => {
          this.loading = false;
          this.post = response.data;
        }).catch((error) => {
          this.loading = false;
          this.error = error.message;
        })
      },
      fetchData () {
        this.error = this.post = null;
        this.loading = true;
        this.getProductRetrieveQuery()
      }
    }
  }
</script>
<style scoped>
</style>
