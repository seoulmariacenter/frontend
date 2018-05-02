<template>
  <div class="row justify-content-between">
    <reservation-information/>
    <div class="bg-light col-md-5 col-sm-12">
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
              <p class="mb-0"><strong>연락처:</strong> {{index.phone_number}} |
                <span class="mb-0" v-if="index.gender"><strong>성별:</strong> 여성</span>
                <span class="mb-0" v-else><strong>성별:</strong> 남성</span>
              </p>

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
