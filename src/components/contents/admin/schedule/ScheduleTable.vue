<template>
  <div class="p-0">
    <div class="d-flex justify-content-between mb-2">
      <h2 class="mt-1 mb-0"><strong>일정표</strong></h2>
      <button class="btn btn-outline-info" @click="tableResult">일정표 확인</button>
    </div>
    <div v-show="post">
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
          <tbody id="renderedTable">
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
                  {{index['time']}}
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
              <button class="btn btn-secondary" @click="callScheduleDetail(value.date_num)">제 {{value.date_num}}일 수정</button>
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
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "ScheduleTable",
    props: ['acceptModify'],
    data() {
      return {
        params: this.$route.params.pk,
        post: false
      }
    },
    created() {
      this.post = false;
      this.$store.dispatch('getDateListQuery', this.params);
    },
    beforeUpdate() {
      this.iterate();
    },
    updated() {
      this.addClass();
    },
    watch: {
      '$route': 'FetchData'
    },
    methods: {
      tableResult() {
        return this.post ? this.post = false : this.post = true
      },
      callScheduleDetail(payload) {
        this.$emit('parseDateNum', payload);
        this.$emit('callScheduleDetail', true);
        window.scrollTo(0, document.body.scrollHeight);
      },
      iterate () {
        let step;
        for (step = 1; step < this.getDateCounts + 1; step++) {
          let formData ={
            params: this.params,
            dateNum: step
          };
          this.$store.dispatch('getScheduleListQuery', formData);
        }
      },
      addClass() {
        const table = window.document.getElementById('renderedTable').getElementsByTagName('td');
        for (let key = 0; key < table.length; key++ in table) {
          const list = table[key].getElementsByTagName('ul')[0];
          if (list !== undefined) {
            for (let step in list.childNodes) {
              if (list.childNodes[step].innerText === '.') {
                list.childNodes[step].classList.add('invisible')
              }
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'getDateTable',
        'getDateCounts',
        'getScheduleInfo'
      ])
    }
  }
</script>
<style scoped>
  .invisible {
    color: rgba(0,0,0,0)
  }
</style>
