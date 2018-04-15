<template>
  <div class="col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>{{getProductRetrieve.title}} 일정표 만들기</strong></h2>
      </div>
      <hr>
      <div class="row m-2 justify-content-between text-center">
        <div class="col-5 p-2 rounded border border-secondary">출발 일시: <strong>{{getProductRetrieve.start_time}}</strong></div>
        <div class="col-5 p-2 rounded border border-secondary">도착 일시: <strong>{{getProductRetrieve.end_time}}</strong></div>
      </div>
      <h6 class="text-center m-4">출발 일시와 도착 일시를 확인하시고 날짜를 입력해주세요!</h6>
      <div class="row m-2 mt-5 mb-5">
        <div class="col-12">
          <form @submit.prevent="onSubmit" method="post">
            <div class="input-group input-group-lg">
              <input v-model="dateTime" type="date" class="form-control rounded-left">
              <span class="input-group-btn">
                <button class="btn btn-info btn-lg rounded-0 round" type="submit">{{dateNum}}일차 추가</button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div class="row m-2">
        <message/>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Message from '../Message'
  export default {
    name: "CreateSchedule",
    components: {
      Message
    },
    data() {
      return {
        params: this.$route.params.pk,
        dateNum: 1,
        dateTime: ''
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
      },
      onSubmit() {
        const formData = {
          params: this.params,
          dateNum: this.dateNum,
          dateTime: this.dateTime
        };
        if (this.dateNum === 1 && this.dateTime !== this.getProductRetrieve.start_time) {
          this.$store.commit('updateMsg', '1일차 날짜를 출발 일시와 맞춰주세요!')
        } else {
          this.$store.commit('clearMsg');
          this.$store.dispatch('createDate', formData);
          this.dateNum++;

          formData.dateTime.setDate(formData.dateTime.getDate() + 1);
          console.log(this.dateTime)
        }
      }
    },
    computed: {
    ...mapGetters([
      'getProductRetrieve'
    ])
    }
  }
</script>
<style scoped>
  .round {
    border-top-right-radius: .25rem !important;
    border-bottom-right-radius: .25rem !important;
  }
</style>
