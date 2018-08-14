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
      <div class="column is-5">{{timeFit(post.created)}}</div>
    </div>
    <div v-html="Convertcontent(post.content)" class="view__content is-fullwidth"></div>
    <div class="columns file__columns">
      <div class="column is-1">첨부파일</div>
      <div class="column is-5">
        <div class="field">
          <ul class="file-ul">
            <li class="file-li" v-for="(file) in post.files" :key="file.index" @click="downloadPage(file.index)">
              <span class="icon">
                <i class="fas fa-download"></i>
              </span> {{file.name}}
              <span class="filesize">( {{filesizeFit(file.size)}} )</span>
            </li>
          </ul>
        </div>
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
        let convertContent = ""
        convertContent = content;
        let result = this.$convert.texttodiv(convertContent);
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
      downloadPage(fileIndex) {
        let url = this.downloadLink(fileIndex);
        window.open(url, '_blank');
      },
      downloadLink(fileIndex) {
        let postIndex = this.$route.params.postIndex;
        return (CONFIG.BASE_URL + "/posts/" + postIndex + "/files/" + fileIndex);
      },
      timeFit(time) {
        return time.split(' ')[0];
      },
      filesizeFit(size) {
        if (size / 1024 < 1) {
          return (size + "Byte");
        } else {
          return (Math.floor(size / 1024) + "KB");
        }
      },
      
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

  .file-ul {
    width: 100%;
    display: block;
  }

  .file-li {
    height: 35px;
  }

  .filesize {
    font-size: 15px;
  }

</style>
