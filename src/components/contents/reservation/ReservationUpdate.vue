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
            <h5 class="mb-0"><strong>예약 상품:</strong></h5>
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
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ReservationUpdate",
    computed: {
      ...mapGetters([
        'getReservationInfo'
      ])
    }
  }
</script>
<style scoped>
</style>
