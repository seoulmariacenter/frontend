<template>
  <div class="">
    <div class="row mb-5">
      <div class="col-lg-3 col-md-3"></div>
      <div class="col-lg-6 col-md-6 col-sm-12 mt-5 mb-5">
        <div class="card">
          <div class="card-header">
            <h4 class="mb-0"><strong>예약 완료!</strong></h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">예약 번호: <strong>{{getReservationInfo.reservation_num}}</strong></li>
            <li class="list-group-item"><span class="text-danger"><strong>예약번호를 꼭 기록해주세요!</strong><br/>이 페이지를 벗어나면 예약번호를 확인할 수 없습니다.</span></li>
            <li class="list-group-item">예약 상품: <strong>{{getReservationInfo.product}}</strong></li>
            <li class="list-group-item">예약자 성함: <strong>{{getReservationInfo.username}}</strong></li>
          </ul>
        </div>
        <div class="alert alert-info mt-5" role="alert">
          <h4 class="alert-heading">감사합니다! 예약이 완료되었습니다.</h4>
          <p>예약 정보를 확인하시려면 우측 상단의 <strong>"예약 확인"</strong> 버튼을 누르시고 성함과 예매번호를 입력해주세요.</p>
          <p>자세한 사항은 서울마리아센터 대표번호(<strong>02-723-5425</strong>)로 연락주세요!</p>
          <hr>
          <router-link :to="{name: 'Home'}" tag="button" class="btn btn-lg btn-outline-info">홈으로 돌아가기</router-link>
        </div>
      </div>
      <div class="col-lg-3 col-md-3"></div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ReservationComplete",
    computed: {
      ...mapGetters([
        'getReservationInfo'
    ])
    }
  }
</script>
<style scoped>
</style>
