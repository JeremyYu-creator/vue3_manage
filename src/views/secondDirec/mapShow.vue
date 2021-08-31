<template>
  <div class="container">
    <transition name="el-zoom-in-center">
      <!--    <GoogleMap-->
      <!--      api-key="AIzaSyB2MdwMkMqH3_th7eNV_nSeAozA86VeM9A"-->
      <!--      style="width: 100%; height: 500px"-->
      <!--      :center="center"-->
      <!--      :zoom="15"-->
      <!--    ></GoogleMap>-->
      <!--    <Marker :options="{position: center}"></Marker>-->
      <!--    <div id="container"></div>-->
      <img
        src="../../../src/assets/none.jpeg"
        class="img-style"
        v-show="show"
      />
    </transition>
<!--    <div class="text">暂无数据</div>-->
  </div>
</template>

<script>
// import { GoogleMap, Marker } from "vue3-google-map";
import { onMounted, ref } from "vue";

export default {
  name: "mapShow",
  // components: {
  //   GoogleMap,
  //   Marker,
  // },
  setup() {
    // const center = { lat: 40.689247, lng: -74.044502 };
    // onMounted(() => {
    //   const map = new BMap.Map('container')
    //   const point = new BMap.Point(116.404, 39.915)
    //   map.centerAndZoom(point, 15)
    //   map.enableScrollWheelZoom(true)
    // })
    const show = ref(false);
    onMounted(() => {
      show.value = !show.value;
    });
    return {
      // center,
      show,
    };
  },
};
</script>
<style lang="stylus" scoped>
.container
  display flex
  justify-content space-around
  .img-style
    width 600px
    height 500px
    -webkit-transition:width 1s, height 1s,
      background-color 1s, -webkit-transform 1s;
    transition:width 1s, height 1s, background-color 1s, transform 1s;
  .img-style:hover
    -webkit-transform:rotate(360deg);
    transform:rotate(360deg);
  .text
    font-size 20px
</style>
