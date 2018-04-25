<template>
  <div class="bg-light col-md-6 col-sm-12">
    <div class="m-3 pt-3 pb-3">
      <div class="d-block d-flex justify-content-between">
        <h2><strong>예약 정보</strong></h2>
      </div>
      <hr>
      <div class="row m-2">
        <div class="col p-0 card">
          <div class="card-header">
            <h5 class="mb-0"><strong>예약 상품: {{getReservationInfo.product}}</strong></h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">예약자 성함: {{getReservationInfo.username}}</li>
            <li class="list-group-item">예약자 연락처: {{getReservationInfo.phone_number}}</li>
            <li class="list-group-item">예약자 성별:
              <span v-if="getReservationInfo.gender">여성</span>
              <span v-else>남성</span>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="row m-2 d-flex justify-content-between">
        <button @click="updateModule = !updateModule" type="button" class="btn btn-outline-info">예약 정보 수정</button>
        <button type="button" class="btn btn-outline-warning">동승자 등록</button>
        <button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#signOutModal">로그아웃</button>

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
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">취소</button>
                <button @click="signOutReservation" type="button" class="btn btn-info">로그아웃</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-2">
        <reservation-update-destroy v-if="updateModule"/>
      </div>
    </div>
  </div>
</template>
<script>
  import {router} from '../../../main'
  import {mapGetters} from 'vuex'
  import ReservationUpdateDestroy from './ReservationUpdateDestroy'
  export default {
    name: "ReservationUpdate",
    components: {
      ReservationUpdateDestroy
    },
    data() {
      return {
        updateModule: false
      }
    },
    methods: {
      signOutReservation() {
        sessionStorage.removeItem('username');
        router.go(router.currentRoute);
        router.replace({
          name: 'Home'
        })
      }
    },
    computed: {
      ...mapGetters([
        'getReservationInfo',
        'getProductRetrieve'
      ])
    }
  }
</script>
<style scoped>
</style>
