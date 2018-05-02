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
        <a role="button" class="col-lg-6 col-sm-12 hovering" data-toggle="modal" data-target="#pictureModal">
          <img v-if="getProductRetrieve.image"
          :src="getProductRetrieve.image"
          class="img-fluid rounded"
          alt="순례 상품 대표 이미지">
          <img v-else class="img-fluid rounded" src="../../../../assets/image/medjugorje_maria_01.jpg" alt="기본 이미지">
          <p class="mt-2">대표 이미지를 변경하려면 사진을 클릭하세요!</p>
        </a>
        <!-- Modal -->
        <div class="modal fade"
        id="pictureModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="pictureModalLabel"
        aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="pictureModalLabel">이미지 변경</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form enctype="multipart/form-data" @submit.prevent="onImageUpload">
                <div class="modal-body">
                  <div class="form-group">
                    <label for="imageUpload">이미지 업로드</label>
                    <input type="file" ref="file" accept="image/*" class="form-control-file" id="imageUpload" @change="handleFileUpload()">
                  </div>
                  <img :src="imagePreview" v-show="showPreview"/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">적용</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <message/>
      <hr>
      <div class="row m-2 d-flex justify-content-between">
        <button class="col-3 btn btn-outline-info mr-1" @click="tableResult">일정표 확인</button>
        <router-link :to="{name: 'Schedule'}" tag="button" class="col-3 btn btn-outline-warning">일정표 관리</router-link>
        <router-link :to="{name: 'AdminReservationList'}" tag="button" class="col-3 btn btn-outline-primary ml-1">예약 확인</router-link>
      </div>
      <div class="row m-2 mt-5">
        <schedule-table v-if="scheduleLoading" v-bind:acceptModify="acceptModify"/>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import axios from 'axios/index'
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
        file: '',
        showPreview: false,
        imagePreview: '',
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
      handleFileUpload(){
        /*
         Set the local file variable to what the user has selected.
         */
        this.file = this.$refs.file.files[0];
        console.log(this.file);
        /*
         Initialize a File Reader object
         */
        let reader  = new FileReader();

        /*
         Add an event listener to the reader that when the file
         has been loaded, we flag the show preview as true and set the
         image to be what was read from the reader.
         */
        reader.addEventListener("load", function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this), false);

        /*
         Check to see if the file is not empty.
         */
        if( this.file ){
          /*
           Ensure the file is an image file.
           */
          if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
            /*
             Fire the readAsDataURL method which will read the file in and
             upon completion fire a 'load' event which we will listen to and
             display the image in the preview.
             */
            reader.readAsDataURL( this.file );
          }
        }
      },
      onImageUpload() {
        /*
         Initialize the form data
         */
        let formData = new FormData();

        /*
         Add the form data we need to submit
         */
        formData.append('image', this.file);

        axios({
          method: 'patch',
          url: this.$store.state.endpoints.baseUrl + this.$store.state.endpoints.travel + this.params + '/',
          data: formData,
          headers: {
            'Content-Type' : 'multipart/form-data;boundary="boundary"',
            'Authorization': 'JWT ' + sessionStorage.getItem('token')
          },
          xsrfHeaderName: 'X-XSRF-TOKEN',
          credentials: true
        }).then(() => {
          router.go(router.currentRoute)
        }).catch((error) => {
          if (typeof error.response !== 'undefined') {
            this.$store.commit('clearMsg');
            this.$store.commit('updateMsg', error.response.data)
          }
        })

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
  .hovering:hover {
    cursor: pointer;
    opacity: .6;
    transition: opacity .4s;
  }
</style>
