<template>
  <div class="bg-light col-md-5 col-sm-12">
    <div class="m-3 pt-3 pb-3">
      <div class="d-block">
        <h2><strong>예약자 정보 입력</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <form class="col-12" @submit.prevent="onSubmit">
          <div class="form-row">
            <label for="inputProduct" class="col-form-label">선택 상품</label>
            <input type="text" class="form-control" id="inputProduct" :placeholder="productTitle" disabled>
          </div>
          <div class="form-row">
            <label for="inputName" class="col-form-label">이름</label>
            <input v-model="name" type="text" class="form-control" id="inputName" placeholder="예약 인원의 대표자 성함을 입력하세요.">
          </div>
          <div class="form-row">
            <label for="inputPhone" class="col-form-label">연락처</label>
            <input v-model="phone" type="text" class="form-control" id="inputPhone" placeholder="핸드폰 번호를 입력하세요. 예) 010-1234-5678">
          </div>
          <fieldset class="form-row">
            <legend class="col-form-label pb-0">성별</legend>
            <div class="d-flex m-2">
              <div class="form-check mr-4">
                <input v-model="gender" class="form-check-input" type="radio" name="gridRadios" id="genderRadios1" value="True" checked>
                <label class="form-check-label" for="genderRadios1">
                  남성
                </label>
              </div>
              <div class="form-check m1-4">
                <input v-model="gender" class="form-check-input" type="radio" name="gridRadios" id="genderRadios2" value="False">
                <label class="form-check-label" for="genderRadios2">
                  여성
                </label>
              </div>
            </div>
          </fieldset>
          <div class="form-group">
            <button type="submit" class="btn btn-lg btn-info">예약하기!</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ReservationForm",
    props: ['productTitle'],
    data() {
      return {
        name: '',
        phone: '',
        gender: 'True'
      }
    },
    methods: {
      onSubmit() {

      }
    }
  }
</script>
<style scoped>
</style>
