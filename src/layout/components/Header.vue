<template>
  <div>
    <div class="header-style">
      <span>信息查看平台</span>
      <div class="header-right">
        <span class="welcome">欢迎</span>
        <el-dropdown trigger="hover">
          <!--      <span class="el-dropdown-link">-->
          <!--        下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--      </span>-->
          <el-image
            style="width: 60px; height: 50px; border-radius: 10px"
            :src="url"
            :preview-src-list="srcList"
            v-if="isUser"
            lazy
            fit
          >
          </el-image>
          <el-button type="primary" size="medium" v-else>登录</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <div v-for="item in loginNameArr" :key="item.value">
                <el-dropdown-item @click="goto(item.value)">{{
                  item.name
                }}</el-dropdown-item>
                <!--              <el-dropdown-item>狮子头</el-dropdown-item>-->
                <!--              <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                <!--              <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
                <!--              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import userInfo from '@/assets/userInfo.png'
export default defineComponent({
  name: "Header",
  data() {
    return {
      loginNameArr: [
        {
          name: "登出当前账号",
          value: "1",
        },
        {
          name: "设置",
          value: "2",
        },
        {
          name: "更多",
          value: "3",
        },
        {
          name: "关于我们",
          value: "4",
        },
      ],
    };
  },
  setup() {
    const router = useRouter();
    const routeMap = [
      {
        name: "Login",
        index: "1",
      },
      {
        name: "Settings",
        index: "2",
      },
      {
        name: "More",
        index: "3",
      },
      {
        name: "AboutUs",
        index: "4",
      },
    ];
    const isUser = ref(true);
    // 可以通过获取到的cookie值来判断用户是否存在、合法，进而判断展示按钮还是图片
    const goto = (value: string) => {
      // todo:这个地方感觉可以再简化下
      router.push({ name: routeMap[Number(value) - 1].name });
      console.log(value);
    };
    const srcList = ref([userInfo,]);
    const url = userInfo;
    return {
      // loginNameArr,
      goto,
      isUser,
      srcList,
      url,
    };
  },
});
</script>

<style lang="stylus" scoped>
.header-style
  display flex
  justify-content space-between
  align-items center
  .header-right
    display flex
    align-items center
    .welcome
      margin-right 20px
</style>
