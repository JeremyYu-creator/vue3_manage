<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">VUE3 MANAGER</h1>
        <h2>当前页面丢失了</h2>
        <h6>去别处看看吧</h6>
      </el-col>
      <el-col :span="12">
        <img
          src="../../assets/401.gif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
// import imgs from "../../assets/404.png";
// import { ref } from "vue";
export default {
  name: "401",
  setup() {
    // const img = ref(`${imgs}?${new Date()}`);
    // return {
    //   img
    // };
  }
};
</script>

<style lang="stylus" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
