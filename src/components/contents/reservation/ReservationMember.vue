<template>
  <div class="col p-0">
    <form class="col-12" @submit.prevent="onSubmit">
      <div class="form-row">
        <label for="inputName" class="col-form-label"><strong>동승자 성함</strong></label>
        <input v-model="name" type="text" class="form-control" id="inputName" placeholder="동승자 성함을 입력하세요." required>
      </div>
      <div class="form-row">
        <label for="inputPhone" class="col-form-label"><strong>연락처</strong></label>
        <input v-model="phone" type="text" class="form-control" id="inputPhone" placeholder="핸드폰 번호를 입력하세요. 예) 010-1234-5678" required>
      </div>
      <fieldset class="form-row">
        <legend class="col-form-label pb-0"><strong>동승자 성별</strong></legend>
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
      <div class="form-group mt-2">
        <button type="submit" class="btn btn-info">예약하기!</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    name: "ReservationMember",
    props: ['host-pk'],
    data() {
      return {
        name: '',
        phone: '',
        gender: 'True'
      }
    },
    methods: {
      onSubmit() {
        const formData = {
          name: this.name,
          phone: this.phone,
          gender: this.gender,
          host: this.hostPk
        };
        this.$store.dispatch('createReservationMember', formData)
      }
    }
  }
</script>
<style scoped>
</style>
