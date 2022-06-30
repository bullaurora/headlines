<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ like: value === 1 }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { httpAddLike, httpCancelLike } from "../../api/article";
export default {
  name: "LikeArticle",
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  created() {},
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        if (this.value!==1) {
          await httpAddLike(this.articleId);
        } else {
          await httpCancelLike(this.articleId);
        }
        this.$emit("input", this.value === 0 ? 1 : 0);
        this.$toast.success(this.value===0 ? "点赞成功" : "取消点赞");
      } catch (error) {
        console.log(error);
        this.$toast.fail("操作失败请重试");
      }
      this.loading = false;
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
};
</script>

<style scoped lang='less'>
.like {
  .van-icon {
    color: #e5645f;
  }
}
</style>
