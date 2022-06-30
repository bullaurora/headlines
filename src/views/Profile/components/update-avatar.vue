<template>
  <div class="update-avatar">
    <img :src="img" alt="" class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { httpUpdateAvatar } from "../../../api/user";
export default {
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  created() {},
  data() {
    return {
      cropper: null,
    };
  },
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.avatarMethod(blob);
      });
    },
    async avatarMethod(blob) {
        this.$toast.loading({
        message: "保存中",
        forbidClick: true,
        duration: 0,
      });
      const formData = new FormData();

      // Pass the image file name as the third parameter if necessary.
      formData.append("photo", blob);
      try {
        const { data } = await httpUpdateAvatar(formData);
        this.$emit("close");
        this.$emit("avatar", data.data.photo);
        this.$toast.success("更新成功");
      } catch (error) {
         this.$toast.fail("更新失败");
      }
    },
  },
  components: {},
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },
};
</script>

<style scoped lang='less'>
.img {
  max-width: 100%;
  display: block;
}
.update-avatar {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .confirm,
    .cancel {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
