<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { httpUpdateUserProfile } from "../../../api/user";
export default {
  created() {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: 0,
    };
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中",
        forbidClick: true,
        duration: 0,
      });
      try {
       
        await httpUpdateUserProfile({
          gender: this.localGender,
        });
        this.$emit("input", this.localGender);
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
    onChange(picker, value, index) {
      this.localGender = index;
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
