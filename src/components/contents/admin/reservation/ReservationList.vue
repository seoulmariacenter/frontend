<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block d-flex justify-content-between">
        <h2><strong>{{getProductRetrieve.title}} 예약 관리</strong></h2>
        <p class="mt-3 mb-0">총 <span class="text-info">{{getActiveReservationCount}}</span> 명 예약 중</p>
      </div>
      <hr>
      <div class="row m-2" v-if="getReservationInfo">
        <div class="col-lg-3 col-md-6 col-sm-12 mb-3" v-for="value in getReservationInfo.results" :key="value.id">
          <div class="card">
            <h5 class="card-header">예약자: {{value.username}}</h5>
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
        }
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
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
        'getReservationInfo',
        'getActiveReservationCount'
      ])
    }
  }
</script>
<style scoped>
</style>
