<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>{{getProductRetrieve.title}} 일정표 관리</strong></h2>
      </div>
      <hr>
      <div class="row ml-2 mr-2 mt-4 mb-4 justify-content-between text-center">
        <div class="col-5 p-2 rounded border border-secondary">출발 일시: <strong>{{getProductRetrieve.start_time}}</strong></div>
        <div class="col-5 p-2 rounded border border-secondary">도착 일시: <strong>{{getProductRetrieve.end_time}}</strong></div>
      </div>
      <div class="row m-2">
        <schedule-table v-on:parseDateNum="parseDateNum" v-on:callScheduleDetail="callScheduleDetail" v-bind:scheduleLoading="scheduleLoading" v-bind:acceptModify="acceptModify"/>
      </div>
      <div class="row m-2" v-if="scheduleDetail">
        <schedule-detail v-bind:dateNum="dateNum" v-on:callScheduleDetail="callScheduleDetail"/>
      </div>
      <div class="row m-2 mt-5 mb-5">
        <div class="col-12" v-if="isDateFull">
          <form @submit.prevent="onSubmit" method="post">
            <label for="inputDate">일정 추가하기</label>
            <div class="input-group input-group-lg">
              <input id="inputDate" type="text" class="form-control rounded-left" :placeholder="getNextDateText" readonly>
              <span class="input-group-btn">
                <button class="btn btn-info btn-lg rounded-0 round" type="submit">{{getDateCounts + 1}}일차 추가</button>
              </span>
            </div>
          </form>
        </div>
        <div class="col-12" v-else>
          <div class="alert alert-warning text-center">
            <h5><strong>모든 일정을 등록하셨습니다.</strong></h5>
            <h6 class="m-0">세부 스케줄을 채워 주세요!</h6>
          </div>
        </div>
      </div>
      <div class="row m-2">
        <message/>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Message from '../../Message'
  import ScheduleTable from './ScheduleTable'
  import ScheduleDetail from './ScheduleDetail'
  export default {
    name: "ScheduleCreate",
    components: {
      ScheduleTable,
      ScheduleDetail,
      Message
    },
    data() {
      return {
        params: this.$route.params.pk,
        dateNum: 0,
        scheduleLoading: false,
        scheduleDetail: false,
        acceptModify: true
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData',
    },
    methods: {
      callScheduleDetail(payload) {
        this.scheduleDetail = payload
      },
      parseDateNum(payload) {
        this.dateNum = payload
      },
      onSubmit() {
        this.$store.commit('clearMsg');
        this.$store.dispatch('createDate', this.params);
      },
      fetchData() {
        this.$emit('manageContent', false);
        this.$store.dispatch('getProductRetrieveQuery', this.params);
        setTimeout(()=> {
          this.scheduleLoading ? this.scheduleLoading = false : this.scheduleLoading = true
        }, 500)
      }
    },
    computed: {
      ...mapGetters([
        'getProductRetrieve',
        'getDateTable',
        'getDateCounts',
        'getEndDateObj',
        'getNextDateObj',
        'getNextDateText'
      ]),
      isDateFull () {
        return this.getEndDateObj >= this.getNextDateObj
      }
    }
  }
</script>
<style scoped>
  .round {
    border-top-right-radius: .25rem !important;
    border-bottom-right-radius: .25rem !important;
  }
</style>
