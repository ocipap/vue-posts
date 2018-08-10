<template>
  <div class="replycontent__cover">
    <article class="reply__input media">
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" name="reply" id="reply" cols="30" rows="10" placeholder="Add a comment..." v-model="replyInput"></textarea>
          </p>
        </div>
      </div>
      <div class="media-right">
        <div>
          <button class="button" @click="writeReply">
            <span class="icon">
              <i class="fas fa-pencil-alt"></i>
            </span>
            <span>댓글 등록</span>
          </button>
        </div>
        <div class="reply__calc">
          {{replyInputLength}} / {{MaxReplyLength}} 자
        </div>
      </div>
    </article>
    <div class="reply__list" v-if="replyLists.length !== 0">
      <div class="reply__list__header">
        댓글 &nbsp;&nbsp;&nbsp;
        <span style="color: red">{{ replyListsLength }}</span>
      </div>
      <ul>
        <li v-for="(replylist, index) in pagenatedData" :key="index" class="reply__li">
          <p class="reply__list__author">{{replylist.writer}}</p>
          <div v-html="replyContent(replylist.content)" class="reply__list__content"></div>
        </li>
      </ul>
      <div class="paginate">
        <button :disabled="pageNum === 0" @click="prevPage" class="button">이전</button>
        <span class="page__count">{{ pageNum + 1}} / {{ pageCount }} 페이지</span>
        <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="button">다음</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
  import constant from '../../../constant';
  export default {
    name: "ReplyContent",
    data() {
      return {
        pageNum: 0,
        replyInput: "",
        MaxReplyLength: 300
      }
    },
    props: ["replyLists"],
    methods: {
      nextPage: function () {
        this.pageNum++;
      },
      prevPage: function () {
        this.pageNum--;
      },
      writeReply: function () {
        if (this.replyInput === "") {
          alert("댓글을 입력하지 않았습니다.");
        } else {
          this.$store.dispatch(constant.WRITE_REPLY, {
            postIndex: this.$route.params.postIndex,
            content: this.replyInput
          })
          this.replyInput = "";
        }
      },
      replyContent(content){
        return content.replace(/(\n|\r\n)/g, '</br>');
      }
    },
    computed: {
      pageCount() {
        let page = Math.floor(this.replyLists.length / 4);
        return ((this.replyLists.length % 4) > 0) ? page + 1 : page;
      },
      pagenatedData() {
        const start = this.pageNum * 4,
          end = start + 4;
        return this.replyLists.slice(start, end);
      },
      replyInputLength() {
        return this.replyInput.length;
      },
      replyListsLength() {
        return this.replyLists.length;
      },

    },
    watch: {
      reply() {
        this.replyInput = this.replyInput.substring(0, this.MaxReplyLength)
      }
    }
  }

</script>
<style scoped>
  .replycontent__cover {
    background-color: #f0f0f0;
    padding: 12px;
    margin-bottom: 100px;
  }

  #reply {
    height: 150px;
    resize: none;
  }

  .reply__input {
    padding: 10px;
    margin-bottom: 15px;
  }

  .reply__list {
    background-color: #fff;
    padding: 5px 15px 25px 15px;
  }

  .reply__calc {
    text-align: center;
    padding-top: 30px;
  }

  .reply__list__header {
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }

  .reply__li {
    padding: 20px 15px;
    border-bottom: 1px solid #ddd;
  }

  .reply__list__author {
    font-weight: bold;
  }

  .reply__list__content {
    padding: 5px;
    color: gray;
    word-break: keep-all;
  }

  .paginate {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    line-height: 35px;
  }

  .paginate>* {
    margin: 0px 10px;
  }

</style>
