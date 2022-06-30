<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { httpAddCollect, httpCancelCollect } from "../../api/article";
export default {
  name: "CollectArticle",
  props: {
    value: {
      type: Boolean,
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
        if (this.value) {
         await httpCancelCollect(this.articleId);
         
        } else {
         await httpAddCollect(this.articleId);
      
        }
        this.$emit('input',!this.value)
        this.$toast.success(!this.value?'收藏成功':'取消收藏')
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
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
