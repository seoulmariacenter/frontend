<template>
  <div class="bg-light col-md-6 col-sm-12">
    <div class="m-3 pt-3 pb-3">
      <div class="d-block d-flex justify-content-between">
        <h2><strong>예약 정보</strong></h2>
      </div>
      <hr>
      <div v-if="loading" class="alert alert-info text-center" role="alert">
        <h4 class="mb-0"><strong>예약 정보를 불러 오는 중입니다. 잠시만 기다려주세요!</strong></h4>
      </div>
      <div v-show="show" class="row m-2">
        <div class="col p-0 card">
          <div class="card-header">
            <h5 class="mb-0"><strong>예약 상품: {{getReservationSessionInfo.product}}</strong></h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">예약자 성함: {{getReservationSessionInfo.username}} ({{getReservationSessionInfo.christian_name}})</li>
            <li class="list-group-item">예약자 연락처: {{getReservationSessionInfo.phone_number}}</li>
            <li class="list-group-item">예약자 성별:
              <span v-if="getReservationSessionInfo.gender">여성</span>
              <span v-else>남성</span>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="row m-2 d-flex justify-content-between">
        <button @click="callReservationMember = !callReservationMember" type="button" class="btn btn-warning">동승자 등록</button>
        <button type="button" class="btn btn-outline-danger ml-1" data-toggle="modal" data-target="#destroyModal">예약 취소</button>
        <!-- Modal -->
        <div class="modal fade" id="destroyModal" tabindex="-1" role="dialog" aria-labelledby="destroyModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="destroyModalLabel">예약 취소</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div class="modal-body">
                  <div class="card text-white bg-danger mb-4">
                    <div class="card-header"><h4 class="mb-0"><strong>예약 취소에 관하여</strong></h4></div>
                    <div class="card-body">
                      <p class="card-text mb-1">
                        서울마리아센터는 여행 경비를 절감하기 위해 최소 인원이 갖춰지는 대로 항공권을 단체 예매하고 있습니다.
                      </p>
                      <p class="card-text">
                        만일 여행 일정이 임박했을 때 예약을 취소하시면
                        <router-link :to="{name: 'Compensation'}" class="text-dark" target="_blank">
                          <strong>소비자 분쟁 해결 기준</strong></router-link>
                        에 따른 손해배상액을 부담하실 수 있으니 참고 바랍니다.
                      </p>
                    </div>
                  </div>
                  <p>정말로 예약을 취소하시겠습니까?</p>
                  <p>여행 일정이 임박했을 때 예약을 취소하시면 <strong>손해배상액을 부담</strong>하셔야 할 수도 있습니다.</p>
                  <p>본인 확인을 위해 예약번호 16자리를 다시 한번 입력해주십시오.</p>
                  <div class="form-group">
                    <label class="col-form-label"><strong>예약 번호</strong></label>
                    <div class="form-group d-flex">
                      <input v-model="reservationNum.a" type="text" maxlength="4" class="form-control mr-2" required>
                      <input v-model="reservationNum.b" type="text" maxlength="4" class="form-control ml-2 mr-2" required>
                      <input v-model="reservationNum.c" type="text" maxlength="4" class="form-control ml-2 mr-2" required>
                      <input v-model="reservationNum.d" type="text" maxlength="4" class="form-control ml-2" required>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">취소</button>
                  <button @click="cancelReservation" type="button" class="btn btn-danger" data-dismiss="modal">예약 취소</button>
                </div>
                <message/>
              </form>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#signOutModal">로그아웃</button>
        <!-- Modal -->
        <div class="modal fade" id="signOutModal" tabindex="-1" role="dialog" aria-labelledby="signOutModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="signOutModalLabel">로그아웃</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                로그아웃하시겠습니까?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">취소</button>
                <button @click="signOutReservation" type="submit" class="btn btn-info" data-dismiss="modal">로그아웃</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-2">
        <reservation-member v-if="callReservationMember" v-bind:host-pk="getReservationSessionInfo.pk"/>
      </div>
    </div>
  </div>
</template>
<script>
  import {router} from '../../../main'
  import {mapGetters} from 'vuex'
  import Message from '../../structure/AppMessage'
  import ReservationMember from './ReservationMember'
  export default {
    name: "ReservationInformation",
    components: {
      Message,
      ReservationMember
    },
    data() {
      return {
        show: null,
        loading: false,
        callReservationMember: false,
        reservationNum: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      signOutReservation() {
        this.$store.commit('clearReservationStorage');
        router.replace({
          name: 'Home'
        })
      },
      cancelReservation() {
        const formData = {
          name: this.getReservationSessionInfo.username,
          password: this.reservationNum.a +
          this.reservationNum.b +
          this.reservationNum.c +
          this.reservationNum.d
        };
        this.$store.dispatch('cancelReservation', formData)
      },
      fetchData() {
        this.show = this.loading = null;
        this.loading = true;
        if (this.getReservationSessionInfo !== null) {
          this.loading = false;
          this.show = true;
        }
      }
    },
    computed: {
      ...mapGetters([
        'getReservationSessionInfo'
      ])
    }
  }
</script>
<style scoped>
</style>
