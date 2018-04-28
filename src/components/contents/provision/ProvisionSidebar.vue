<template>
  <div class="col-lg-3 col-md-3 bg-light sidebar">
    <div class="sidebar-sticky m-3">
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><h4><strong>서울마리아센터 소개</strong></h4></li>
        <router-link :to="{name: 'Introduce'}" tag="li" class="nav-item mb-2 hovering">대표 인사말</router-link>
        <router-link :to="{name: 'Maria'}" tag="li" class="nav-item mb-2 hovering">성모님의 부르심을 찾아서</router-link>
        <router-link :to="{name: 'Travel'}" tag="li" class="nav-item mb-2 hovering">여행 약관</router-link>
        <router-link :to="{name: 'Insurance'}" tag="li" class="nav-item mb-2 hovering">여행자 보험 약관</router-link>
        <router-link :to="{name: 'Compensation'}" tag="li" class="nav-item mb-2 hovering">소비자 분쟁 해결 기준</router-link>
        <router-link :to="{name: 'Service'}" tag="li" class="nav-item mb-2 hovering">서비스 이용 약관</router-link>
        <router-link :to="{name: 'Private'}" tag="li" class="nav-item mb-2 hovering">개인정보 처리방침</router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ProvisionSidebar"
  }
</script>
<style scoped>
  .hovering:hover {
    cursor: pointer;
  }
</style>
