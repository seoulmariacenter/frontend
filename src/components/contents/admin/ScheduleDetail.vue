<template>
  <div class="col mt-2" id="schedule-card">
    <div class="card">
      <div class="card-header">
        <h5 class="d-inline-block m-0"><strong>{{dateNum}}일차 스케줄 수정하기</strong></h5>
        <button type="button" class="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="card-body">
        <div v-for="index in getScheduleInfo[dateNum]" :key="index.id">
          {{index}}
        </div>
        <div class="alert alert-info" v-if="getScheduleInfo[dateNum].length === 0">
          <strong>아직 스케줄이 없습니다!</strong>
        </div>
        <hr>
        <h4 class="card-title">새로운 스케줄 등록하기</h4>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <div class="d-flex">
          <button class="btn btn-primary mr-1">스케줄 등록</button>
          <button class="btn btn-outline-danger ml-1">지우고 다시 쓰기</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ScheduleDetail",
    props: ['dateNum'],
    data() {
      return {
        params: this.$route.params.pk
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
        const formData = {
          params: this.params,
          dateNum: this.dateNum
        };
        this.$store.dispatch('getScheduleListQuery', formData);
      }
    },
    computed: {
      ...mapGetters([
        'getScheduleInfo'
      ])
    }
  }
</script>
<style scoped>
</style>
