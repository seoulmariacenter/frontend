<template>
  <div class="col mt-2">
    <div class="card">
      <div class="card-header">
        {{dateNum}}일차 스케줄 수정하기
      </div>
      <div class="card-body">
        <h4 class="card-title">Special title treatment</h4>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ScheduleDetail",
    props: ['dateNum'],
    computed: {
      ...mapGetters([
        ''
    ])
    }
  }
</script>
<style scoped>
</style>
