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
  import constant from '../../constant'
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
        content: ''
      }
    },
    methods: {
      writePost: function () {
        if (this.title === "" || this.type === "" || this.content === "") {
          alert("입력하지 않은 칸이 존재 합니다.");
          return;
        } else {
          this.$store.dispatch(constant.WRITE_POST, {
            title: this.title,
            type: this.type,
            writer: this.writer,
            content: this.content
          })
        }
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
  }

  .button__group>* {
    margin-left: 15px;
  }

</style>
