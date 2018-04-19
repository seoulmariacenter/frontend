<template>
  <div class="container-fluid mb-4">
    <div class="top-line"></div>
    <nav class="navbar navbar-expand-md navbar-light bg-light align-middle">
      <div class="container">
        <router-link tag="a" class="navbar-brand mr-5" :to="{name: 'Home'}">
          <img src="../../assets/svg/logo_curved.svg" width="130" alt="">
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
              <a class="nav-link pl-0 pr-0 pt-4 pb-3" href="#"><h3>예약</h3></a>
            </li>
            <li class="nav-item active ml-lg-5 mr-lg-5 ml-md-3 mr-md-3">
              <a class="nav-link pl-0 pr-0 pt-4 pb-3" href="#"><h3>성지</h3></a>
            </li>
            <li class="nav-item active ml-lg-5 mr-lg-5 ml-md-3 mr-md-3">
              <a class="nav-link pl-0 pr-0 pt-4 pb-3" href="#"><h3>약관</h3></a>
            </li>
          </ul>
          <ul class="navbar-nav align-items-center">
            <li class="nav-item ml-lg-5 mr-lg-5 ml-md-3 mr-md-3">
              <a class="nav-link pl-0 pr-0 pt-4 pb-3" href="#"><h3>블로그</h3></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
  export default {
    name: "app-header"
  }
</script>
<style scoped>
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
