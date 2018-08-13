<template>
  <div class="viewcontent__cover">
    <div class="columns title__columns">
      <div class="column is-1">제목</div>
      <div class="column">{{post.title}}</div>
    </div>
    <div class="columns type__columns">
      <div class="column is-1">구분</div>
      <div class="column">{{typeMatch(post.type)}}</div>
    </div>
    <div class="columns author__columns">
      <div class="column is-1">작성자</div>
      <div class="column is-5">{{post.writer}}</div>
      <div class="column is-1">등록일</div>
      <div class="column is-5">{{post.created}}</div>
    </div>
    <div v-html="Convertcontent(post.content)" class="view__content is-fullwidth"></div>
    <div class="columns file__columns">
      <div class="column is-1">첨부파일</div>
      <div class="column is-5">
        <a class="has-text-primary" id="downloadLink" @click="downloadPage()" v-if="post.fileName">
          <span class="icon">
            <i class="far fa-save"></i>
          </span>{{post.fileName}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import CONFIG from '../../../config'
  import CONSTANT from '../../../constant'
  export default {
    name: "ShowContent",
    props: ["post"],
    methods: {
      Convertcontent(content) {
        let result = this.$convert.texttodiv(content);
        return result;
      },
      typeMatch(type) {
        let typelist = {
          'protect': '보호조치',
          'api': 'API',
          'environment': '개발환경',
          'etc': '기타'
        };
        for (var key in typelist) {
          if (key === type) {
            return typelist[key];
          }
        }
        return ''
      },
      downloadPage() {
        let url = this.downloadLink();
        window.open(url, '_blank');
      },
      downloadLink() {
        let postIndex = this.$route.params.postIndex;
        return (CONFIG.BASE_URL+"/posts/" + postIndex + "/files");
      }
    }
  }

</script>
<style scoped>
  .viewcontent__cover {
    margin-top: 50px;
  }

  .columns {
    border-bottom: 1px solid #e0e0e0;
  }

  .file__columns {
    margin-top: 12px;
    border-top: 1px solid #e0e0e0;

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
