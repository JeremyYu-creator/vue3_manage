<template>
  <div>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <Aside />
        <el-main>
          <div style="margin-top: 30px">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";

export default {
  name: "index",
  components: {
    Aside,
    Header,
  },
};
</script>

<style lang="stylus" scoped>
.el-header, .el-footer {
  background-color: #232323;
  color: #fff;
  line-height: 60px;
}

.el-header {
  padding: 0 40px 0 30px;
}

.el-container
  min-height: calc(100vh - 60px);
  .el-menu
    background-color rgba(0,0,0, .0)
  >.el-aside
    background-color rgba(0,0,0, .0)
  >.el-main
    max-width: 1374px;
    margin: 0 auto;
    padding 19px 0
</style>
