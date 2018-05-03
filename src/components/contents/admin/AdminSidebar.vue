<template>
  <nav class="col-lg-2 col-md-3 bg-light sidebar">
    <div class="sidebar-sticky m-3">
      <ul class="nav flex-column">
        <router-link :to="{name: 'Dashboard'}" tag="li" class="nav-item hovering">
          <h2><strong>관리자 페이지</strong></h2>
        </router-link>
        <li class="nav-item">
          <hr>
        </li>
        <router-link :to="{name: 'ProductManagement'}" tag="li" class="nav-item mb-2 hovering">
          <h4>순례 상품 관리</h4>
        </router-link>
        <router-link :to="{name: 'ProductCreate'}" tag="li" class="nav-item mb-2 hovering">
          <h4>순례 상품 만들기</h4>
        </router-link>
        <li class="nav-item mb-2 hovering" data-toggle="modal" data-target="#signOutModal">
          <h4>로그아웃</h4>
        </li>
      </ul>
      <!-- Modal -->
      <div class="modal fade" id="signOutModal" tabindex="-1" role="dialog" aria-labelledby="signOutModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="signOutModalLabel">로그아웃</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              로그아웃하시겠습니까?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
              <button @click="signOutAdmin" type="button" class="btn btn-info" data-dismiss="modal">로그아웃</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: "AdminSidebar",
    methods: {
    ...mapActions([
      'signOutAdmin'
    ])
    }
  }
</script>
<style scoped>
  .hovering:hover {
    cursor: pointer;
  }
</style>
