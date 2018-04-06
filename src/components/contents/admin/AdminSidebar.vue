<template>
  <nav class="col-md-3 bg-light sidebar">
    <div class="sidebar-sticky m-3">
      <ul class="nav flex-column">
        <router-link :to="{name: 'Dashboard'}" tag="li" class="nav-item hovering">
          <h2><strong>관리자 페이지</strong></h2>
        </router-link>
        <li class="nav-item">
          <hr>
        </li>
        <router-link :to="{name: 'Management'}" tag="li" class="nav-item mb-2 hovering">
          <h4>예약 관리</h4>
        </router-link>
        <li class="nav-item mb-2 hovering">
          <h4>순례 상품 만들기</h4>
        </li>
        <li @click="signOut" class="nav-item mb-2 hovering">
          <h4>로그아웃</h4>
        </li>
        <li class="nav-item"></li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: "AdminSidebar",
    methods: {
    ...mapActions([
      'signOut'
    ])
    }
  }
</script>
<style scoped>
  .hovering:hover {
    cursor: pointer;
  }
</style>
