<template>
  <div class="aside-menu">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template #title>第一分组</template>
          <el-menu-item index="1-1" @click="toRoute(messageArr.About)">About</el-menu-item>
          <el-menu-item index="1-2" @click="toRoute(messageArr.HelloWorld)"
            >HelloWorld</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group title="第二分组">
          <el-menu-item index="1-3" @click="toRoute(messageArr.CheckRoute)"
            >CheckRoute</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>导航二</span>
        </template>
        <el-menu-item index="2-1" @click="toRoute(messageArr.MapShow)">查看地图</el-menu-item>
        <el-menu-item index="2-2" @click="toRoute(messageArr.Draw)">绘画图形</el-menu-item>
        <el-menu-item index="2-3" @click="toRoute(messageArr.News)">查看新闻</el-menu-item>
        <el-menu-item index="2-4" @click="toRoute(messageArr.LatestMovie)">查看近期热门电影</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-sub-menu index="4">
        <template #title>
          <i class="el-icon-setting"></i>
          <span>导航四</span>
        </template>
        <el-menu-item index="4-1" @click="toRoute(messageArr.ToFly)">查看动态页</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
  <!--  <div class="router-style">-->
  <!--    <router-view />-->
  <!--  </div>-->
</template>

<script lang="ts">
import { ref } from "vue";
import router from "../../router";
export default {
  name: "Aside",
  setup() {
    const index = ref(0);
    const label = ref(false);
    const isCollapse = ref(false);
    const handleOpen = function (key: any, keyPath: any) {
      console.log(key, keyPath);
    };
    const handleClose = function (key: any, keyPath: any) {
      console.log(key, keyPath);
    };
    const messageArr = {
      About: "About",
      HelloWorld: "HelloWorld",
      CheckRoute: "CheckRoute",
      MapShow: "MapShow",
      ToFly: "ToFly",
      Draw: "Draw",
      News: "News",
      LatestMovie: 'LatestMovie',
    };
    const toRoute = (name: string) => {
      router.push({ name: name });
    };
    return {
      index,
      label,
      isCollapse,
      handleOpen,
      handleClose,
      toRoute,
      messageArr,
    };
  },
};
</script>

<style lang="stylus" scoped>
.aside-menu
  width 200px
  margin-top 20px
.router-style
  margin-left 200px
</style>
