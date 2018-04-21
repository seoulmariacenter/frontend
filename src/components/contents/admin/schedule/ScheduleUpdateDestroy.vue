<template>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="scheduleModalLabel">스케줄 수정하기</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="parseSchedulePk">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {{getScheduleRetrieve}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger"><strong>스케줄 삭제</strong></button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="parseSchedulePk">수정 취소</button>
        <button type="button" class="btn btn-primary">수정하기</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {router} from "../../../../main";
  export default {
    name: "ScheduleUpdateDestroy",
    props: ['dateNum', 'schedulePk'],
    data() {
      return {
        params: this.$route.params.pk
      }
    },
    created() {
      this.fetchData()
    },

    methods: {
      parseSchedulePk() {
        this.$emit('parseSchedulePk', 0);
        router.go(router.currentRoute)
      },
      fetchData() {
        const formData = {
          params: this.params,
          dateNum: this.dateNum,
          schedulePk: this.schedulePk
        };
        this.$store.dispatch('getScheduleListQuery', formData);
        this.$store.dispatch('getScheduleRetrieveQuery', formData)
      }
    },
    computed: {
      ...mapGetters([
        'getScheduleInfo',
        'getScheduleRetrieve'
      ])
    }
  }
</script>
<style scoped>
</style>
