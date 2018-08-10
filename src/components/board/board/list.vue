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
    props: ['posts'],
    data() {
      return {
        pageNum: 0,
        filteredArray: []
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
          name: "View",
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
      filteredList(type) {
        console.log("hello");
        let filteredArray = [];
        if (type == "all") {
          this.filteredArray = [];
          this.filteredArray = this.posts;
        } else {
          for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].type == type) {
              filteredArray.push(this.posts[i]);
            }
          }
          this.filteredArray = [];
          this.filteredArray = filteredArray;
        }
      },
    },
    computed: {
      pageCount() {
        let page = Math.floor(this.filteredArray.length / 10);
        return ((this.filteredArray.length % 10) > 0) ? page + 1 : page;
      },
      pagenatedData() {
        const start = this.pageNum * 10,
          end = start + 10;
        return this.filteredArray.slice(start, end);
      }
    },
    created() {
      this.$EventBus.$on('changeType', (type) => {
        this.filteredList(type);
      });
      this.$EventBus.$on('searchInput', (search) => {
        this.filteredList(search.searchOption, search.searchInput);
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
