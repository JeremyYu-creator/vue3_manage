<template>
  <div class="about">
    <Home></Home>
    <h1 class="title">{{ name }}</h1>
    <div class="title">{{ age }}</div>
    <div class="title" @click="showName()">点击我</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, provide, ref } from "vue";
// import Home from "../../src/views/Home.vue";
import Home from "@/views/newDirec/Home.vue";
export default defineComponent({
  components: { Home },
  setup() {
    const person = reactive({ name: "张三", age: 20 });
    const fatherName = ref("父组件传值");
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
    };
  },
});
</script>
<style lang="stylus" scoped>
.title
  text-align center
</style>
