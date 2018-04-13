<template>
  <div class="content table-responsive-sm" v-if="dateTable">
    <table class="table table-striped">
      <thead class="thead-dark">
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
        <td class="schedulePlace">
          {{getScheduleInfo}}
        </td>
        <td class="via">Otto</td>
        <td class="time">@mdo</td>
        <td class="itinerary">abcd</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import axios from 'axios/index'
  import store from '../../../store/index'
  import { mapGetters } from 'vuex'
  export default {
    name: "DateTable",
    data() {
      return {
        dateTable: null,
        dateCount: 0,
        scheduleTable: Object()
      }
    },
    created() {
      this.fetchData();
    },
    watch: {
      '$route': 'FetchData'
    },
    methods: {
      getDateListQuery() {
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
          store.commit('updateDateCounts', response.data.count)
        })
      },
      fetchData() {
        this.getDateListQuery();
        store.dispatch('iterateScheduleLoop');
      }
    },
    computed: {
      ...mapGetters([
        'getDateCounts',
        'getScheduleInfo'
      ])
    }
  }
</script>
<style scoped>
</style>
