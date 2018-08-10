<template>
  <div class="search__cover has-background-light">
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
        searches: [
          {
            name: '제목',
            value: 'title',
          },
          {
            name: '작성자',
            value: 'writer',
          },
          {
            name: '구분',
            value: 'type'
          }
        ],
        searchOption: "",
        searchInput: "",
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
