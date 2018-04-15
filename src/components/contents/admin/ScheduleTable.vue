<template>
  <div class="col p-0" v-if="scheduleLoading">
    <div class="table-responsive rounded border border-secondary" v-if="getDateCounts !== 0">
      <table class="table table-striped table-bordered m-0">
        <thead class="thead-dark text-center">
        <tr>
          <th scope="col">DATE<br/>날짜</th>
          <th scope="col">PLACE<br/>장소</th>
          <th scope="col">TRANSPORT<br/>교통</th>
          <th scope="col">TIME<br/>시간</th>
          <th scope="col">ITINERARY<br/>일정</th>
          <th scope="col" v-if="acceptModify">MODIFY<br/>수정</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="value in getDateTable" :key="value.id">
          <th class="text-center align-middle" scope="row">
            <p class="m-0">제 {{value.date_num}} 일</p>
            <p class="m-0">{{value.date_time}}</p>
          </th>
          <td class="schedulePlace">
            <ul class="list-group">
              <li class="list-group-item bg-transparent border-0 pt-1 pb-1 pl-0 pr-0" v-for="index in getScheduleInfo[value.date_num]" :key="index.id">
                {{index['place']}}
              </li>
            </ul>
          </td>
          <td class="via">
            <ul class="list-group">
              <li class="list-group-item bg-transparent border-0 pt-1 pb-1 pl-0 pr-0" v-for="index in getScheduleInfo[value.date_num]" :key="index.id">
                {{index['transport']}}
              </li>
            </ul>
          </td>
          <td class="time">
            <ul class="list-group">
              <li class="list-group-item bg-transparent border-0 pt-1 pb-1 pl-0 pr-0" v-for="index in getScheduleInfo[value.date_num]" :key="index.id">

              </li>
            </ul>
          </td>
          <td class="itinerary">
            <ul class="list-group">
              <li class="list-group-item bg-transparent border-0 pt-1 pb-1 pl-0 pr-0" v-for="index in getScheduleInfo[value.date_num]" :key="index.id">
                {{index['description']}}
              </li>
            </ul>
          </td>
          <td class="modify align-middle text-center" v-if="acceptModify">
              <button class="btn btn-secondary">제 {{value.date_num}}일 수정</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row" v-if="getDateCounts === 0">
      <div class="col-lg-6 offset-lg-3 col-md-12">
        <div class="alert alert-info text-center">
          <h4 class="alert-heading m-0"><strong>일정표 데이터가 없습니다!</strong></h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "ScheduleTable",
    props: ['scheduleLoading', 'acceptModify'],
    data() {
      return {
        loading: false,
        params: this.$route.params.pk
      }
    },
    created() {
      this.fetchData();
    },
    watch: {
      '$route': 'FetchData',
      getDateTable: function () {
        let step;
        for (step = 1; step < this.getDateCounts + 1; step++) {
          let formData ={
            params: this.params,
            dateNum: step
          };
          this.$store.dispatch('getScheduleListQuery', formData)
        }
      }
    },
    methods: {
      tableResult () {
        this.loading = true
      },
      fetchData() {
        this.$store.dispatch('getDateListQuery', this.params);
      }
    },
    computed: {
      ...mapGetters([
        'getDateTable',
        'getDateCounts',
        'getScheduleInfo'
      ]),
    }
  }
</script>
<style scoped>
</style>
