<template>
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
        <button type="button" class="btn btn-outline-danger ml-1">예약 취소</button>
      </div>
    </form>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ReservationUpdateDestroy",
    data() {
      return {
        name: '',
        phone: '',
        gender: 'True'
      }
    },
    methods: {
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
