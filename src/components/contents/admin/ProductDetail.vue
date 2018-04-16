<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>{{getProductRetrieve.title}} 관리</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <div class="loading" v-if="parentLoading">
          <h4>잠시만 기다려 주세요...</h4>
        </div>
        <div class="content" v-if="getProductRetrieve">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0"><strong>상품명:</strong> {{getProductRetrieve.title}}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>소요 시간:</strong> {{getProductRetrieve.start_time}} ~ {{getProductRetrieve.end_time}}
                <strong>({{calcDate}}박 {{calcDate+1}}일)</strong></li>
              <li class="list-group-item"><strong>가격:</strong> {{getProductRetrieve.price}}원</li>
            </ul>
          </div>
        </div>
        <message/>
      </div>
      <hr>
      <div class="row m-2 d-flex justify-content-between">
        <button class="col-3 btn btn-outline-info mr-1" @click="tableResult">일정표 확인</button>
        <router-link :to="{name: 'Schedule'}" tag="button" class="col-3 btn btn-outline-warning">일정표 관리</router-link>
        <button class="col-3 btn btn-outline-primary ml-1">예약 확인</button>
      </div>
      <div class="row m-2 mt-5">
        <schedule-table v-bind:scheduleLoading="scheduleLoading" v-bind:acceptModify="acceptModify"/>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import ScheduleTable from './ScheduleTable'
  import Message from '../Message'
  export default {
    name: "ProductDetail",
    components: {
      ScheduleTable,
      Message
    },
    data() {
      return {
        parentLoading: false,
        scheduleLoading: false,
        acceptModify: false,
        dateValue: 0,
        params: this.$route.params.pk
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
      FetchData() {
        this.$emit('manageContent', false);
        this.$store.commit('clearProductRetrieve');
        this.parentLoading = true;
        this.$store.dispatch('getProductRetrieveQuery', this.params);
        this.parentLoading = false;
      },
      ...mapMutations([
        'clearProductRetrieve'
      ])
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
