<template>
  <div>
  
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
  
    />
  </div>
</template>

<script>
import { httpUpdateUserProfile } from "../../../api/user";
import dayjs from "dayjs"
export default {
  created() {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
   
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await httpUpdateUserProfile({
          birthday: currentDate,
        });
        this.$emit("input", currentDate);
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
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
