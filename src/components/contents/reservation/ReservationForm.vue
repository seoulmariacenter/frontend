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
            <label for="inputProduct" class="col-form-label"><strong>선택 상품</strong></label>
            <input type="text" class="form-control" id="inputProduct" :placeholder="productTitle" disabled>
            <small v-if="!productTitle" class="text-danger">우측의 순례 상품을 반드시 선택해주세요!</small>
          </div>
          <div class="form-row">
            <label for="inputName" class="col-form-label"><strong>예약자 성함</strong></label>
            <input v-model="name" type="text" class="form-control" id="inputName" placeholder="전체 예약 인원의 대표자 성함을 입력하세요." required>
          </div>
          <div class="form-row">
            <label for="inputChristianName" class="col-form-label"><strong>예약자 세례명 (선택)</strong></label>
            <input v-model="christianName" type="text" class="form-control" id="inputChristianName" placeholder="세례명을 입력하세요.">
          </div>
          <div class="form-row">
            <label for="inputPhone" class="col-form-label"><strong>연락처</strong></label>
            <input v-model="phone" type="text" class="form-control" id="inputPhone" placeholder="핸드폰 번호를 입력하세요. 예) 010-1234-5678" required>
          </div>
          <fieldset class="form-row">
            <legend class="col-form-label pb-0"><strong>예약자 성별</strong></legend>
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
          <fieldset class="form-row">
            <legend class="col-form-label pb-0"><strong>약관 동의</strong></legend>
            <div class="d-flex m-2">
              <div class="form-check mr-4">
                <input class="form-check-input" type="checkbox" name="Provision" id="checkProvision" value="" required>
                <label class="form-check-label" for="checkProvision">
                  <span>나는 서울마리아센터의
                    <router-link class="text-info" :to="{name: 'Travel'}" target="_blank">여행 약관</router-link>,
                    <router-link class="text-info" :to="{name: 'Insurance'}" target="_blank">여행자 보험 약관</router-link>,
                    <router-link class="text-info" :to="{name: 'Service'}" target="_blank">서비스 이용 약관</router-link> 및
                    <router-link class="text-info" :to="{name: 'Private'}" target="_blank">개인정보 처리방침</router-link>을 모두 확인하였으며 이에 동의합니다.
                  </span>
                </label>
              </div>
            </div>
          </fieldset>
          <div class="form-group mt-2">
            <button type="submit" class="btn btn-lg btn-info">예약하기!</button>
          </div>
        </form>
      </div>
      <div class="row m-2">
        <message/>
      </div>
    </div>
  </div>
</template>
<script>
  import Message from '../../structure/AppMessage'
  export default {
    name: "ReservationForm",
    props: ['productTitle', 'productPk'],
    components: {
      Message
    },
    data() {
      return {
        name: '',
        christianName: '',
        phone: '',
        gender: 'True'
      }
    },
    methods: {
      onSubmit() {
        const formData = {
          name: this.name,
          christianName: this.christianName,
          phone: this.phone,
          gender: this.gender,
          product: this.productPk
        };
        this.$store.dispatch('createReservation', formData)
      }
    }
  }
</script>
<style scoped>
</style>
