<template>
  <div class="login__cover">
    <div class="container">
      <div class="login__card columns is-centered">
        <div class="card is-rounded">
          <div class="card-content">
            <div class="login__card__top has-text-centered">
              <h2 class="title is-3 has-text-primary">LOGIN</h2>
              please login to proceed.
            </div>
            <div class="control">
              <label for="id" class="is-size-7">ID</label>
              <input class="input" v-model="identification" type="text" placeholder="id" name="id" id="id" autocomplete="off">
            </div>
            <div class="control">
              <label for="password" class="is-size-7">PASWORD</label>
              <input class="input" v-model="password" type="password" placeholder="password" name="passwrod" id="password" @keydown.enter="login">
            </div>
            <div class="control">
              <button @click="login" class="button is-primary is-fullwidth is-outlined">LOGIN</button>
            </div>
            <div class="login__card__bottom has-text-centered">
              <router-link :to="{name:'Board'}" class="button is-small is-primary">메인페이지로</router-link>
              <router-link :to="{name:'Signup'}" class="button is-primary is-outlined is-small">회원가입</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'Login',
    data: function(){
      return {
        identification: '',
        password: ''
      }
    },
    methods:{
      login: function(){
        if(this.identification === "", this.password === ""){
          alert("입력하지 않은 칸이 존재 합니다.");
          return;
        }else {
          this.$store.dispatch('signin', {identification: this.identification, password: this.password})
        }
      }
    }
  }
</script>
<style scoped>
  .login__cover {
    width: 100%;
    height: 100%;
    background: linear-gradient(#00D1B2, #fff);
    padding-top: 200px;
  }

  .card-content > *{
    margin: 30px 0px;
  }
</style>