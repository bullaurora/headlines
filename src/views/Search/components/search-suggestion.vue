<template>
  <div class="search-suggestion-container">
    <van-cell icon="search" v-for="(sugg, index) in suggestions" :key="index"
    @click="$emit('search',sugg)"
      ><div slot="title" v-html="highlight(sugg)"></div>
    </van-cell>
  </div>
</template>

<script>
import { httpGetSearchSuggestions } from "../../../api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  created() {},
  data() {
    return {
      suggestions: [],
    };
  },
  methods: {
    async loadSearchSuggestions() {
      try {
        const { data } = await httpGetSearchSuggestions({
          q: this.searchText,
        });
        this.suggestions = data.data.options;
      } catch (error) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
    highlight(sugg){
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText,'gi')
      return sugg?.replace(reg,highlightStr)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function () {
        this.loadSearchSuggestions();
      }, 200),
      immediate: true,
    },
  },
  filters: {},
  components: {},
};
</script>

<style scoped lang='less'>
.search-suggestion-container {
 /deep/ span.active {
    color:#3296fa;
  }
}
</style>
