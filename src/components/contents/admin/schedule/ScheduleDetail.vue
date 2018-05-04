<template>
  <div class="col mt-2" id="schedule-card">
    <div class="card">
      <div class="card-header">
        <h5 class="d-inline-block m-0"><strong>{{dateNum}}일차 스케줄 수정하기</strong></h5>
        <button type="button" class="close" data-toggle="modal" data-target="#closeModal">
          <span aria-hidden="true">&times;</span>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="closeModal" tabindex="-1" role="dialog" aria-labelledby="closeModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="closeModalLabel">스케줄 수정 그만두기</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                정말 닫으시겠습니까? 작성하던 내용이 지워질 수 있습니다!
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">취소</button>
                <button type="button" class="btn btn-danger" @click="callScheduleDetail">닫을게요</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-sm m-0">
          <thead>
          <tr>
            <th scope="col">장소</th>
            <th scope="col">교통</th>
            <th scope="col">시간</th>
            <th scope="col">일정</th>
            <th class="text-center" scope="col">수정</th>
          </tr>
          </thead>
          <tbody id="scheduleTable">
          <tr v-for="index in getScheduleInfo[dateNum]" :key="index.id">
            <th scope="row">{{index['place']}}</th>
            <td>{{index['transport']}}</td>
            <td>{{index['time']}}</td>
            <td>{{index['description']}}</td>
            <td class="text-center">
              <button
              type="button"
              class="btn btn-sm btn-warning"
              data-toggle="modal"
              data-target="#scheduleModal"
              @click="parseSchedulePk(index['pk'])"
              >수정</button>
            </td>
          </tr>
          </tbody>
        </table>
        <!-- Modal -->
        <div class="modal fade" id="scheduleModal" tabindex="-1" role="dialog" aria-labelledby="scheduleModalLabel" aria-hidden="true">
          <schedule-update-destroy
          v-if="schedulePk !== 0"
          v-bind:dateNum="dateNum"
          v-bind:schedulePk="schedulePk"
          v-on:parseSchedulePk="parseSchedulePk"/>
        </div>
        <div class="alert alert-info" v-if="getScheduleInfo[dateNum].length === 0">
          <strong>아직 스케줄이 없습니다!</strong>
        </div>
        <hr>
        <h4 class="card-title">새로운 스케줄 등록하기</h4>
        <form @submit.prevent="onSubmit" method="post">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPlace">장소</label>
              <input v-model="place" type="text" class="form-control" id="inputPlace" placeholder="장소 입력">
            </div>
            <div class="form-group col-md-6">
              <label for="inputTransport">교통수단</label>
              <div class="input-group">
                <select v-model="whichTransport" class="custom-select" id="inputTransport" aria-describedby="transportHelp">
                  <option value="">선택 안함</option>
                  <option value="전용 버스">전용 버스</option>
                  <option value="1" data-toggle="modal" data-target="#exampleModal">항공기</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group border border-info rounded p-2" v-if="isFlight">
            <label for="inputFlight">항공기</label>
            <input v-model="flightName" type="text" class="form-control" id="inputFlight" placeholder="항공편 이름을 입력하세요 (예: KE957)">
          </div>
          <div class="form-group">
            <label for="inputTime">시간</label>
            <input v-model="time" type="text" class="form-control" id="inputTime" placeholder="예: '08:00'">
          </div>
          <div class="form-group">
            <label for="inputDescription">일정</label>
            <input v-model="description" type="text" class="form-control" id="inputDescription" placeholder="일정 입력" required>
          </div>
          <div class="d-flex">
            <button type="submit" class="btn btn-info mr-1">스케줄 등록</button>
            <button type="button" @click="onReset" class="btn btn-outline-danger ml-1">지우고 다시 쓰기</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {router} from "../../../../main";
  import ScheduleUpdateDestroy from './ScheduleUpdateDestroy'
  export default {
    name: "ScheduleDetail",
    props: ['dateNum'],
    components: {
      ScheduleUpdateDestroy
    },
    data() {
      return {
        params: this.$route.params.pk,
        schedulePk: 0,
        place: '',
        whichTransport: '',
        isFlight: false,
        flightName: '',
        time: '',
        description: ''
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData',
      whichTransport: function () {
        this.whichTransport === '1' ? this.isFlight = true : this.isFlight = false;
      }
    },
    methods: {
      callScheduleDetail() {
        this.$emit('callScheduleDetail', false);
        router.go(router.currentRoute)
      },
      parseSchedulePk(payload) {
        this.schedulePk = payload
      },
      addClass() {
        const table = window.document.getElementById('scheduleTable').getElementsByTagName('tr');
        for (let key = 0; key < table.length; key++ in table) {
          const list = table[key].childNodes;
          for (let step = 0; step < list.length; step++ in list) {
            if (list[step].innerText === '.') {
              list[step].classList.add('text-white')
            }
          }
        }
        },
      onReset() {
        this.place = this.whichTransport = this.flightName = this.time = this.description = ''
      },
      onSubmit() {
        let resultTransport;
        this.whichTransport === '1' ? resultTransport = this.flightName : resultTransport = this.whichTransport;
        const formData = {
          params: this.params,
          date: this.dateNum,
          place: this.place,
          transport: resultTransport,
          time: this.time,
          description: this.description
        };

        let result = Object();
        for (let property in formData) {
          if (formData[property] === '') {
            result[property] = '.';
          } else {
            result[property] = formData[property]
          }
        }

        this.$store.dispatch('createSchedule', result)
      },
      fetchData() {
        const formData = {
          params: this.params,
          dateNum: this.dateNum
        };
        this.$store.dispatch('getScheduleListQuery', formData);
        setTimeout(() => {
          this.addClass()
        }, 50)
      }
    },
    computed: {
      ...mapGetters([
        'getScheduleInfo'
      ])
    }
  }
</script>
<style scoped>
</style>
