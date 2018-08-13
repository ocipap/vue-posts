<template>
  <div class="viewcontent__cover">
    <div class="columns title__columns">
      <div class="column is-1">제목</div>
      <div class="column">{{post.title}}</div>
    </div>
    <div class="columns type__columns">
      <div class="column is-1">구분</div>
      <div class="column">{{post.type}}</div>
    </div>
    <div class="columns author__columns">
      <div class="column is-1">작성자</div>
      <div class="column is-5">{{post.writer}}</div>
      <div class="column is-1">등록일</div>
      <div class="column is-5">{{post.created}}</div>
    </div>
    <div v-html="Convertcontent(post.content)" class="view__content is-fullwidth"></div>
    <hr>

  </div>
</template>
<script>
  export default {
    name: "ShowContent",
    props: ["post"],
    methods: {
      Convertcontent: function (postcontent) {
        let result = postcontent.replace(/(\n|\r\n)/g, '</br>');
        return result;
      }
    }
    // computed: {
    //   Convertcontent: function (postcontent) {
    //     let result = postcontent.replace(/(\n|\r\n)/g, '</br>');
    //     return result;
    //   }
    // }
  }

</script>
<style scoped>
  .viewcontent__cover {
    margin-top: 50px;
  }

  .columns {
    border-bottom: 1px solid #e0e0e0;
  }

  .title__columns {
    border-top: 1px solid #00D1B2;
    font-weight: bold;
  }

  .columns .is-1 {
    background-color: rgb(240, 254, 244);
    color: rgb(0, 117, 100);
    font-weight: bold;
    text-align: center;
  }

  .view__content {
    width: 100%;
    padding: 15px;
    height: 350px;
    overflow-y: scroll;
    word-wrap: break-word;
    word-break: keep-all;
  }

  .view__content::-webkit-scrollbar {
    width: 15px;
  }

  /* Track */

  .view__content::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */

  .view__content::-webkit-scrollbar-thumb {
    background: #00D1B2;
    cursor: pointer;
  }

  /* Handle on hover */

  .view__content::-webkit-scrollbar-thumb:hover {
    background: rgb(1, 158, 135);
  }

</style>
