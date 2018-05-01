<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block d-flex justify-content-between">
        <h2 class="mb-0"><strong>{{getProductRetrieve.title}} 예약 관리</strong></h2>
        <div class="d-flex justify-content-between">
          <div class="btn-group dropleft mr-4">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              예약자 정렬
            </button>
            <div class="dropdown-menu">
              <button @click="reservationQuery = 'all'" type="button" class="dropdown-item">전체 명단</button>
              <button @click="reservationQuery = 'complete'" type="button" class="dropdown-item">예약 완료 명단</button>
              <button @click="reservationQuery = 'canceled'" type="button" class="dropdown-item">취소자 명단</button>
            </div>
          </div>
          <p class="mt-2 mb-2">총 <span class="text-info">{{getActiveReservationCount}}</span> 명 예약 중</p>
        </div>
      </div>
      <hr>
      <div class="row m-2" v-if="isCanceledQuery">
        <div class="col-md-6 col-sm-12 mb-3" v-for="value in isCanceledQuery" :key="value.id">
          <div class="card">
            <div class="card-header">
              <h5 class="d-inline-block mb-0">예약자: {{value.username}}</h5>
              <button type="button" class="close" aria-label="Close" data-toggle="modal" data-target="#destroyModal">
                <span aria-hidden="true">&times;</span>
              </button>

              <!-- Modal -->
              <div class="modal fade" id="destroyModal" tabindex="-1" role="dialog" aria-labelledby="destroyModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="destroyModalLabel">예약자 삭제</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      예약자를 정말로 삭제하시겠습니까? 한번 삭제된 정보는 복구되지 않습니다.
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                      <button @click="onDestroy(value.pk)" type="button" class="btn btn-outline-danger">삭제</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">연락처: {{value.phone_number}}</h5>
              <p class="card-text">예약 일시: {{new Date(value.date_joined).getFullYear() + '-' + new Date(value.date_joined).getMonth() + '-' + new Date(value.date_joined).getDate()}}</p>
              <p class="card-text" v-if="value.gender">성별: {{gender.female}}</p>
              <p class="card-text" v-else>성별: {{gender.male}}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button v-if="value.is_active" class="btn btn-secondary" disabled>예약 상태: <strong>{{isActive.true}}</strong></button>
              <button v-else class="btn btn-outline-danger" disabled>예약 상태: <strong>{{isActive.false}}</strong></button>
              <span class="mt-2 text-right" v-if="value.date_canceled">취소 일시: {{new Date(value.date_canceled).getFullYear() + '-' + new Date(value.date_canceled).getMonth() + '-' + new Date(value.date_canceled).getDate()}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ReservationList",
    data() {
      return {
        params: this.$route.params.pk,
        gender: {
          female: '여성',
          male: '남성'
        },
        isActive: {
          true: '완료',
          false: '취소함'
        },
        reservationQuery: 'all'
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      onDestroy(payload) {
        this.$store.dispatch('destroyReservation', payload)
      },
      fetchData() {
        this.$emit('manageContent', false);
        this.$store.dispatch('getProductRetrieveQuery', this.params);
        this.$store.dispatch('getReservationListQuery', this.params);
        this.$store.dispatch('getActiveReservationCount', this.params)
      }
    },
    computed: {
      ...mapGetters([
        'getProductRetrieve',
        'getReservationQuery',
        'getActiveReservationQuery',
        'getInactiveReservationQuery',
        'getActiveReservationCount'
      ]),
      isCanceledQuery() {
        if (this.reservationQuery === 'all') {
         return this.getReservationQuery
        } else if (this.reservationQuery === 'complete') {
          return this.getActiveReservationQuery
        } else if (this.reservationQuery === 'canceled') {
          return this.getInactiveReservationQuery
        }
      }
    }
  }
</script>
<style scoped>
</style>
