<template>
  <div>
    <el-page-header
      icon="el-icon-arrow-left"
      :content="name"
      @back="goBack"
    ></el-page-header>
  </div>
</template>

<script lang="ts">
import { defineComponent,} from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Back",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    // const content = ref("");
    const router = useRouter();
    const goBack = () => {
      console.log("-1");
      router.back();
    };
    console.log(router);
    return {
      goBack,
    };
  },
});
</script>

<style scoped></style>
