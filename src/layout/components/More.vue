<template>
  <div>
      <Back :name="content"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Back from './Back.vue'
export default defineComponent({
  name: "More",
  components: {
    Back,
  },
  setup() {
    const content = '更多'
    return {
      content
    }
  }
});
</script>

<style scoped>

</style>
