<template>
  <div class="col p-0" v-if="property">
    <div class="table-responsive table-responsive-md table-responsive-sm" v-if="dateTable.count !== 0">
      <table class="table table-striped">
        <thead class="thead-dark text-center">
        <tr>
          <th scope="col">DATE<br/>날짜</th>
          <th scope="col">PLACE<br/>장소</th>
          <th scope="col">TRANSPORT<br/>교통</th>
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
              <li class="list-group-item bg-transparent border-0 pt-1 pb-1 pl-0 pr-0" v-for="index in scheduleTable[value.date_num]['results']" :key="index.id">
                {{index['place']}}
              </li>
            </ul>
          </td>
          <td class="via">
            <ul class="list-group">
              <li class="list-group-item bg-transparent border-0 pt-1 pb-1 pl-0 pr-0" v-for="index in scheduleTable[value.date_num]['results']" :key="index.id">
                {{index['transport']}}
              </li>
            </ul>
          </td>
          <td class="time">
            <ul class="list-group">
              <li class="list-group-item bg-transparent border-0 pt-1 pb-1 pl-0 pr-0" v-for="index in scheduleTable[value.date_num]['results']" :key="index.id">

              </li>
            </ul>
          </td>
          <td class="itinerary">
            <ul class="list-group">
              <li class="list-group-item bg-transparent border-0 pt-1 pb-1 pl-0 pr-0" v-for="index in scheduleTable[value.date_num]['results']"
              :key="index.id">
                {{index['description']}}
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row" v-if="dateTable.count === 0">
      <div class="col-lg-6 offset-lg-3 col-md-12">
        <div class="alert alert-info text-center">
          <h4 class="alert-heading"><strong>일정표 데이터가 없습니다!</strong></h4>
          <button class="btn btn-outline-info">일정표 만들기</button>
        </div>
      </div>
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
