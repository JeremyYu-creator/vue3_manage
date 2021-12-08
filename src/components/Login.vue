<template>
  <div class="main">
    <div class="login-style">
      <el-card>
        <div class="title-style">
          <span class="login-name">登录页面</span>
          <img :src="loginPic" class="icon-style">
        </div>
        <div class="input-style">
          <el-form
            label-width="80px"
            :model="formLabel"
            ref="formRef"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="userAccount">
              <el-input v-model="formLabel.userAccount" clearable>
                <template #prefix>
                  <i class="el-icon-user-solid el-input__icon"> </i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
              <el-input v-model="formLabel.userPassword" show-password clearable>
                <template #prefix>
                  <i class="el-icon-lock el-input__icon" > </i>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="remember-style">
            <el-checkbox v-model="checkedValue" label="记住我" @change="rememberUserInfo"></el-checkbox>
          </div>
        </div>
        <div class="footer-style">
          <el-button type="primary" plain @click="submitForm()">
            确定
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import login from '@/assets/login.png'
import {useRouter} from "vue-router";
export default defineComponent({
  name: "Login",
  setup() {
    const loginPic = login
    const router = useRouter()
    const formLabel = reactive({
      userAccount: "",
      userPassword: "",
    });
    const rules = ref({ // 相关登录检验规则
      userAccount: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
          min: 5,
          max: 10,
          message: "长度在 5 到 10 个字符",
          trigger: "blur",
        },
      ],
      userPassword: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 8,
          max: 15,
          message: "长度在 8 到 15 个字符",
          trigger: "blur",
        },
      ],
    });
    const formRef = ref(null)
    const submitForm = () => {
      (formRef.value as any).validate((valid: boolean) => {
        if (valid) {
          // 这里可以写关于请求接口后的判断逻辑
          router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const checkedValue = ref(false)
    const rememberUserInfo = () => {
      if (checkedValue.value && formLabel.userAccount) { // 后续考虑使用js-cookie存储
        sessionStorage.setItem('userAccount', formLabel.userAccount)
        sessionStorage.setItem('userPassword', formLabel.userPassword)
        sessionStorage.setItem('isRemember', String(checkedValue.value))
        console.log(sessionStorage)
      } else {
        sessionStorage.clear()
      }
    }
    console.log(localStorage)
    checkedValue.value = Boolean(sessionStorage.getItem('isRemember'))
    formLabel.userAccount = sessionStorage.getItem('userAccount') || ''
    formLabel.userPassword = sessionStorage.getItem('userPassword') || ''
    return {
      formLabel,
      rules,
      submitForm,
      formRef,
      loginPic,
      checkedValue,
      rememberUserInfo,
    };
  },
});
</script>

<style scoped lang="stylus">
.main
  display flex
  justify-content center
  align-items center
  height 600px
  .login-style
    width 500px
    .title-style
      display flex
      justify-content space-between
      align-items center
      .login-name
        font-size 20px
      .icon-style
        width 108px
        height 108px
    .input-style
      margin 20px auto
      .remember-style
        margin-left 80px
    .footer-style
        display flex
        justify-content flex-end
</style>
