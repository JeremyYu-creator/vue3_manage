<template>
  <div class="header">
    <!--    <el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--      <el-tab-pane label="柱状图比较" name="1" >-->
    <!--        <DemoBar v-if="activeName === '1'"></DemoBar>-->
    <!--      </el-tab-pane>-->
    <!--      <el-tab-pane label="折线图比较" name="2" >-->
    <!--        <DemoLine v-if="activeName === '2'"></DemoLine>-->
    <!--      </el-tab-pane>-->
    <!--      <el-tab-pane label="地图比较" name="3" >-->
    <!--        <DemoBar v-if="activeName === '3'"></DemoBar>-->
    <!--      </el-tab-pane>-->
    <!--      <el-tab-pane label="饼图比较" name="4">定时任务补偿</el-tab-pane>-->
    <!--    </el-tabs>-->
    <!--  </div>-->
    <div class="titleAll">
      <div @click="goTo(1)" class="title-item">柱状图比较</div>
      <div @click="goTo(2)" class="title-item">折线图比较</div>
      <div @click="goTo(3)" class="title-item">地图比较</div>
      <div @click="goTo(4)" class="title-item">饼图比较</div>
    </div>
    <DemoBar v-if="activeName === '1'"></DemoBar>
    <DemoLine v-if="activeName === '2'"></DemoLine>
    <DemoMap v-if="activeName === '3'"></DemoMap>
    <DemoPie v-if="activeName === '4'"></DemoPie>
  </div>
  <!--  <div class="title">{{ name }}</div>-->
  <!--  <div class="title">{{ age }}</div>-->
  <!--  <div class="showChart">-->
  <!--    <div id="container"></div>-->
  <!--  </div>-->
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import router from "@/router";
import DemoBar from "@/views/childrenTab/demoBar.vue";
import DemoLine from "@/views/childrenTab/demoLine.vue";
import DemoMap from "@/views/childrenTab/demoMap.vue";
import DemoPie from "@/views/childrenTab/demoPie.vue";
// import { Chart } from "@antv/g2";
export default defineComponent({
  name: "checkRoute",
  components: { DemoPie, DemoLine, DemoBar, DemoMap },
  setup() {
    const setIt = reactive({ name: "李四", age: 30 }); /**/
    let activeName = ref("1");
    const editNames = reactive([
      {
        title: "柱状图比较",
        name: "1",
        content: DemoBar,
      },
      {
        title: "折线图比较",
        name: "2",
        content: DemoBar,
      },
      {
        title: "折线图比较",
        name: "3",
        content: DemoBar,
      },
    ]);
    // const handleClick = (tab: any, event: any) => {
    //   activeName = tab.props.name
    //   console.log(tab.props.name, activeName);
    // };
    const goTo = (index: number) => {
      // activeName.value = "2"
      console.log(index);
      if (index === 1) {
        router.push({ name: "DemoBar" });
        activeName.value = "1";
      } else if (index === 2) {
        router.push({ name: "DemoLine" });
        activeName.value = "2";
      } else if (index === 3) {
        activeName.value = "3";
      } else if (index === 4) {
        activeName.value = "4";
      }
    };
    return {
      activeName,
      editNames,
      goTo,
      // handleClick,
      ...toRefs(setIt),
    };
  },
});
</script>
<style lang="stylus">
.showChart
    width 800px
    margin 20px auto 0
.title
  text-align center
.header
  width 800px
  .titleAll
    display flex
    .title-item
      margin 0 20px 20px 0
      border 1px solid #404040
      cursor pointer
      //&:hover
      //  border 1px solid #fff
      &:active
        background red
</style>
