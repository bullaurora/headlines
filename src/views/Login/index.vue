<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登陆" >
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            v-else
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user.js";
export default {
  created() {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          {
            pattern: /1[3|5|7|8]\d{9}/,
            message: "手机号格式错误",
          },
        ],
        code: [
          { required: true, message: "请填写用户名" },
          {
            pattern: /\d{6}/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false,
    };
  },
  methods: {
    async onSubmit() {
      const { user } = this;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const {data} = await login(user);
        this.$store.commit('setUser',data.data);
        this.$toast.success("登陆成功");
        this.$router.back();
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登陆失败,请稍后重试");
        }
      }
    },
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (error) {
        return console.log(error);
      }
      this.isCountDownShow = true;
      try {
        await sendSms(this.user.mobile);
       this.$toast("发送成功") 
      } catch (error) {
        this.isCountDownShow = false;
        if (error.response.status === 429) {
          this.$toast("发送太频繁，请稍后再试");
        }else {
          this.$toast("发送失败，请稍后再试");
        }
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
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
