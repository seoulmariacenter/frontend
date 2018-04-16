<template>
  <div class="col mt-2" id="schedule-card">
    <div class="card">
      <div class="card-header">
        <h5 class="d-inline-block m-0"><strong>{{dateNum}}일차 스케줄 수정하기</strong></h5>
        <button type="button" class="close" data-toggle="modal" data-target="#closeModal">
          <span aria-hidden="true">&times;</span>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="closeModal" tabindex="-1" role="dialog" aria-labelledby="closeModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="closeModalLabel">스케줄 수정 그만두기</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                정말 닫으시겠습니까? 작성하던 내용이 지워질 수 있습니다!
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                <button type="button" class="btn btn-danger" @click="callScheduleDetail">닫을게요</button>
              </div>
            </div>
          </div>
        </div>
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
      callScheduleDetail() {
        this.$emit('callScheduleDetail', false);
        this.$router.go(this.$router.currentRoute)
      },
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
