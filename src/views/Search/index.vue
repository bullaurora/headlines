<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow = false"
      />
    </form>
    <SearchResult v-if="isResultShow" :searchText="searchText" />
    <SearchSuggestion
      @search="clickSearch"
      v-else-if="searchText"
      :searchText="searchText"
    />
    <SearchHistory
      v-else
      :searchHistory="searchHistory"
      @delete-history="searchHistory.splice($event, 1)"
      @delete-all-his="searchHistory = []"
      @search="clickSearch"
    />
  </div>
</template>

<script>
import { SearchResult, SearchHistory, SearchSuggestion } from "./components";
import {setItem,getItem} from "../../utils/storage"
export default {
  name: "SearchIndex",
  created() {},
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistory: getItem('SEARCH-HISTORY')||[],
    };
  },
  methods: {
    onSearch() {
      const index = this.searchHistory.indexOf(this.searchText);
      if (index !== -1) this.searchHistory.splice(index, 1);
      this.searchHistory.unshift(this.searchText);
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
    clickSearch(sugg) {
      this.searchText = sugg;
      this.onSearch();
    },
  },
  computed: {},
  watch: {
      searchHistory(value){
      setItem('SEARCH-HISTORY',value)
    }
  },
  filters: {},
  components: { SearchResult, SearchHistory, SearchSuggestion },
};
</script>

<style scoped lang='less'>
.search-container {
  padding-top: 108px;
  /deep/ .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
