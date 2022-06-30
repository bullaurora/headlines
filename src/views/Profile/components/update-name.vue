<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称 "
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import {httpUpdateUserProfile} from '../../../api/user'
export default {
  name: "UpdateName",
  created() {},
  props:{
    value:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value,
    };
  },
  methods: {
    async onConfirm (){
      this.$toast.loading({
        message: "保存中",
        forbidClick: true,
        duration:0
      })
      try {
        if(!this.localName.length) return this.$toast('昵称不能为空')
         await httpUpdateUserProfile({
          name: this.localName
        })
        this.$emit('input',this.localName)
        this.$emit('close')
         this.$toast.fail('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
};
</script>

<style scoped lang='less'>
.field-wrap {
  padding:20px;
}
</style>
