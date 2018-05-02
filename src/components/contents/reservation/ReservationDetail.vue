<template>
  <div class="row justify-content-between">
    <reservation-information/>
    <div class="bg-light col-md-5 col-sm-12">
      <div class="m-3 pt-3 pb-3">
        <div class="d-block d-flex justify-content-between">
          <h2><strong>주의사항</strong></h2>
          <p class="mt-3 mb-0">반드시 주의 깊게 읽어주세요!</p>
        </div>
        <hr>
        <div class="card text-white bg-danger">
          <div class="card-header"><h4 class="mb-0"><strong>예약 취소에 관하여</strong></h4></div>
          <div class="card-body">
            <p class="card-text mb-1">
              서울마리아센터는 여행 경비를 절감하기 위해 최소 인원이 갖춰지는 대로 항공권을 단체 예매하고 있습니다.
            </p>
            <p class="card-text">
              만일 여행 일정이 임박했을 때 예약을 취소하시면
              <router-link :to="{name: 'Compensation'}" class="text-dark" target="_blank"><strong>소비자 분쟁 해결 기준</strong></router-link>
              에 따른 손해배상액을 부담하실 수 있으니 참고 바랍니다.
            </p>
          </div>
        </div>
        <div class="mt-2" v-if="getReservationMemberQuery">
          <div class="card" v-for="index in getReservationMemberQuery" :key="index.id">
            <div class="card-body">
              {{index}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import ReservationInformation from './ReservationInformaion'
  export default {
    name: "ReservationDetail",
    components: {
      ReservationInformation
    },
    computed: {
      ...mapGetters([
        'getReservationMemberQuery',
        'getReservationMemberCount'
      ])
    }
  }
</script>
<style scoped>
</style>
