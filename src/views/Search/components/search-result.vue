<template>
  <div class="search-result-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell v-for="result,index in list" :key="index" :title="result.title" />
    </van-list>
  </div>
</template>

<script>
import {httpGetSearchResults} from "@/api/search.js"
export default {
  name: "SearchResult",
  props:{
    searchText:{
      type: String,
      required: true,
    }
  },
  created() {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:20,
      error:false,
      
    };
  },
  methods: {
   async onLoad() {
      try {
        const {data} = await httpGetSearchResults({
          page:this.page,
          per_page:this.per_page,
          q:this.searchText
        })
        const {results} = data.data
        this.list.push(...results)
        this.loading = false
        if(results.length){
          this.page++
        }else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
};
</script>

<style scoped lang='less'>
</style>
