<template>
  <div class="signup__cover">
    <div class="container">
      <div class="signup__card columns is-centered">
        <div class="card is-rounded">
          <div class="card-content">
            <div class="signup__card__top has-text-centered">
              <h2 class="title is-3 has-text-primary">SIGNUP</h2>
              please signup to proceed.
            </div>
            <div class="control">
              <label for="id" class="is-size-7">ID</label>
              <input class="input" type="text" placeholder="id" name="id" id="id" autocomplete="off" v-model="identification">
            </div>
            <div class="control">
              <label for="name" class="is-size-7">NAME</label>
              <input class="input" type="text" placeholder="name" name="name" id="name" v-model="name">
            </div>
            <div class="control">
              <label for="password" class="is-size-7">PASWORD</label>
              <input class="input" type="password" placeholder="password" name="passwrod" id="password" v-model="password">
            </div>
            <div class="control">
              <label for="confirm_password" class="is-size-7">CONFIRM PASWORD</label>
              <input class="input" type="password" placeholder="confirm password" name="confirm_password" id="confirm_password" v-model="passwordConfirm">
            </div>
            <div class="control">
              <button class="button is-primary is-fullwidth is-outlined" @click="signup">SIGNUP</button>
            </div>
            <div class="signup__card__bottom has-text-centered">
              <router-link :to="{name:'Board'}" class="button is-small is-primary">메인페이지로</router-link>
              <router-link :to="{name:'Login'}" class="button is-primary is-outlined is-small">로그인</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'SignUp',
    data(){
      return {
        identification: '',
        name: '',
        password: '',
        passwordConfirm: ''
      }
    },
    methods: {
      signup: function(){
        if(this.name === "" || this.identification === "" || this.password === "" || this.passwordConfirm === "" || this.password !== this.passwordConfirm){
          alert("입력값을 확인해주세요.");
          return;
        }else {
          this.$store.dispatch('signup', {identification: this.identification, name: this.name, password: this.password});
        }
      }
    }
  }

</script>
<style scoped>
  .signup__cover {
    width: 100%;
    height: 100%;
    background: linear-gradient(#00D1B2, #fff);
    padding-top: 150px;
  }

  .card-content>* {
    margin: 25px 0px;
  }

</style>
