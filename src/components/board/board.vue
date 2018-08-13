<template>
  <div class="board__cover">
    <header-nav></header-nav>
    <div class="wrapper">
      <board-header></board-header>
      <hr>
      <search-box></search-box>
      <div class="field has-text-right write__btn">
        <router-link :to="{name: 'Write'}" class="button is-dark">
          <span class="icon">
            <i class="fas fa-pencil-alt"></i>
          </span>
          <span>글쓰기</span>
        </router-link>
      </div>
      <list-box style="margin-top: 20px;" :posts="postLists"></list-box>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import BoardHeader from '../default/boardheader'
  import HeaderNav from '../default/navbar'
  import SearchBox from './board/search'
  import ListBox from './board/list'
  import CONSTANT from '../../constant'
  export default {
    name: 'Board',
    components: {
      BoardHeader,
      HeaderNav,
      SearchBox,
      ListBox
    },
    methods: {
      show(){
        alert(this.$store.state.postLists);
      }
    },
    created(){
      this.$store.dispatch(CONSTANT.LOAD_POSTS);
    },
    computed: {
      postLists:function(){
        return this.$store.getters.postLists;
      }
    }
  }

</script>
<style scoped>
  .write__btn {
    margin-top: 30px;
  }

</style>
