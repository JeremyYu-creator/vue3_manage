<template>
  <div class="about">
    <div class="btn-combine">
      <el-button @click="controllTable">{{
        isShow ? "收起" : "展开"
      }}</el-button>
      <el-button>筛选(未完成)</el-button>
    </div>
    <Home v-show="isShow"></Home>
    <h1 class="title">{{ name }}</h1>
    <div class="title">{{ age }}</div>
    <div class="title" @click="showName()">点击我</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, provide, ref } from "vue";
import Home from "@/views/newDirec/Home.vue";
export default defineComponent({
  components: { Home },
  setup() {
    const person = reactive({ name: "张三", age: 20 });
    const fatherName = ref("父组件传值");
    const isShow = ref(true);
    const controllTable = () => {
      isShow.value = !isShow.value;
    };
    // console.log(fatherName.value);
    // console.log(person);
    provide("fatherName", fatherName.value);
    setTimeout(() => {
      person.age++;
    }, 2000);
    // function showName() {
    //   console.log(`我是${person.name}`);
    // }
    const showName = function () {
      console.log(`我是${person.name}`);
    };
    watch(
      () => person.age,
      (curAge, preAge) => {
        console.log("new", curAge, "old", preAge);
      },
      { immediate: true }
    );
    return {
      // person,
      ...toRefs(person),
      showName,
      fatherName,
      isShow,
      controllTable,
    };
  },
});
</script>
<style lang="stylus" scoped>
.about
  .btn-combine
    display flex
    justify-content flex-end
  .title
    text-align center
</style>
