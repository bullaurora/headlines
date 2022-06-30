<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
  >
    <CommentItem
      v-for="(comment, index) in list"
      :key="index"
      :comment="comment"
      
    />
  </van-list>
</template>

<script>
import { httpGetComments } from "@/api/comment";
import CommentItem from "@/views/Article/components/comment-item";
export default {
  name: "CommentList",
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list:{
      type:Array,
      default:()=>[]
    },
    type:{
      type:String,
      validator(value){
        return ['a','c'].includes(value)
      },
      default:'a'
    }
  },
  created() {
    this.loading = true;
    this.onLoad();
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await httpGetComments({
          limit: this.limit,
          offset: this.offset,
          source: this.source,
          type: this.type,
        });

        const { results } = data.data;
        this.$emit("total-count", data.data);
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem },
};
</script>

<style scoped lang='less'>
</style>
