<template>
  <div class="row mt-5 mb-5">
    <div class="col-lg-4 col-md-3"></div>
    <div class="col-lg-4 col-md-6 col-sm-12 mt-5 mb-5">
      <div class="container mt-5 mb-5">
        <h2 class="pb-5">관리자 로그인</h2>
        <form @submit.prevent="onSubmit" method="post">
          <div class="form-group row">
            <label for="inputUserName" class="col-md-4 col-form-label"><strong>아이디</strong></label>
            <div class="col-md-8">
              <input v-model="username" type="text" class="form-control" id="inputUserName" placeholder="아이디를 입력하세요" required>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword" class="col-md-4 col-form-label"><strong>비밀번호</strong></label>
            <div class="col-md-8">
              <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="비밀번호를 입력하세요" required>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-4 col-form-label"></label>
            <div class="col-md-8">
              <button type="submit" class="btn btn-info">로그인</button>
            </div>
          </div>
          <div class="form-group row">
            <message/>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-4 col-md-3"></div>
  </div>
</template>
<script>
  import Message from '../../structure/AppMessage'
  export default {
    name: "SignIn",
    components: {
      Message
    },
    data () {
      return {
        username: '',
        password: ''
      }
    },
    created() {
      this.$store.commit('clearMsg')
    },
    methods: {
      onSubmit () {
        const formData = {
          username: this.username,
          password: this.password
        };
        this.$store.dispatch('signInAdmin', formData)
      }
    }
  }
</script>
<style scoped>
  .btn-primary {
    background-color: #0081D5;
  }
  .btn-primary:hover {
    background-color: #33A7D5;
    border-color: #33A7D5;
  }
</style>
