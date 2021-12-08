<template>
  <div>
<!--    <el-page-header-->
<!--      icon="el-icon-arrow-left"-->
<!--      content="关于我们"-->
<!--      @back="goBack"-->
<!--    ></el-page-header>-->
    <Back :name="content"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Back from './Back.vue'
export default defineComponent({
  name: "AboutUs",
  components:{
    Back,
  },
  setup() {
    const router = useRouter();
    const content = ref('关于我们')
    const goBack = () => {
      console.log("-1");
      router.back()
    };
    console.log(router);
    return {
      goBack,
      content,
    };
  },
});
</script>

<style scoped lang="stylus"></style>
