<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : `暂无回复`
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="scroll-wrap">
      <CommentItem :comment="comment" />
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复"></van-cell>
      <CommentList :source="comment.com_id" type="c" :list="commentList"/>
    </div>
    <div class="post-wrap">
      <van-button size="small" round class="post-btn" @click="isPostShow= true">写评论</van-button>
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom"
      ><CommentPost :target="comment.com_id" @post-success="onPostSuccess"
    /></van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "CommentReply",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  created() {},
  data() {
    return {
      isPostShow:false,
      commentList:[]
    };
  },
  methods: {
    onPostSuccess(data){
      this.comment.reply_count++
      this.isPostShow = false;
      this.commentList.unshift(data.new_obj)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem, CommentList, CommentPost },
};
</script>

<style scoped lang='less'>
.scroll-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 88px;
  overflow-y: auto;
}
.van-nav-bar__title {
  color: #333;
}
.post-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
