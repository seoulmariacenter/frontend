<template>
  <div class="row mb-5">
    <div class="col-lg-3 col-md-3"></div>
    <div class="col-lg-6 col-md-6 col-sm-12 mt-5 mb-5">
      <div class="alert alert-warning mt-5" role="alert">
        <h4 class="alert-heading">예약 취소가 완료되었습니다.</h4>
        <p class="mt-4">이제 기존의 예약 번호는 <strong>사용하실 수 없습니다.</strong></p>
        <p>서울마리아센터 쪽에서 취소 사실을 확인한 뒤 연락을 드리겠습니다.</p>
        <p>자세한 사항은 서울마리아센터 대표번호(<strong>02-723-5425</strong>)로 연락주세요!</p>
        <hr>
        <router-link :to="{name: 'Home'}" tag="button" class="btn btn-lg btn-outline-warning">홈으로 돌아가기</router-link>
      </div>
    </div>
    <div class="col-lg-3 col-md-3"></div>
  </div>
</template>
<script>
  export default {
    name: "ReservationCancelComplete"
  }
</script>
<style scoped>
</style>
