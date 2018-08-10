<template>
  <nav class="navbar has-background-primary">
    <div class="navbar-brand">
      <router-link :to="{name:'Board'}" tag="h2" class="title is-3 has-text-white">INFRANICS BOARD</router-link>      
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <button @click="logbtn" class="button is-primary is-inverted">{{ !isLogin? '로그인': '로그아웃'}}</button>
              <router-link v-if="isLogin == false" :to="{name:'Signup'}" class="button is-primary is-inverted">회원가입</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin(){
      return this.$store.getters.isLogin
    }
  },
  methods: {
    logbtn: function(){
      if(this.$store.getters.isLogin){
        this.$store.dispatch('logout');
      }else {
        this.$router.push({name: 'Login'});
      }
    }
  }
}
</script>
<style scoped>
  .navbar-brand{
    padding-top: 9px;
    padding-left: 15px;
  }
</style>
