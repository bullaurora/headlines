<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title" :border="false" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="index"
        class="gird-item"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(channel.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell>
      <div slot="title" :border="false" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(recommendChannel, index) in recommendChannels"
        :key="index"
        text="文字"
        icon="plus"
        class="gird-item add-item"
        @click="onAddChannel(recommendChannel)"
      >
        <span slot="text" class="text">{{
          recommendChannel.name
        }}</span></van-grid-item
      >
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  httpDeleteUserChannel,
} from "@/api/channel.js";
import { mapState } from "vuex";
import { setItem } from "../../../utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.loadAllChannels();
  },
  data() {
    return {
      allChannels: [],
      isEdit: false, //控制编辑状态的显示
      fiexChannels: [0],
    };
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
    async onAddChannel(recommendChannel) {
      if (!this.isEdit) return;
      this.$emit("edit-channels", recommendChannel);
      if (this.user) {
        try {
          const { data } = await addUserChannel({
            id: recommendChannel.id,
            seq: this.myChannels.length,
          });
          console.log(data);
        } catch (error) {
          this.$toast("保存失败，请稍后重试");
        }
      } else {
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    onMyChannelClick(channel, index) {
      if (this.fiexChannels.includes(channel.id)) return;
      if (this.isEdit) {
        this.$emit("delete-active", index);
        this.deleteChannels(channel);
      } else {
        this.$emit("change-active", index);
      }
    },
    async deleteChannels(channel) {
      try {
        if (this.user) {
        await  httpDeleteUserChannel(channel.id);
        } else {
          setItem("TOUTIAO_CHANNELS", this.myChannels);
        }
      } catch (error) {
        this.$toast("删除失败，请稍后重试");
      }
    },
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(
        (allChannel) =>
          this.myChannels.findIndex(
            (myChannel) => myChannel.id === allChannel.id
          ) == -1
      );
    },
    ...mapState(["user"]),
  },
  watch: {},
  filters: {},
  components: {},
};
</script>

<style scoped lang='less'>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .gird-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .add-item {
    .van-grid-item__content {
      flex-direction: row !important;
    }
    .van-icon-plus {
      font-size: 28px;
      margin-right: 6px;
    }
  }
  /deep/ .my-grid {
    .gird-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}
</style>
