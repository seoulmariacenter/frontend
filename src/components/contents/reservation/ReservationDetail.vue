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
            <div class="card-header"><h4 class="mb-0"><strong>예약 취소에 관하여</strong></h4></div>
            <div class="card-body">
              <p class="card-text" v-html="cautionText.termination"></p>
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
          '<p class="mb-1">서울마리아센터는 여행 경비를 절감하기 위해 최소 인원이 갖춰지는 대로 항공권을 단체 예매하고 있습니다.</p>' +
          '<p>만일 여행 일정이 임박했을 때 예약을 취소하시면 ' +
          '<a class="text-dark" href="http://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%EC%86%8C%EB%B9%84%EC%9E%90%EB%B6%84%EC%9F%81%ED%95%B4%EA%B2%B0%EA%B8%B0%EC%A4%80" target="_blank"><strong>소비자분쟁 해결기준</strong></a>' +
          '에 따른 손해배상액을 부담하실 수 있으니 참고 바랍니다.</p>'
        }
      }
    }
  }
</script>
<style scoped>
</style>
