<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell
      title="头像"
      class="page-nav-bar"
      is-link
      @click="$refs.file.click()"
    >
      <van-image class="avatar" :src="user.photo" round />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      class="page-nav-bar"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      class="page-nav-bar"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthShow = true"
    />
    <van-popup
      style="height: 100%"
      v-model="isUpdateNameShow"
      position="bottom"
    >
      <UpdateName
        @close="isUpdateNameShow = false"
        v-model="user.name"
        v-if="isUpdateNameShow"
      />
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <UpdateGender
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
        v-if="isUpdateGenderShow"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthShow" position="bottom">
      <UpdateBirth
        @close="isUpdateBirthShow = false"
        v-model="user.birthday"
        v-if="isUpdateBirthShow"
      />
    </van-popup>
    <!-- 编辑头像-->
    <van-popup
      v-model="isUpdateAvatarShow"
      position="bottom"
      style="height: 100%"
    >
      <UpdateAvatar
        @close="isUpdateAvatarShow = false"
        v-if="isUpdateAvatarShow"
        :img="img"
        @avatar="user.photo=$event"
      />
    </van-popup>
  </div>
</template>

<script>
import { httpGetUserProfile } from "../../api/user";
import UpdateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirth from "./components/update-birth.vue";
import UpdateAvatar from "./components/update-avatar.vue";
export default {
  name: "UserProfile",
  created() {
    this.loadUserProfile();
  },
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthShow: false,
      isUpdateAvatarShow: false,
      img: null,
    };
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await httpGetUserProfile();
        this.user = data.data;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0];
      this.img = window.URL.createObjectURL(file);

      this.isUpdateAvatarShow = true;
      this.$refs.file.value = "";
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: { UpdateName, UpdateGender, UpdateBirth, UpdateAvatar },
};
</script>

<style scoped lang='less'>
/deep/.page-nav-bar {
  background-color: #fff !important;
  .van-nav-bar__content {
    background-color: #3296fa !important;
  }
  .van-icon-arrow {
    color: #666 !important;
  }
}
/deep/ .avatar {
  width: 60px;
  height: 60px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
