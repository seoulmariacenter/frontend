<template>
  <div class="col-lg-9 col-md-8">
    <div class="row justify-content-between">
      <div class="p-3 col-5 bg-light">
        <div class="d-block">
          <h2 class="mb-0"><strong>예약자 관리</strong></h2>
        </div>
        <hr>
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">예약자 성함: {{getReservationInfo.username}}</li>
            <li class="list-group-item">예약자 연락처: {{getReservationInfo.phone_number}}</li>
            <li class="list-group-item">예약자 성별:
              <span v-if="getReservationInfo.gender">여성</span>
              <span v-else>남성</span>
            </li>
            <li class="list-group-item list-group-item-info">
              <h4 class="mb-0">총 예약 인원: <strong>{{getReservationMemberCount + 1}}</strong> 명</h4>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-3 col-6 bg-light">
        <div class="d-block d-flex justify-content-between">
          <h2 class="mb-0"><strong>동승자 목록</strong></h2>
          <p class="mt-3 mb-0">동승 인원: 총 <span class="text-info">{{getReservationMemberCount}}</span> 명</p>
        </div>
        <hr>
        <div class="card mb-2" v-for="index in getReservationMemberQuery" :key="index.id">
          <div class="card-header">
            <h6 class="card-title mb-0"><strong>{{index.name}}</strong></h6>
          </div>
          <div class="card-body">
            <p class="mb-0"><strong>연락처:</strong> {{index.phone_number}}</p>
            <p class="mb-0">
              <span v-if="index.gender"><strong>성별:</strong> 여성</span>
              <span v-else><strong>성별:</strong> 남성</span>
            </p>
            <p class="mb-0">
              <span v-if="index.is_adult"><strong>연령:</strong> 성인</span>
              <span v-else><strong>연령:</strong> 유아</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "AdminReservationDetail",
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.$emit('manageContent', false);
        const formData = {
          pk: this.$route.params.pk,
          host: this.$route.params.host
        };
        this.$store.dispatch('getReservationRetrieveQuery', formData);
        this.$store.dispatch('getReservationMemberQuery', this.$route.params.host)
      }
    },
    computed: {
      ...mapGetters([
        'getReservationInfo',
        'getReservationMemberQuery',
        'getReservationMemberCount'
      ])
    }
  }
</script>
<style scoped>
</style>
