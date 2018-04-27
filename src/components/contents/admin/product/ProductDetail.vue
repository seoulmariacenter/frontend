<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block d-flex">
        <h2 class="mt-2"><strong>{{getProductRetrieve.title}} 관리</strong></h2>
        <button :class="classObject" data-toggle="modal" data-target="#publishModal"><strong>{{isPublishedText}}</strong></button>

        <!--Modal-->
        <div class="modal fade" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="publishModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">발행 관리</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>현재 이 상품은 <strong>'{{isPublishedText}}'</strong> 상태입니다. <strong>'{{oppositePublishedText}}'</strong> 으로 변경하시겠습니까?</p>
              </div>
              <div class="modal-footer">
                <form @submit.prevent="onSubmit(oppositePublishedText)" method="post">
                  <button type="button" class="btn btn-secondary mr-1" data-dismiss="modal">취소</button>
                  <button type="submit" class="btn btn-primary ml-1"><strong>변경하기</strong></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="loading row m-2" v-if="parentLoading">
        <h4>잠시만 기다려 주세요...</h4>
      </div>
      <div class="row m-2" v-if="getProductRetrieve">
        <div class="col-lg-6 col-sm-12 mb-sm-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0"><strong>상품명:</strong> {{getProductRetrieve.title}}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>소요 시간:</strong> {{getProductRetrieve.start_time}} ~ {{getProductRetrieve.end_time}}
                <strong>({{calcDate}}박 {{calcDate+1}}일)</strong></li>
              <li class="list-group-item"><strong>가격:</strong> {{getProductRetrieve.price}}원</li>
            </ul>
            <product-update-destroy/>
          </div>
        </div>
        <figure class="figure col-lg-6 col-sm-12" v-if="getProductRetrieve.image">
          <img :src="getProductRetrieve.image" class="figure-img img-fluid rounded" alt="순례 상품 대표 이미지">
        </figure>
        <figure class="figure col-lg-6 col-sm-12" v-else>
          <img class="figure-img img-fluid rounded" src="../../../../assets/image/medjugorje_maria_01.jpg" alt="기본 이미지">
        </figure>
      </div>
      <message/>
      <hr>
      <div class="row m-2 d-flex justify-content-between">
        <button class="col-3 btn btn-outline-info mr-1" @click="tableResult">일정표 확인</button>
        <router-link :to="{name: 'Schedule'}" tag="button" class="col-3 btn btn-outline-warning">일정표 관리</router-link>
        <router-link :to="{name: 'ReservationList'}" tag="button" class="col-3 btn btn-outline-primary ml-1">예약 확인</router-link>
      </div>
      <div class="row m-2 mt-5">
        <schedule-table v-if="scheduleLoading" v-bind:acceptModify="acceptModify"/>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {router} from '../../../../main'
  import ProductUpdateDestroy from './ProductUpdateDestroy'
  import ScheduleTable from '../schedule/ScheduleTable'
  import Message from '../../../structure/AppMessage'
  export default {
    name: "ProductDetail",
    components: {
      ProductUpdateDestroy,
      ScheduleTable,
      Message
    },
    data() {
      return {
        published: {
          yes: '발행 중',
          no: '미발행'
        },
        parentLoading: false,
        scheduleLoading: false,
        acceptModify: false,
        dateValue: 0,
        params: this.$route.params.pk
      }
    },
    created() {
      this.FetchData();
    },
    watch: {
      '$route': 'FetchData',
    },
    methods: {
      tableResult() {
        return this.scheduleLoading ? this.scheduleLoading = false : this.scheduleLoading = true
      },
      onSubmit(payload) {
        let boolean;
        payload === this.published.yes ? boolean = true : boolean = false;
        const formData = {
          params: this.params,
          publish: boolean
        };
        this.$store.dispatch('updateProduct', formData);
        router.go(router.currentRoute)
      },
      FetchData() {
        this.$emit('manageContent', false);
        this.$store.commit('clearProductRetrieve');
        this.parentLoading = true;
        this.$store.dispatch('getProductRetrieveQuery', this.params);
        this.parentLoading = false;
      },
      ...mapMutations([
        'clearProductRetrieve'
      ])
    },
    computed: {
      ...mapGetters([
        'getProductRetrieve',
        'calcDate'
      ]),
      classObject: function() {
        return {
          'btn': true,
          'btn-lg': true,
          'ml-4': true,
          'btn-secondary': !this.getProductRetrieve.publish,
          'btn-info': this.getProductRetrieve.publish
        }
      },
      isPublishedText: function() {
        return this.getProductRetrieve.publish ? this.published.yes : this.published.no;
      },
      oppositePublishedText: function() {
        return this.getProductRetrieve.publish ? this.published.no : this.published.yes;
      }
    }
  }
</script>
<style scoped>
</style>
