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
        <div class="row content justify-content-between">
          <div class="col-md-auto p-0 m-2" v-for="value in getProductLists" :key="value.id">
            <router-link :to="{name: 'Product', params: {pk: value.pk} }">
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
        <message/>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import ProductDetail from './ProductDetail'
  import Message from '../../Message'
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
      fetchData() {
        this.$emit('manageContent', false);
        this.loading = true;
        this.$store.dispatch('getProductListsQuery');
        this.loading = false;
      }
    },
    computed: {
      ...mapGetters([
        'getProductLists'
      ])
    }
  }
</script>
<style scoped>
</style>
