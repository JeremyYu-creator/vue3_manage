<template>
  <div>{{ name }}</div>
  <div>{{ age }}</div>

  <div class="showChart">
    <div id="container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { Chart } from "@antv/g2";
export default defineComponent({
  name: "checkRoute",
  setup() {
    const setIt = reactive({ name: "李四", age: 30 }); /**/
    const data = [
      { year: "1951 年", sales: 38 },
      { year: "1952 年", sales: 52 },
      { year: "1956 年", sales: 61 },
      { year: "1957 年", sales: 145 },
      { year: "1958 年", sales: 48 },
      { year: "1959 年", sales: 38 },
      { year: "1960 年", sales: 38 },
      { year: "1962 年", sales: 38 },
    ];
    onMounted(() => {
      const chart = new Chart({
        container: "container",
        autoFit: true,
        height: 500,
      });
      chart.data(data);
      chart.scale("sales", {
        nice: true,
      });
      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction("active-region");
      chart.interval().position("year*sales");
      chart.render();
    });

    return {
      ...toRefs(setIt),
    };
  },
});
</script>
<style lang="stylus">
.showChart
    width 800px
    margin 20px auto 0
</style>
