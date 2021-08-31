<template>
  <div class="aside-menu">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1-3"
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
          <el-menu-item index="1-1" @click="toAbout">About</el-menu-item>
          <el-menu-item index="1-2" @click="toHelloWorld"
            >HelloWorld</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group title="第二分组">
          <el-menu-item index="1-3" @click="toCheckRoute">CheckRoute</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>导航二</span>
        </template>
        <el-menu-item index="2-1" @click="toMap">查看地图</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
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
    // const getList = [
    //   {
    //     index: "/",
    //     name: "首页",
    //     show: true,
    //     isShow: true,
    //     children: [
    //       {
    //         index: "/home",
    //         name: "内容展示",
    //
    //       }
    //     ]
    //   }
    // ]
    const toAbout = () => {
      router.push({ name: "About", query: { id: 123 } });
    };
    const toHelloWorld = () => {
      router.push({ name: "HelloWorld", query: { id: 456 } });
    };
    const toCheckRoute = () => {
      router.push({ name: "CheckRoute", query: { id: 789 } });
    };
    const toMap = () => {
      router.push({name: "MapShow", query: {date: "k"}})
    }
    return {
      index,
      label,
      isCollapse,
      handleOpen,
      handleClose,
      toAbout,
      toHelloWorld,
      toCheckRoute,
      toMap,
    };
  },
};
</script>

<style lang="stylus" scoped>
.aside-menu
  width 300px
  margin-top 20px
.router-style
  margin-left 200px
</style>
