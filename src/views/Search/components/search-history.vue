<template>
  <div class="search-history-container">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('delete-all-his')">全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell :title="sh" v-for="(sh, index) in searchHistory" :key="index" @click="onHistoryClick(sh,index)">
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  created() {},
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    onHistoryClick(sh,index){
      if (this.isDeleteShow) {
        this.$emit('delete-history',index)
      }else {
        this.$emit('search',sh)
      }
    }
  },
  computed: {},
  watch: {
  
  },
  filters: {},
  components: {},
};
</script>

<style scoped lang='less'>
</style>
