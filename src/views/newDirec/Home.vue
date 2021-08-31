<template>
  <div class="home">
    <div class="img-style">
      <img alt="Vue logo" src="../../assets/logo.png" />
    </div>
    <div class="father-show">{{ fatherName }}</div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  // components: {
  //   HelloWorld,
  // },
  setup() {
    const fatherName = inject("fatherName");
    // console.log(fatherName);
    const tableData = [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ];
    return {
      fatherName,
      tableData,
    };
  },
});
</script>
<style lang="stylus">
.table
  margin 20px auto
  width 800px
.img-style
  // margin 20px auto
  text-align center
.father-show
  text-align center
</style>
