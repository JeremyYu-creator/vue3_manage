<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { Chart } from "@antv/g2";
import { userData } from "@/api/getUserData";
export default defineComponent({
  name: "demoLine",
  setup() {
    // const data = [
    //   {
    //     year: "1991",
    //     value: 3,
    //   },
    //   {
    //     year: "1992",
    //     value: 4,
    //   },
    //   {
    //     year: "1993",
    //     value: 3.5,
    //   },
    //   {
    //     year: "1994",
    //     value: 5,
    //   },
    //   {
    //     year: "1995",
    //     value: 4.9,
    //   },
    //   {
    //     year: "1996",
    //     value: 6,
    //   },
    //   {
    //     year: "1997",
    //     value: 7,
    //   },
    //   {
    //     year: "1998",
    //     value: 9,
    //   },
    //   {
    //     year: "1999",
    //     value: 13,
    //   },
    // ];
    const cityData = ref([]);
    const getUserInfo = () => {
      const params = {
        startTime: 123,
      };
      userData(params).then((res) => {
        console.log(res)
        cityData.value = res.data.object;
        const chart = new Chart({
          container: "map",
          // forceFit: true,
          autoFit: true,
          // height: window.innerHeight
          height: 500,
        });
        chart.data(cityData.value);
        chart.scale("city", {});
        chart.scale("count", {
          // range: [0, 1],
          min: 0,
        });
        chart.tooltip({
          crosshairs: {
            type: "line",
          },
        });
        chart.line().position("city*count");
        chart.point().position("city*count").size(4).shape("circle").style({
          stroke: "#fff",
          lineWidth: 1,
        });
        chart.render();
      });
    };
    onMounted(() => {
      getUserInfo();
    });
  },
});
</script>

<style scoped></style>
