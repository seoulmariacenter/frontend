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
        <div class="row m-0 justify-content-center">
          <div class="card text-white bg-danger">
            <div class="card-header">예약 관련</div>
            <div class="card-body">
              <h5 class="card-title">중도 해지</h5>
              <p class="card-text">{{cautionText.termination}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ReservationInformation from './ReservationInformaion'
  export default {
    name: "ReservationDetail",
    components: {
      ReservationInformation
    },
    data() {
      return {
        cautionText: {
          termination:
          '서울마리아센터는 여행 경비를 절감하기 위해 최소 인원이 갖춰지는 대로 항공권을 단체 예매하고 있습니다. ' +
          '만일 순례 직전에 예약을 취소하시면 항공권 취소에 따른 위약금이 발생할 수 있으니 참고 바랍니다.'
        }
      }
    }
  }
</script>
<style scoped>
</style>
