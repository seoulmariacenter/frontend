<template>
  <div class="col-lg-9 col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>순례 상품 만들기</strong></h2>
      </div>
      <hr>
      <div class="m-2">
        <form @submit.prevent="onSubmit" method="post">
          <div class="form-group row">
            <label for="inputTitle" class="col-md-2 col-form-label"><strong>상품 이름</strong></label>
            <div class="col-md-8">
              <input v-model="title" type="text" class="form-control" id="inputTitle" placeholder="순례 상품 이름을 입력하세요" required>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-md-2 col-form-label"><strong>가격</strong></label>
            <div class="col-md-8">
              <div class="input-group">
                <input v-model="price" type="text" class="form-control" id="inputPrice" placeholder="가격을 숫자로 입력하세요 (예: '4,500,000')" required>
                <div class="input-group-append">
                  <span class="input-group-text">원 (₩)</span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-5">
              <label for="inputStartDate1" class="col-form-label"><strong>출발 날짜</strong></label>
              <input v-model="startDate" type="date" class="form-control" id="inputStartDate1" required>
            </div>
            <div class="form-group col-md-5">
              <label for="inputStartDate2" class="col-form-label"><strong>도착 날짜</strong></label>
              <input v-model="endDate" type="date" class="form-control" id="inputStartDate2" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputTextarea"><strong>설명</strong></label>
            <textarea v-model="description" class="form-control col-md-10" id="inputTextarea" rows="3" placeholder="설명을 입력하세요"></textarea>
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
  import Message from '../../../structure/AppMessage'
  export default {
    name: "ProductCreate",
    components: {
      Message
    },
    props: ['property'],
    data() {
      return {
        title: null,
        price: null,
        startDate: null,
        endDate: null,
        description: null
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
        this.$emit('manageContent', false)
      },
      onSubmit() {
        const formData = {
          title: this.title,
          price: this.price,
          startDate: this.startDate,
          endDate: this.endDate,
          description: this.description
        };

        if (this.startDate > this.endDate) {
          this.$store.commit('updateMsg', '도착 날짜가 출발 날짜보다 이릅니다!')
        } else {
          console.log(formData);
          this.$store.dispatch('createProduct', formData)
        }
      },
      onReset() {
        this.$store.commit('clearMsg');
        this.title = this.price = this.startDate = this.endDate = this.description = null
      }
    }
  }
</script>
<style scoped>
</style>
