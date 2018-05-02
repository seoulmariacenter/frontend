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
        <div class="card text-white bg-danger">
          <div class="card-header"><h4 class="mb-0"><strong>예약 취소에 관하여</strong></h4></div>
          <div class="card-body">
            <p class="card-text mb-1">
              서울마리아센터는 여행 경비를 절감하기 위해 최소 인원이 갖춰지는 대로 항공권을 단체 예매하고 있습니다.
            </p>
            <p class="card-text">
              만일 여행 일정이 임박했을 때 예약을 취소하시면
              <router-link :to="{name: 'Compensation'}" class="text-dark" target="_blank"><strong>소비자 분쟁 해결 기준</strong></router-link>
              에 따른 손해배상액을 부담하실 수 있으니 참고 바랍니다.
            </p>
          </div>
        </div>
      </div>
      <div class="m-3 pt-3 pb-3">
        <div class="d-block d-flex justify-content-between">
          <h2><strong>동승자 목록</strong></h2>
          <p class="mt-3 mb-0">동승자 인원: 총 <span class="text-info">{{getReservationMemberCount}}</span> 명</p>
        </div>
        <hr>
        <div class="mt-2" v-if="getReservationMemberQuery">
          <div class="card mb-2" v-for="index in getReservationMemberQuery" :key="index.id">
            <div class="card-header">
              <h6 class="d-inline-block card-title mb-0"><strong>{{index.name}}</strong></h6>
              <button type="button" class="close" aria-label="Close" data-toggle="modal" data-target="#destroyMemberModal">
                <span aria-hidden="true">&times;</span>
              </button>

              <!-- Modal -->
              <div class="modal fade" id="destroyMemberModal" tabindex="-1" role="dialog" aria-labelledby="destroyMemberModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="destroyMemberModalLabel">동승자 삭제</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      동승자를 정말로 삭제하시겠습니까? 한번 삭제된 정보는 복구되지 않습니다.
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                      <button @click="onDestroy(index.pk)" type="button" class="btn btn-outline-danger">삭제</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="mb-1">연락처: {{index.phone_number}}</p>
              <p class="mb-0" v-if="index.gender">성별: 여성</p>
              <p class="mb-0" v-else>성별: 남성</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import ReservationInformation from './ReservationInformaion'
  export default {
    name: "ReservationDetail",
    components: {
      ReservationInformation
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      onDestroy(payload) {
        const formData = {
          pk: sessionStorage.getItem('session_pk'),
          member: payload
        };
        this.$store.dispatch('destroyReservationMember', formData)
      },
      fetchData() {
        this.$store.dispatch('getReservationMemberQuery', sessionStorage.getItem('session_pk'))
      }
    },
    computed: {
      ...mapGetters([
        'getReservationMemberQuery',
        'getReservationMemberCount'
      ])
    }
  }
</script>
<style scoped>
</style>
