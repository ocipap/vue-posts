<template>
  <div class="search__cover has-background-light">
    <div class="columns">
      <div class="column is-1 has-text-right search__header">구분</div>
      <div class="column search__option__content">
        <input type="radio" name="typeValue" id="all" v-model="typeValue" value="all">
        <label id="all_label" for="all" class="button">
          <span class="icon">
            <i class="fas fa-check-circle"></i>
          </span>
          <span>전체</span>
        </label>

        <span v-for="(type, index) in types" :key="index">
          <input type="radio" v-model="typeValue" name="typeValue" :value="type.type" :id="type.type">
          <label :id="type.type+'_label'" :for="type.type" class="button">
            <span class="icon">
              <i class="fas fa-check-circle"></i>
            </span>
            <span>{{type.name}}</span>
          </label>

        </span>
      </div>
    </div>
    <div class="columns">
      <div class="column is-1 has-text-right search__header">검색어</div>
      <div class="column search__input__content is-clearfix">
        <div class="select is-pulled-left">
          <select name="search" id="" v-model="searchOption">
            <option value="" selected disabled hidden>Choose here</option>
            <option v-for="(search, index) in searches" :key="index" :value="search.value" >{{search.name}}</option>
          </select>
        </div>
        <div class="is-pulled-left search__input__cover">
          <input v-model="searchInput" class="input" type="text" placeholder="Text input">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import constant from '../../../constant'
  export default {
    data: function () {
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
        searches: [
          {
            name: '제목',
            value: 'title',
          },
          {
            name: '작성자',
            value: 'author',
          }
        ],
        typeValue: "",
        searchOption: "",
        searchInput: ""
      }
    },
    watch: {
      typeValue: function () {
        this.$EventBus.$emit('changeType', this.typeValue);
      },
      searchInput: function(){
        this.$EventBus.$emit('searchInput', {searchOption: this.searchOption,searchInput: this.searchInput})
      },
      searchOption: function(){
        this.$EventBus.$emit('searchOption', {searchOption: this.searchOption,searchInput: this.searchInput})
      }
    }
  }

</script>
<style scoped>
  .search__header {
    line-height: 36px;
  }

  .search__option__content>* {
    display: inline-block;
    margin: 0px 15px;
  }

  .search__option__content input[type="radio"] {
    display: none;
  }

  .search__option__content>*>label {
    display: inline-block;
  }

  .search__input__content>* {
    margin: 0px 15px;
  }

  .search__option__content input[type="radio"] + label {
    background-color: #fff;
    color: #555;
  }

  .search__option__content input[type="radio"]:checked + label{
    color: #fff;
    background-color: #555;
  }

  .search__input__cover {
    width: 600px;
  }

</style>
