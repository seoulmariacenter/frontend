<template>
  <div class="post content table-responsive-sm" v-if="property">
    <table class="table table-striped" v-if="dateTable.count !== 0">
      <thead class="thead-dark text-center">
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
        <th class="text-center align-middle" scope="row">
          <p class="m-0">제 {{value.date_num}} 일</p>
          <p class="m-0">{{value.date_time}}</p>
        </th>
        <td class="schedulePlace">
          <ul class="list-group">
            <li class="list-group-item bg-transparent border-0 pt-1 pb-1" v-for="index in scheduleTable[value.date_num]['results']" :key="index.id">
              <span>{{index['place']}}</span>
            </li>
          </ul>
        </td>
        <td class="via">
          <ul class="list-group">
            <li class="list-group-item bg-transparent border-0 pt-1 pb-1" v-for="index in scheduleTable[value.date_num]['results']" :key="index.id">
              <span>{{index['transport']}}</span>
            </li>
          </ul>
        </td>
        <td class="time">
          <ul class="list-group">
            <li class="list-group-item bg-transparent border-0 pt-1 pb-1" v-for="index in scheduleTable[value.date_num]['results']" :key="index.id">

            </li>
          </ul>
        </td>
        <td class="itinerary">
          <ul class="list-group">
            <li class="list-group-item bg-transparent border-0 pt-1 pb-1" v-for="index in scheduleTable[value.date_num]['results']"
            :key="index.id">
              <span>{{index['description']}}</span>
            </li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="alert alert-danger" v-if="dateTable.count === 0">
      일정표 데이터가 없습니다!
    </div>
  </div>
</template>
<script>
  import axios from 'axios/index'
  import { mapGetters } from 'vuex'
  export default {
    name: "DateTable",
    props: ['property'],
    data() {
      return {
        loading: false,
        dateTable: null,
        scheduleTable: null
      }
    },
    created() {
      this.fetchData();
    },
    watch: {
      '$route': 'FetchData',
      dateTable: function () {
        this.scheduleTable = Array();
        let step;
        for (step = 1; step < this.getDateCounts + 1; step++) {
          this.$nextTick(this.getScheduleListQuery(step));
        }
      }
    },
    methods: {
      tableResult () {
        this.loading = true
      },
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
          this.$store.commit('updateDateCounts', response.data.count);
        })
      },
      getScheduleListQuery (dateNum) {
        axios({
          method: 'get',
          url: this.$store.state.endpoints.baseUrl + this.$store.state.endpoints.travel + this.$route.params.pk + '/' +
          this.$store.state.endpoints.date + parseInt(dateNum) + '/schedule/',
          header: {
            'Content-Type': 'application/json'
          },
          xsrfHeaderName: 'X-XSRF-TOKEN',
          credentials: true
        }).then((response) => {
          this.scheduleTable[dateNum] = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      fetchData() {
        this.getDateListQuery();
      }
    },
    computed: {
      ...mapGetters([
        'getDateCounts',
        'getScheduleInfo'
      ]),
    }
  }
</script>
<style scoped>
</style>
