<template>
  <div class="write__cover">
    <header-nav></header-nav>
    <div class="wrapper">
      <board-header></board-header>
      <div class="writeinput__cover">
        <div class="columns" id="title">
          <div class="column is-2">제목</div>
          <div class="column field">
            <div class="control">
              <input type="text" class="input" placeholder="제목을 입력하세요." name="title" v-model="title">
            </div>
          </div>
        </div>
        <div class="columns" id="type">
          <div class="column is-2">구분</div>
          <div class="column">
            <div class="select">
              <select name="" id="" v-model="type">
                <option value="" disabled selected>구분</option>
                <option v-for="(type, index) in types" :key="index" :value="type.type">{{type.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="columns" id="content">
          <div class="column is-2">내용</div>
          <div class="column field">
            <div class="control">
              <textarea id="" rows="16" class="textarea" placeholder="제목을 입력하세요." name="content" v-model="content"></textarea>
            </div>
          </div>
        </div>
        <div class="columns" id="file">
          <div class="column is-2">첨부파일</div>
          <div class="column">
            <div class="field">
              <div class="file is-primary">
                <label class="file-label">
                  <input class="file-input" type="file" name="file" @change="fileChange" multiple>
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Primary file…
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="field">
              <ul class="file-ul">
                <li class="file-li" v-for="(file, index) in files" :key="index">
                  <span class="icon">
                    <i class="far fa-save"></i>
                  </span> {{file.name}}
                  <span class="filesize">({{filesizeFit(file.size)}})</span>
                  <span class="has-background-danger has-text-white delete-tag" @click="removeFile(index)">삭제</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="button__group has-text-right">
          <button class="button" @click="writePost">
            <span class="icon">
              <i class="far fa-save"></i>
            </span>
            <span>저장</span>
          </button>
          <router-link :to="{name: 'Board'}" class="button">
            <span class="icon">
              <i class="far fa-times-circle"></i>
            </span>
            <span>취소</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CONSTANT from '../../constant'
  import BoardHeader from '../default/boardheader';
  import HeaderNav from '../default/navbar';
  export default {
    name: 'Write',
    components: {
      BoardHeader,
      HeaderNav
    },
    data() {
      return {
        types: [{
            type: 'protect',
            name: '보호조치'
          },
          {
            type: 'api',
            name: 'API'
          },
          {
            type: 'environment',
            name: '개발환경'
          },
          {
            type: 'etc',
            name: '기타'
          },
        ],
        title: '',
        type: '',
        content: '',
        files: []
      }
    },
    methods: {
      writePost: function () {
        if (this.title === "" || this.type === "" || this.content === "") {
          alert("입력하지 않은 칸이 존재 합니다.");
          return;
        } else {
          this.$store.dispatch(CONSTANT.WRITE_POST, {
            title: this.title,
            type: this.type,
            writer: this.writer,
            content: this.content,
            files: this.files
          })
        }
      },
      fileChange: function (e) {
        let eventFile = e.target.files;
        for (let i = 0; i < eventFile.length; i++) {
          this.files.push(e.target.files[i]);
        }
      },
      filesizeFit(size) {
        if (size / 1024 < 1) {
          return (size + "Byte");
        } else {
          return (Math.floor(size / 1024) + "KB");
        }
      },
      removeFile(index){
        this.files.splice(index, 1);
      }
    }
  }

</script>
<style scoped>
  .writeinput__cover {
    margin-top: 50px;
  }

  .columns {
    border-bottom: 1px solid #e0e0e0;
  }

  .columns:first-child {
    border-top: 1px solid #00D1B2;
  }

  .columns .is-2 {
    background-color: rgb(240, 254, 244);
    color: rgb(0, 117, 100);
    font-weight: bold;
    text-align: center;
    line-height: 36px;
  }

  #author .input {
    width: 200px;
  }

  #content .is-2 {
    line-height: 400px;
  }

  #content .textarea {
    resize: none;
    height: 400px;
  }

  .button__group {
    margin-top: 15px;
    margin-bottom: 100px;
  }

  .button__group>* {
    margin-left: 15px;
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

  .delete-tag {
    border-radius: 3px;
    font-size: 10px;
    padding: 3px 7px;
    margin-left: 15px;
    cursor: pointer;
  }

</style>
