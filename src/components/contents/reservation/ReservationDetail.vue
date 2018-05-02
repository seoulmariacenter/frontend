<template>
  <div class="row justify-content-between">
    <reservation-information/>
    <div class="bg-light col-md-5 col-sm-12">
      <div class="m-3 pt-3 pb-3">
        <div class="d-block d-flex justify-content-between">
          <h2 class="mb-0"><strong>동승자 목록</strong></h2>
          <p class="mt-3 mb-0">동승 인원: 총 <span class="text-info">{{getReservationMemberCount}}</span> 명</p>
        </div>
        <hr>
        <div class="mt-2" v-if="getReservationMemberQuery">
          <div class="card mb-2" v-for="index in getReservationMemberQuery" :key="index.id">
            <div class="card-header">
              <h6 class="d-inline-block card-title mb-0"><strong>{{index.name}}</strong></h6>
              <button @click="member = index.pk" type="button" class="close" aria-label="Close" data-toggle="modal" data-target="#destroyMemberModal">
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
                      <button @click="onDestroy(member)" type="button" class="btn btn-outline-danger">삭제</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body d-flex justify-content-between">
              <div class="">
                <p class="mb-1"><strong>연락처:</strong> {{index.phone_number}}</p>
                <p class="mb-0">
                  <span class="mb-0" v-if="index.gender"><strong>성별:</strong> 여성</span>
                  <span class="mb-0" v-else><strong>성별:</strong> 남성</span>
                </p>
              </div>
              <div class="">
                <button @click="member = index.pk" class="btn btn-outline-warning mt-2" data-toggle="modal" data-target="#updateMemberModal">수정</button>
                <!-- Modal -->
                <div class="modal fade" id="updateMemberModal" tabindex="-1" role="dialog" aria-labelledby="updateMemberModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="updateMemberModalLabel">동승자 정보 수정</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <form @submit.prevent="onPatch(member)">
                        <div class="modal-body">
                          <div class="form-row">
                            <label for="inputName" class="col-form-label"><strong>동승자 성함</strong></label>
                            <input v-model="name"
                            type="text"
                            class="form-control"
                            id="inputName"
                            placeholder="동승자 성함을 입력하세요.">
                          </div>
                          <div class="form-row">
                            <label for="inputPhone" class="col-form-label"><strong>연락처</strong></label>
                            <input v-model="phone"
                            type="text"
                            class="form-control"
                            id="inputPhone"
                            placeholder="핸드폰 번호를 입력하세요. 예) 010-1234-5678">
                          </div>
                          <fieldset class="form-row">
                            <legend class="col-form-label pb-0"><strong>동승자 성별</strong></legend>
                            <div class="d-flex m-2">
                              <div class="form-check mr-4">
                                <input v-model="gender"
                                class="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="genderRadios1"
                                value="True"
                                checked>
                                <label class="form-check-label" for="genderRadios1">
                                  여성
                                </label>
                              </div>
                              <div class="form-check m1-4">
                                <input v-model="gender"
                                class="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="genderRadios2"
                                value="False">
                                <label class="form-check-label" for="genderRadios2">
                                  남성
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                          <button type="submit" class="btn btn-outline-warning">수정</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
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
    data() {
      return {
        name: '',
        phone: '',
        gender: 'True',
        member: 0
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      onPatch(payload) {
        const formData = {
          pk: sessionStorage.getItem('session_pk'),
          member: payload,
          name: this.name,
          phone: this.phone,
          gender: this.gender
        };

        let result = Object();

        for (let property in formData) {
          if (formData[property] !== '') {
            result[property] = formData[property];
          }
        }

        this.$store.dispatch('updateReservationMember', result)
      },
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
