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
      <div v-for="item in editNames" :key="item.value">
        <div
          @click="goTo(item.name)"
          :class="[item.isActive ? 'title-item-active' : 'title-item']"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <DemoBar v-if="activeName === '1'" :detail="detail"></DemoBar>
    <DemoLine v-if="activeName === '2'"></DemoLine>
    <DemoMap v-if="activeName === '3'"></DemoMap>
    <DemoPie v-if="activeName === '4'"></DemoPie>
    <DemoG2Map v-if="activeName === '5'"></DemoG2Map>
  </div>
  <!--  <div class="title">{{ name }}</div>-->
  <!--  <div class="title">{{ age }}</div>-->
  <!--  <div class="showChart">-->
  <!--    <div id="container"></div>-->
  <!--  </div>-->
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { userData } from "@/api/getUserData";
import router from "@/router";
import DemoBar from "@/views/childrenTab/demoBar.vue";
import DemoLine from "@/views/childrenTab/demoLine.vue";
import DemoMap from "@/views/childrenTab/demoMap.vue";
import DemoPie from "@/views/childrenTab/demoPie.vue";
import DemoG2Map from "@/views/childrenTab/demoG2Map.vue";
// import { Chart } from "@antv/g2";
export default defineComponent({
  name: "checkRoute",
  components: { DemoG2Map, DemoPie, DemoLine, DemoBar, DemoMap },
  setup() {
    const setIt = reactive({ name: "李四", age: 30 }); /**/
    let activeName = ref("1");
    const editNames = reactive([
      {
        title: "柱状图比较",
        name: 1,
        isActive: true,
      },
      {
        title: "折线图比较",
        name: 2,
        isActive: false,
      },
      {
        title: "地图比较",
        name: 3,
        isActive: false,
      },
      {
        title: "饼图比较",
        name: 4,
        isActive: false,
      },
      {
        title: "钻取地图比较",
        name: 5,
        isActive: false,
      },
    ]);
    let isActive = ref(true);
    // const handleClick = (tab: any, event: any) => {
    //   activeName = tab.props.name
    //   console.log(tab.props.name, activeName);
    // };
    onMounted(() => {
      getUser();
    });
    let detail = reactive([]);
    const getUser = () => {
      let params = {
        startTime: "123",
      };
      userData(params).then((res: any) => {
        detail = res.object;
        // console.log(detail)
      });
    };
    const mapLabels = ["", "DemoBar", "DemoLine", "DemoMap", "DemoPie"];
    const goTo = (index: number) => {
      // activeName.value = "2"
      editNames.forEach((item: Record<string, unknown>) => {
        item.isActive = item.name === index ? true : false;
      });
      activeName.value = String(index);
      router.push({ name: mapLabels[index] });
      // if (index === 1) {
      //   router.push({ name: "DemoBar" });
      //   activeName.value = "1";
      //   item.isActive = true;
      // } else if (index === 2) {
      //   router.push({ name: "DemoLine" });
      //   activeName.value = "2";
      //   item.isActive = true;
      // } else if (index === 3) {
      //   activeName.value = "3";
      //   item.isActive = true;
      // } else if (index === 4) {
      //   activeName.value = "4";
      //   item.isActive = true;
      // }
    };
    return {
      activeName,
      editNames,
      goTo,
      detail,
      isActive,
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
    .title-item-active
      margin 0 20px 20px 0
      border 1px solid #404040
      cursor pointer
      background bisque
</style>
