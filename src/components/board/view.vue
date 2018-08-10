<template>
  <div class="view__cover">
    <header-nav></header-nav>
    <div class="wrapper">
      <board-header></board-header>
      <view-content :post="postOne"></view-content>
      <div class="field has-text-right list__btn">
        <router-link :to="{name: 'Board'}" class="button">
          <span class="icon">
            <i class="fas fa-list"></i>
          </span>
          <span>목록으로</span>
        </router-link>
      </div>
      <reply-content :replyLists="replyList"></reply-content>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
  import constant from '../../constant'
  import BoardHeader from '../default/boardheader';
  import HeaderNav from '../default/navbar';
  import ViewContent from './view/viewcontent';
  import ReplyContent from './view/replycontent';
  export default {
    name: 'View',
    components: {
      BoardHeader,
      HeaderNav,
      ViewContent,
      ReplyContent
    },
    data: function () {
      return {
        postIndex: 0,
        replyModel: ""
      }
    },
    created() {
      this.$store.dispatch(constant.LOAD_POST_ONE,{postIndex: this.$route.params.postIndex});
    },
    computed:{
      replyList: function(){
        return this.$store.getters.replyList;
      },
      postOne: function(){
        return this.$store.getters.postOne;
      }
    }
  }

</script>
<style scoped>
  .list__btn {
    margin-top: 20px;
  }

</style>
