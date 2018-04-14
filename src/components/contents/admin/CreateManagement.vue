<template>
  <div class="col-md-8 bg-light">
    <div class="m-3">
      <div class="d-block">
        <h2><strong>순례 상품 만들기</strong></h2>
      </div>
      <hr>
      <div class="m-2">
        <form @submit.prevent="" method="post">
          <div class="form-group row">
            <label for="inputUserName" class="col-md-2 col-form-label"><strong>상품 이름</strong></label>
            <div class="col-md-8">
              <input v-model="productName" type="text" class="form-control" id="inputUserName" placeholder="순례 상품 이름을 입력하세요" required>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-md-2 col-form-label"><strong>가격</strong></label>
            <div class="col-md-8">
              <div class="input-group">
                <input v-model="price" type="number" class="form-control" id="inputPrice" placeholder="가격을 숫자로 입력하세요 (예: '4500000')" required>
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
          <div class="form-group row">
            <div class="col-md-8">
              <button @click="onSubmit" type="submit" class="btn btn-primary mr-2">순례 상품 생성</button>
              <button @click="onReset" type="reset" class="btn btn-outline-danger ml-2">지우고 다시 쓰기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "CreateManagement",
    props: ['property'],
    data() {
      return {
        productName: null,
        price: null,
        startDate: null,
        endDate: null
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
          title: this.productName,
          price: this.price,
          start_time: this.startDate,
          end_time: this.endDate
        };
        for (const key of Object.keys(formData)) {
          if (formData[key] === null) {
            console.log('not good');
            break
          } else {
            console.log(formData[key])
          }
        }
      },
      onReset() {
        this.productName = this.price = this.startDate = this.endDate = null
      }
    }
  }
</script>
<style scoped>
</style>
