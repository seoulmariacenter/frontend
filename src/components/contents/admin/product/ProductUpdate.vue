<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>{{getProductRetrieve.title}} 수정하기</strong></h2>
      </div>
      <hr>
      <div class="m-2">
        <form enctype="multipart/form-data" @submit.prevent="onSubmit" method="post">
          <div class="form-group row">
            <label for="inputTitle" class="col-md-2 col-form-label"><strong>상품 이름</strong></label>
            <div class="col-md-8">
              <input v-model="title" type="text" class="form-control" id="inputTitle" :placeholder="'기존 이름: ' + getProductRetrieve.title">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-md-2 col-form-label"><strong>가격</strong></label>
            <div class="col-md-8">
              <div class="input-group">
                <input v-model="price" type="number" class="form-control" id="inputPrice" :placeholder="'기존 가격: ' + getProductRetrieve.price">
                <div class="input-group-append">
                  <span class="input-group-text">원 (₩)</span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-5">
              <label for="inputStartDate1" class="col-form-label"><strong>출발 날짜</strong></label>
              <input v-model="startDate" type="date" class="form-control" id="inputStartDate1">
            </div>
            <div class="form-group col-md-5">
              <label for="inputStartDate2" class="col-form-label"><strong>도착 날짜</strong></label>
              <input v-model="endDate" type="date" class="form-control" id="inputStartDate2">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="imageUpload" class="col-form-label"><strong>상품 대표 이미지</strong></label>
              <input @change="onFileSelected" type="file" class="form-control-file" id="imageUpload" accept="image/*">
            </div>
          </div>
          <div class="form-group col pl-0">
            <div class="form-check">
              <input v-model="isPublished" class="form-check-input" type="checkbox" :value="getProductRetrieve.publish" id="publishCheck">
              <label class="form-check-label" for="publishCheck">
                <strong>발행하기!</strong> (이 버튼을 체크하시면 고객들이 순례 상품을 볼 수 있게 됩니다)
              </label>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-8 d-flex p-2">
              <button type="submit" class="btn btn-primary mr-2">순례 상품 생성</button>
              <button @click="onReset" type="reset" class="btn btn-outline-danger ml-2">지우고 다시 쓰기</button>
            </div>
          </div>
          <div class="form-group row">
            <message/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Message from '../../Message'
  export default {
    name: "CreateManagement",
    components: {
      Message
    },
    props: ['property'],
    data() {
      return {
        params: this.$route.params.pk,
        title: null,
        price: null,
        startDate: null,
        endDate: null,
        selectedFile: null,
        isPublished: false,
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
        this.$store.dispatch('getProductRetrieveQuery', this.params)
      },
      onFileSelected(event) {
        this.selectedFile = event.target.files[0];
      },
      onSubmit() {
        const formData = {
          params: this.params,
          title: this.title,
          price: this.price,
          startDate: this.startDate,
          endDate: this.endDate,
          image: this.selectedFile,
          publish: this.isPublished
        };

        let result = Object();

        for (let property in formData) {
          if (formData[property] !== null) {
            result[property] = formData[property];
          }
        }

        if (this.startDate > this.endDate) {
          this.$store.commit('updateMsg', '도착 날짜가 출발 날짜보다 이릅니다!')
        } else {
          this.$store.dispatch('updateProduct', result)
        }
      },
      onReset() {
        this.$store.commit('clearMsg');
        this.title = this.price = this.startDate = this.endDate = null
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
</style>
