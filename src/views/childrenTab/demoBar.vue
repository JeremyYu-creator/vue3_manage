<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { Chart } from "@antv/g2";
import { userData } from "@/api/getUserData";
export default defineComponent({
  name: "demoBar",

  setup() {
    // const data = [
    //   { year: "1951 年", sales: 38 },
    //   { year: "1952 年", sales: 52 },
    //   { year: "1956 年", sales: 61 },
    //   { year: "1957 年", sales: 145 },
    //   { year: "1958 年", sales: 48 },
    //   { year: "1959 年", sales: 38 },
    //   { year: "1960 年", sales: 38 },
    //   { year: "1962 年", sales: 38 },
    // ];
    // onBeforeMount(() => {
    //   getUser();
    // });
    let detail = ref([]);
    const getUser = () => {
      let params = {
        startTime: "123",
      };
      userData(params).then((res) => {
        detail.value = res.data.object;
        const chart = new Chart({
          container: "container",
          autoFit: true,
          height: 500,
        });
        chart.data(detail.value);
        chart.scale("sales", {
          nice: true,
        });
        chart.tooltip({
          showMarkers: false,
        });
        chart.interaction("active-region");
        chart.interval().position("city*count");
        chart.render();
      });
    };
    onMounted(() => {
      getUser();
    });
  },
});
</script>

<style scoped></style>
