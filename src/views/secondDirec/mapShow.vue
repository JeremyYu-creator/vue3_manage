<template>
  <div class="container">
<!--    <transition name="el-zoom-in-center">-->
<!--      &lt;!&ndash;    <GoogleMap&ndash;&gt;-->
<!--      &lt;!&ndash;      api-key="AIzaSyB2MdwMkMqH3_th7eNV_nSeAozA86VeM9A"&ndash;&gt;-->
<!--      &lt;!&ndash;      style="width: 100%; height: 500px"&ndash;&gt;-->
<!--      &lt;!&ndash;      :center="center"&ndash;&gt;-->
<!--      &lt;!&ndash;      :zoom="15"&ndash;&gt;-->
<!--      &lt;!&ndash;    ></GoogleMap>&ndash;&gt;-->
<!--      &lt;!&ndash;    <Marker :options="{position: center}"></Marker>&ndash;&gt;-->
<!--      &lt;!&ndash;    <div id="container"></div>&ndash;&gt;-->
<!--      <img-->
<!--        src="../../../src/assets/none.jpeg"-->
<!--        class="img-style"-->
<!--        v-show="show"-->
<!--      />-->
<!--    </transition>-->
<!--    <div class="text">暂无数据</div>-->
    <div id="map" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
// import { GoogleMap, Marker } from "vue3-google-map";
import { onMounted, ref } from "vue";
import AMapLoader from '@amap/amap-jsapi-loader';

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
    AMapLoader.load({
      "key": "34d9a2f92af5209fddc9fafce24a233c",                                          // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "1.4.15",                                // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],                                      // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      "AMapUI": {                                         // 是否加载 AMapUI，缺省不加载
        "version": '1.1',                               // AMapUI 缺省 1.1
        "plugins":[],                                   // 需要加载的 AMapUI ui插件
      },
      "Loca":{                                            // 是否加载 Loca， 缺省不加载
        "version": '1.3.2'                              // Loca 版本，缺省 1.3.2
      },
    }).then((AMap)=>{
      const map = new AMap.Map('map', {
        zoom:40,                                        //级别
        center: [116.483989,39.924987],                 //中心点坐标
        // 上海市区经纬度:(121.43333,34.50000)
        viewMode:'3D'                                   //使用3D视图
      });
    }).catch(e => {
      console.log(e);
    })
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
  //display flex
  //justify-content space-around
  width 1374px
  height 700px
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
