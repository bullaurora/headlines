<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 评价列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
        ><ArticleList :channel="channel"
      /></van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
      ><ChannelEdit
        :my-channels="channels"
        :active="active"
        @edit-channels="channels.push($event)"
        @change-active="changeActive"
        @delete-active="deleteActive"
    /></van-popup>
    <!-- 频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user.js";
import ArticleList from "./compontents/article-list.vue";
import ChannelEdit from "./compontents/channel-edit.vue";
import {mapState} from "vuex";
import { getItem } from '../../utils/storage';
export default {
  name: "HomeIndex",
  created() {
    this.loadChannels();
  },
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false, //控制编辑频道弹出层的状态
    };
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels();
        this.channels =this.user||!getItem('TOUTIAO_CHANNELS')? data.data.channels:getItem('TOUTIAO_CHANNELS')
      } catch (error) {
        this.$toast("获取频道数据失败");
      }
    },
    changeActive(index) {
      this.active = index;
      this.isChannelEditShow = false;
    },
    deleteActive(index){
      if (index<=this.active ) this.active--
      
      this.channels.splice(index,1)
    }
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  filters: {},
  components: { ArticleList, ChannelEdit },
};
</script>

<style scoped lang='less'>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
      z-index: 1;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      justify-content: center;
      align-items: center;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      background-color: #fff;
      opacity: 0.92;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        position: absolute;
        left: 0;
        content: "";
        width: 10px;
        height: 100%;
        width: 1px;
        background-image: url("@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
}
</style>
