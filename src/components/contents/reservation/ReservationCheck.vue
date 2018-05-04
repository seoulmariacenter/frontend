<template>
  <div class="row mb-5">
    <div class="col-lg-3 col-md-3"></div>
    <div class="col-lg-6 col-md-6 col-sm-12 mt-5 mb-5">
      <div class="container mt-5 mb-5">
        <h2 class="pb-5">예약 확인</h2>
        <form @submit.prevent="onSubmit" method="post">
          <div class="form-group">
            <label for="inputName" class="col-form-label"><strong>예약자 성함</strong></label>
            <input v-model="name" type="text" class="form-control" id="inputName" placeholder="이름을 입력하세요" required>
          </div>
          <div class="form-group">
            <label class="col-form-label"><strong>예약 번호</strong></label>
            <div class="form-group d-flex">
              <input v-model="reservationNum.a" type="text" maxlength="4" class="form-control mr-2" required>
              <input v-model="reservationNum.b" type="text" maxlength="4" class="form-control ml-2 mr-2" required>
              <input v-model="reservationNum.c" type="text" maxlength="4" class="form-control ml-2 mr-2" required>
              <input v-model="reservationNum.d" type="text" maxlength="4" class="form-control ml-2" required>
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-lg btn-info">예약 확인</button>
          </div>
          <div class="form-group row">
            <message/>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-3 col-md-3"></div>
  </div>
</template>
<script>
  import Message from '../../structure/AppMessage'
  export default {
    name: "ReservationCheck",
    components: {
      Message
    },
    data() {
      return {
        name: '',
        reservationNum: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      }
    },
    methods: {
      onSubmit() {
        const formData = {
          name: this.name,
          password: this.reservationNum.a +
                    this.reservationNum.b +
                    this.reservationNum.c +
                    this.reservationNum.d
        };
        this.$store.dispatch('checkReservation', formData)
      }
    }
  }
</script>
<style scoped>
</style>
