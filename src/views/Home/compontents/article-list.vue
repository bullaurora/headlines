<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article.js";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  created() {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: "刷新成功",
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        const { results } = data.data;

        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        const { results } = data.data;
        this.list.unshift(...results);
        this.isRefreshLoading = false;
        this.refreshSuccessText = `刷新成功更新了${results.length}条数据`;
      } catch (error) {
        this.refreshSuccessText = "刷新失败";
        this.isRefreshLoading = false;
      }
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem },
};
</script>

<style scoped lang='less'>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
