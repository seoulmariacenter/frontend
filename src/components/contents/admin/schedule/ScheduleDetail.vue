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
                <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                <button type="button" class="btn btn-danger" @click="callScheduleDetail">닫을게요</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-sm">
          <thead>
          <tr>
            <th scope="col">장소</th>
            <th scope="col">교통</th>
            <th scope="col">시간</th>
            <th scope="col">일정</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="index in getScheduleInfo[dateNum]" :key="index.id">
            <th scope="row">{{index['place']}}</th>
            <td>{{index['transport']}}</td>
            <td>{{index['time']}}</td>
            <td>{{index['description']}}</td>
          </tr>
          </tbody>
        </table>
        <div class="alert alert-info" v-if="getScheduleInfo[dateNum].length === 0">
          <strong>아직 스케줄이 없습니다!</strong>
        </div>
        <hr>
        <h4 class="card-title">새로운 스케줄 등록하기</h4>
        <form @submit.prevent="onSubmit" method="post">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPlace">장소</label>
              <input v-model="place" type="text" class="form-control" id="inputPlace" placeholder="장소 입력" required>
            </div>
            <div class="form-group col-md-6">
              <label for="inputTransport">교통수단</label>
              <div class="input-group">
                <select class="custom-select" id="inputTransport" required>
                  <option selected>선택...</option>
                  <option @click="resultBus">전용 버스</option>
                  <option data-toggle="modal" data-target="#flightModal">항공기</option>
                </select>
                <!-- Modal -->
                <div class="modal fade" id="flightModal" tabindex="-1" role="dialog" aria-labelledby="flightModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="flightModalLabel">항공기 검색</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        ...
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                        <button type="button" class="btn btn-primary">항공기 선택</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputTime">시간</label>
            <input v-model="time" type="text" class="form-control" id="inputTime" placeholder="예: '08:00'">
          </div>
          <div class="form-group">
            <label for="inputDescription">일정</label>
            <input v-model="description" type="text" class="form-control" id="inputDescription" placeholder="일정 입력">
          </div>
          <div class="d-flex">
            <button type="submit" class="btn btn-primary mr-1">스케줄 등록</button>
            <button @click="onReset" class="btn btn-outline-danger ml-1">지우고 다시 쓰기</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ScheduleDetail",
    props: ['dateNum'],
    data() {
      return {
        params: this.$route.params.pk,
        place: null,
        resultTransport: null,
        time: null,
        description: null
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      callScheduleDetail() {
        this.$emit('callScheduleDetail', false);
        this.$router.go(this.$router.currentRoute)
      },
      resultBus() {
        this.resultTransport = '전용 버스'
      },
      onReset() {
        this.place = this.resultTransport = null
      },
      onSubmit() {

      },
      fetchData() {
        const formData = {
          params: this.params,
          dateNum: this.dateNum
        };
        this.$store.dispatch('getScheduleListQuery', formData);
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
