<template>
  <div class="list__cover">
    <table class="table is-fullwidth">
      <colgroup>
        <col style="width:10%">
        <col style="width:15%">
        <col style="width:50%">
        <col style="width:10%">
        <col style="width:15%">
      </colgroup>
      <thead class="has-background-primary">
        <tr>
          <th>번호</th>
          <th>구분</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in pagenatedData" @click="gotoView(list.index)" :key="list.index">
          <td>{{list.index}}</td>
          <td>{{typeMatch(list.type)}}</td>
          <td class="td__title">{{list.title}}</td>
          <td>{{list.writer}}</td>
          <td>{{list.created}}</td>
        </tr>
      </tbody>
    </table>
    <div class="paginate">
      <button :disabled="pageNum === 0" @click="prevPage" class="button">이전</button>
      <span class="page__count">{{ pageNum + 1}} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="button">다음</button>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex';
  export default {
    name: 'List',
    props: ["posts"],
    data() {
      return {
        pageNum: 0,
        postList: [],
        searchOption: '',
        searchInput: ''
      }
    },
    methods: {
      nextPage() {
        this.pageNum++;
      },
      prevPage() {
        this.pageNum--;
      },
      gotoView(postIndex) {
        this.$router.push({
          name: "Show",
          params: {
            postIndex: postIndex
          }
        });
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
      searchedList(option, input) {
        if (option === "" || input === "") {
          this.postList = this.posts;
          return;
        } else {
          this.filteredList(option, input);
        }
      },
      filteredList(option, input) {
        let searchArray = [];
        for (let i = 0; i < this.posts.length; i++) {
          let typeOption = this.posts[i][option];
          if (option == "type") {
            typeOption = this.typeMatch(typeOption);
          }
          if (typeOption.indexOf(input) != -1) {
            searchArray.push(this.posts[i])
          }
        }
        if (searchArray.length == 0) {
          this.postList = this.posts;
        }
        this.postList = searchArray;
      }
    },
    computed: {
      pageCount() {
        let page = Math.floor(this.postList.length / 10);
        return ((this.postList.length % 10) > 0) ? page + 1 : page;
      },
      pagenatedData() {
        if (this.postList.length == 0) {
          this.postList = this.posts;
        }
        const start = this.pageNum * 10,
          end = start + 10;
        return this.postList.slice(start, end);
      }
    },
    created() {
      this.$EventBus.$on('searchInput', (search) => {
        this.searchedList(search.searchOption, search.searchInput);
      });
      this.$EventBus.$on('searchOption', (search) => {
        this.searchedList(search.searchOption, search.searchInput);
      });
    }
  }

</script>
<style scoped>
  thead {
    border-top: 1px solid rgb(0, 129, 110);
  }

  th {
    text-align: center;
    color: #fff !important;
  }

  td {
    text-align: center;
  }

  td.td__title {
    text-align: left;
  }

  tbody tr:last-child {
    border-bottom: 1px solid #7a7a7a;
  }

  .paginate {
    margin-top: 30px;
    margin-bottom: 90px;
    text-align: center;
    line-height: 35px;
  }

  .paginate>* {
    margin: 0px 10px;
  }

</style>
