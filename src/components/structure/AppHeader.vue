<template>
  <header id="mainHeader" class="container-fluid mb-4" role="banner">
    <div class="top-line"></div>
    <nav class="navbar navbar-expand-md navbar-light bg-light align-middle">
      <div class="container">
        <router-link tag="a" class="navbar-brand mr-5" :to="{name: 'Home'}">
          <img src="../../assets/svg/logo_curved.svg" width="80" alt="">
        </router-link>
        <button class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul class="navbar-nav align-items-center">
            <li class="nav-item active ml-lg-5 mr-lg-5 ml-md-3 mr-md-3">
              <router-link :to="{name: 'ReservationManagement'}" tag="a" class="nav-link pl-0 pr-0 pt-3 pb-1 mb-1">
                <h4 class="mb-0">예약</h4>
              </router-link>
            </li>
            <li class="nav-item active ml-lg-5 mr-lg-5 ml-md-3 mr-md-3">
              <router-link :to="{name: 'ClientProduct'}" tag="a" class="nav-link pl-0 pr-0 pt-3 pb-1 mb-1" href="#">
                <h4 class="mb-0">성지</h4>
              </router-link>
            </li>
            <li class="nav-item active ml-lg-5 mr-lg-5 ml-md-3 mr-md-3">
              <router-link :to="{name: 'Introduce'}" tag="a" class="nav-link pl-0 pr-0 pt-3 pb-1 mb-1">
                <h4 class="mb-0">여행사 소개</h4>
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav align-items-center">
            <li class="nav-item ml-lg-5 mr-lg-5 ml-md-3 mr-md-3">
              <router-link :to="{name: 'Check'}" tag="a" class="nav-link pl-0 pr-0 pt-3 pb-1 mb-1">
                <h4 class="mb-0">예약 확인</h4>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
  export default {
    name: "app-header"
  }
</script>
<style scoped>
  #mainHeader {
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100%;
    height: auto;
    -webkit-transition: top .4s;
    transition: top .4s;
    background-color: #F8F5EF;
  }
  .navbar {
    box-shadow: 0 0 1em gray;
  }
  .top-line {
    height: 10px;
    background-color: #0081D5;
  }
  .nav-link {
    border-bottom: 5px solid rgba(0,0,0,0);
  }
  .nav-link:hover {
    border-bottom: 5px solid #E9ECEf;
  }
  .nav-link > h3 {
    margin-bottom: 0;
  }
</style>
