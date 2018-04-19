<template>
  <div class="card mt-4 mb-4">
    <div class="card-body">
      <h5 class="card-title"><img class="mb-1"
      src="../../assets/svg/si-glyph-call-forward.svg"
      width="20"
      alt="phone"> 문의 전화:</h5>
      <h2><strong>02-723-5425</strong></h2>
      <hr>
      <h5 class="card-title"><img class="mb-1"
      src="../../assets/svg/si-glyph-money-3.svg"
      width="20"
      alt="phone"> 계좌 번호:</h5>
      <h6 class="card-subtitle text-secondary mt-1 mb-2"><strong>(우리)</strong> 서울마리아센터</h6>
      <h2><strong>1005-682-025425</strong></h2>
    </div>
  </div>
</template>
<script>
  export default {
    name: "app-sidebar"
  }
</script>
<style scoped>
  @media (min-width: 768px) and (max-width: 991px) {
    .card-body > h2 {
      font-size: 1.4rem;
    }
  }

</style>
