<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>{{getProductRetrieve.title}} 수정하기</strong></h2>
      </div>
      <hr>
      <div class="m-2">
        <form @submit.prevent="onSubmit" method="post">
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
                <input v-model="price" type="text" class="form-control" id="inputPrice" :placeholder="'기존 가격: ' + getProductRetrieve.price">
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
            <div class="form-group col-md-5">
              <label for="inputTextarea" class="col-form-label"><strong>설명</strong></label>
              <textarea v-model="description" @input="update" class="form-control" id="inputTextarea" rows="12"
              :placeholder="'기존 설명: ' + getProductRetrieve.description"></textarea>
            </div>
            <div class="form-group col-md-5">
              <label for="marked" class="col-form-label"><strong>미리보기</strong></label>
              <div id="marked" v-html="compileMarkdown" class="form-control overflow"></div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-8 d-flex p-2">
              <button type="submit" class="btn btn-info mr-2">순례 상품 수정</button>
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
  const _ = require('lodash');
  import marked from 'marked/marked.min'
  import {mapGetters} from 'vuex'
  import Message from '../../../structure/AppMessage'
  export default {
    name: "ProductCreate",
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
        description: ''
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
      update: _.debounce(function (e) {
        this.description = e.target.value
      }, 300),
      onSubmit() {
        const formData = {
          params: this.params,
          title: this.title,
          price: this.price,
          startDate: this.startDate,
          endDate: this.endDate,
          description: this.description
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
    ]),
      compileMarkdown: function () {
        return marked(this.description, {sanitize: true})
      }
    }
  }
</script>
<style scoped>
</style>
