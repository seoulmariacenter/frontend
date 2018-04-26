<template>
  <div class="bg-light col-md-6 col-sm-12">
    <div class="m-3 pt-3 pb-3">
      <div class="d-block d-flex justify-content-between">
        <h2><strong>예약 정보</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <div class="col p-0 card">
          <div class="card-header">
            <h5 class="mb-0"><strong>예약 상품: {{getReservationInfo.product}}</strong></h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">예약자 성함: {{getReservationInfo.username}}</li>
            <li class="list-group-item">예약자 연락처: {{getReservationInfo.phone_number}}</li>
            <li class="list-group-item">예약자 성별:
              <span v-if="getReservationInfo.gender">여성</span>
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
                  <p>정말로 예약을 취소하시겠습니까?</p>
                  <p>예약을 취소하시면 항공권 예매 여부에 따라 <strong>위약금을 부담</strong>하셔야 할 수도 있습니다.</p>
                  <p>본인 확인을 위해 예약번호 16자리를 다시 한번 입력해주십시오.</p>
                  <div class="form-group">
                    <label class="col-form-label"><strong>예약 번호</strong></label>
                    <div class="form-group d-flex">
                      <input v-model="reservationNum.a" type="text" class="form-control mr-2" required>
                      <input v-model="reservationNum.b" type="text" class="form-control ml-2 mr-2" required>
                      <input v-model="reservationNum.c" type="text" class="form-control ml-2 mr-2" required>
                      <input v-model="reservationNum.d" type="text" class="form-control ml-2" required>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">취소</button>
                  <button @click="cancelReservation" type="button" class="btn btn-danger">예약 취소</button>
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
                <button @click="signOutReservation" type="button" class="btn btn-info">로그아웃</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-2">
        <reservation-member v-if="callReservationMember"/>
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
        callReservationMember: false,
        reservationNum: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      }
    },
    methods: {
      signOutReservation() {
        sessionStorage.removeItem('hostname');
        router.go(router.currentRoute);
        router.replace({
          name: 'Home'
        })
      },
      cancelReservation() {
        const formData = {
          name: this.getReservationInfo.username,
          password: this.reservationNum.a +
          this.reservationNum.b +
          this.reservationNum.c +
          this.reservationNum.d
        };
        this.$store.dispatch('cancelReservation', formData)
      }
    },
    computed: {
      ...mapGetters([
        'getReservationInfo'
      ])
    }
  }
</script>
<style scoped>
</style>
