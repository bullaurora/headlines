<template>
  <van-button
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    v-if="isFollowed"
    :loading="loading"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    v-else
    :loading="loading"
    >已关注</van-button
  >
</template>

<script>
import { httpAddFollow, httpCancelFollow } from "@/api/user.js";
export default {
  name: "FollowUser",
  model: {
    prop: "isFollowed",
    event: "update-is_followed",
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
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
    async onFollow() {
      this.loading = true;
      try {
        if (!this.isFollowed) {
          const { data } = await httpAddFollow(this.userId);
          console.log(data);
        } else {
          const { data } = await httpCancelFollow(this.userId);
          console.log(data);
        }
        this.$emit("update-is_followed", !this.isFollowed);
      } catch (error) {
        let msg = "操作失败请重试";
        if (error.response && error.response.status === 400) {
          msg = "你不能关注你自己";
        }
        this.$toast(msg);
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
</style>
