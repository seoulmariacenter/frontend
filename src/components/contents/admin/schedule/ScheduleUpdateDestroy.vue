<template>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="scheduleModalLabel">스케줄 수정하기</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="parseSchedulePk">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h4>새로운 스케줄 등록하기</h4>
        <form @submit.prevent="onSubmit" method="post">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPlace">장소</label>
              <input v-model="place" type="text" class="form-control" id="inputPlace" :placeholder="'기존 장소: ' + getScheduleRetrieve.place">
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
            <input v-model="time" type="text" class="form-control" id="inputTime" :placeholder="'기존 시간: ' + getScheduleRetrieve.time">
          </div>
          <div class="form-group">
            <label for="inputDescription">일정</label>
            <input v-model="description" type="text" class="form-control" id="inputDescription" :placeholder="'기존 일정: ' + getScheduleRetrieve.description" required>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger"><strong>스케줄 삭제</strong></button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="parseSchedulePk">수정 취소</button>
            <button type="submit" class="btn btn-primary">수정하기</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {router} from "../../../../main";
  export default {
    name: "ScheduleUpdateDestroy",
    props: ['dateNum', 'schedulePk'],
    data() {
      return {
        params: this.$route.params.pk,
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
      parseSchedulePk() {
        this.$emit('parseSchedulePk', 0);
        router.go(router.currentRoute)
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
          description: this.description,
          schedulePk: this.schedulePk
        };

        let result = Object();
        for (let property in formData) {
          if (formData[property] === '') {
            result[property] = '.';
          } else {
            result[property] = formData[property]
          }
        }
        this.$store.dispatch('updateSchedule', result);
      },
      fetchData() {
        const formData = {
          params: this.params,
          dateNum: this.dateNum,
          schedulePk: this.schedulePk
        };
        console.log(this.dateNum);
        this.$store.dispatch('getScheduleListQuery', formData);
        this.$store.dispatch('getScheduleRetrieveQuery', formData)
      }
    },
    computed: {
      ...mapGetters([
        'getScheduleInfo',
        'getScheduleRetrieve'
      ])
    }
  }
</script>
<style scoped>
</style>
