<template>
  <div>
    <Back :name="content"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Back from './Back.vue'
export default defineComponent({
  name: "Settings",
  components: {
    Back
  },
  setup() {
    const content = "设置"
    return {
      content,
    }
  }
});
</script>

<style scoped lang="stylus">

</style>
