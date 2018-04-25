<template>
  <div class="col">
    <form class="col p-1" @submit.prevent="onFetch">
      <div class="form-row">
        <label for="inputProduct" class="col-form-label">선택 상품</label>
        <input type="text" class="form-control" id="inputProduct" :placeholder="'현재 상품: ' + getReservationInfo.product" disabled>
      </div>
      <div class="form-row">
        <label for="inputName" class="col-form-label">예약자 성함</label>
        <input v-model="name" type="text" class="form-control" id="inputName" :placeholder="'현재 성함: ' + getReservationInfo.username" required>
      </div>
      <div class="form-row">
        <label for="inputPhone" class="col-form-label">연락처</label>
        <input v-model="phone" type="text" class="form-control" id="inputPhone" :placeholder="'현재 연락처: ' + getReservationInfo.phone_number" required>
      </div>
      <fieldset class="form-row">
        <legend class="col-form-label pb-0">예약자 성별</legend>
        <div class="d-flex m-2">
          <div class="form-check mr-4">
            <input v-model="gender" class="form-check-input" type="radio" name="gridRadios" id="genderRadios1" value="True" checked>
            <label class="form-check-label" for="genderRadios1">
              여성
            </label>
          </div>
          <div class="form-check m1-4">
            <input v-model="gender" class="form-check-input" type="radio" name="gridRadios" id="genderRadios2" value="False">
            <label class="form-check-label" for="genderRadios2">
              남성
            </label>
          </div>
        </div>
      </fieldset>
      <div class="form-group">
        <button type="submit" class="btn btn-info mr-1">정보 수정</button>
        <button type="button" class="btn btn-outline-danger ml-1" data-toggle="modal" data-target="#destroyModal">예약 취소</button>
      </div>
    </form>
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ReservationUpdateDestroy",
    data() {
      return {
        name: '',
        phone: '',
        gender: 'True',
        reservationNum: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      }
    },
    methods: {
      cancelReservation() {
        const formData = {
          name: this.getReservationInfo.username,
          password: this.reservationNum.a +
          this.reservationNum.b +
          this.reservationNum.c +
          this.reservationNum.d
        };
        this.$store.dispatch('cancelReservation', formData)
      },
      onFetch() {

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
