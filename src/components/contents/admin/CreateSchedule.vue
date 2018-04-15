<template>
  <div class="col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>{{getProductRetrieve.title}} 일정표 만들기</strong></h2>
      </div>
      <hr>
      <div class="row m-2 justify-content-between text-center">
        <div class="col-5 p-2 rounded border border-secondary">출발 일시: <strong>{{getProductRetrieve.start_time}}</strong></div>
        <div class="col-5 p-2 rounded border border-secondary">도착 일시: <strong>{{getProductRetrieve.end_time}}</strong></div>
      </div>
      <h6 class="text-center m-4">출발 일시와 도착 일시를 확인하시고 날짜를 입력해주세요!</h6>
      <schedule-table v-bind:scheduleLoading="scheduleLoading"/>
      <div class="row m-2 mt-5 mb-5">
        <div class="col-12">
          <form @submit.prevent="onSubmit" method="post">
            <label for="inputDate">일정 추가</label>
            <div class="input-group input-group-lg">
              <input id="inputDate" type="text" class="form-control rounded-left" :placeholder="getNextDateText" readonly>
              <span class="input-group-btn">
                <button class="btn btn-info btn-lg rounded-0 round" type="submit">{{getDateCounts + 1}}일차 추가</button>
              </span>
            </div>
          </form>
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
  import Message from '../Message'
  import ScheduleTable from './ScheduleTable'
  export default {
    name: "CreateSchedule",
    components: {
      ScheduleTable,
      Message
    },
    data() {
      return {
        params: this.$route.params.pk,
        scheduleLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData',
    },
    methods: {
      fetchData() {
        this.$emit('manageContent', false);
        this.$store.dispatch('getProductRetrieveQuery', this.params);
      },
      onSubmit() {
          this.$store.dispatch('createDate', this.params);
        }
    },
    computed: {
      ...mapGetters([
        'getProductRetrieve',
        'getDateTable',
        'getDateCounts',
        'getNextDateText'
      ])
    }
  }
</script>
<style scoped>
  .round {
    border-top-right-radius: .25rem !important;
    border-bottom-right-radius: .25rem !important;
  }
</style>
