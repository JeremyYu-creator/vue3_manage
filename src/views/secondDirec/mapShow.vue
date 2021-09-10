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
    <div class="show-predict">
      <el-button type="primary" v-if="nowTag" @click="showHidden(1)"
        >显示实时天气</el-button
      >
      <el-button type="success" v-if="futureTag" @click="showHidden(2)"
        >显示未来一周天气预报</el-button
      >
    </div>
    <div id="map" style="width: 100%; height: 98%"></div>
    <div v-loading="loading" class="loading-style" v-if="tag">
      <!--      <transition name="el-zoom-in-center">-->
      <div class="info">
        <div class="title">
          实时天气
          <div class="close">
            <i class="el-icon-circle-close" @click="closeWeather(1)"></i>
          </div>
        </div>
        <div class="content">
          城市：{{ getInfo.city }}/{{ getInfo.province }}
        </div>
        <div class="content">天气：{{ getInfo.weather }}</div>
        <div class="content">湿度：{{ getInfo.humidity }}</div>
        <div class="content">温度：{{ getInfo.temperature }}</div>
        <div class="content">风向：{{ getInfo.windDirection }}</div>
        <div class="content">风力：{{ getInfo.windPower }}</div>
        <div class="content">当前更新日期：{{ getInfo.reportTime }}</div>
      </div>
      <!--      </transition>-->
    </div>
    <div class="forecast" v-loading="futureLoading" v-if="tagFuture">
      <div class="bgc">
        <div class="title">
          <span>未来四天天气预报</span>
          <div class="updateTime">更新时间：{{ updateTime }}</div>
          <div class="close">
            <i class="el-icon-circle-close" @click="closeWeather(2)"></i>
          </div>
        </div>
        <div
          class="content-style"
          v-for="item in forecastArr"
          :key="item.value"
        >
          <div class="content-week">
            <div class="content-week-item">日期：{{ item.date }}</div>
            <div class="content-week-item">{{ mapLabels[item.week] }}</div>
          </div>
          <div class="content-all">
            <div class="content-item">白天温度：{{ item.dayTemp }}</div>
            <div class="content-item">白天天气：{{ item.dayWeather }}</div>
            <div class="content-item">白天风向：{{ item.dayWindDir }}</div>
            <div class="content-item">白天风力：{{ item.dayWindPower }}</div>
          </div>
          <div class="content-all">
            <div class="content-item">晚间温度：{{ item.nightTemp }}</div>
            <div class="content-item">晚间天气：{{ item.nightWeather }}</div>
            <div class="content-item">晚间风向：{{ item.nightWindDir }}</div>
            <div class="content-item">晚间风力：{{ item.nightWindPower }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="search">
      <div class="block">
        <div class="input-style">
          <el-input v-model="cityName"></el-input>
        </div>
        <span class="cityName">请输入城市名字</span>
      </div>
      <div class="btn">
        <el-button type="primary" size="mini" @click="jumpTo">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { GoogleMap, Marker } from "vue3-google-map";
import { onMounted, ref, onBeforeMount, reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { ElMessage } from "element-plus";

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
    onBeforeMount(() => {
      AMapLoader.load({
        key: "41417da0b45d919952ca225160450a43", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Weather"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: "1.1", // AMapUI 缺省 1.1
          plugins: [], // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: "1.3.2", // Loca 版本，缺省 1.3.2
        },
      })
        .then((AMap) => {
          const map = new AMap.Map("map", {
            zoom: 15, //级别
            center: [116.4929, 39.942], //中心点坐标: 这里可以写成动态获取坐标吗？小程序方面需要获取用户允许才可以拿到位置
            // 上海市区经纬度:(121.43333,34.50000)
            viewMode: "3D", //使用3D视图
          });
          const trafficLayer = new AMap.TileLayer.Traffic({
            // 显示当前路段的交通情况
            zIndex: 10,
          });
          map.add(trafficLayer); //添加图层到地图
          // AMap.plugins("AMap.Weather", function() {
          const weather = new AMap.Weather();
          weather.getLive("北京市", function (err, data) {
            // 获取该城市的当前天气情况
            console.log(err, data);
            getInfo.value = data;
            loading.value = false;
            console.log(getInfo.value);
          });
          weather.getForecast("北京市", function (err, data) {
            // 获取该城市未来的天气状况
            console.log(err, data);
            forecastArr.value = data.forecasts;
            updateTime.value = data.reportTime;
            futureLoading.value = false;
          });
          // if (!cityName.value) {
          //   cityName.value = "北京市"
          // }
          // map.setCity(cityName.value)
          // ElMessage.success(`已跳转到${cityName.value}`)
        })
        .catch((e) => {
          console.log(e);
        });
    });
    let getInfo = ref({}); // 获取当前城市当天天气信息
    let loading = ref(true); // 第一个模块的loading
    let tag = ref(true); // 第一个模块的隐藏
    let forecastArr = ref([]); // 第二个模块的渲染数组
    let futureLoading = ref(true); // 第二个模块的loading
    let updateTime = ref("");
    let nowTag = ref(false);
    let futureTag = ref(false);
    let cityName = ref("");
    const mapLabels = reactive([
      "",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期日",
    ]);
    const show = ref(false);
    let tagFuture = ref(true);
    const closeWeather = (index) => {
      // index === 1 ? (tag.value = false) : (tagFuture.value = false);
      if (index === 1) {
        tag.value = false;
        nowTag.value = true;
      } else {
        tagFuture.value = false;
        futureTag.value = true;
      }
    };
    const showHidden = (index) => {
      if (index === 1) {
        tag.value = true;
        nowTag.value = false;
      } else {
        tagFuture.value = true;
        futureTag.value = false;
      }
    };
    const jumpTo = () => {
      AMapLoader.load({
        key: "41417da0b45d919952ca225160450a43", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Weather"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: "1.1", // AMapUI 缺省 1.1
          plugins: [], // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: "1.3.2", // Loca 版本，缺省 1.3.2
        },
      })
        .then((AMap) => {
          const map = new AMap.Map("map", {
            zoom: 15, //级别
            center: [116.4929, 39.942], //中心点坐标: 这里可以写成动态获取坐标吗？小程序方面需要获取用户允许才可以拿到位置
            // 上海市区经纬度:(121.43333,34.50000)
            viewMode: "3D", //使用3D视图
          });
          const trafficLayer = new AMap.TileLayer.Traffic({
            // 显示当前路段的交通情况
            zIndex: 10,
          });
          map.add(trafficLayer); //添加图层到地图
          // AMap.plugins("AMap.Weather", function() {
          const weather = new AMap.Weather();
          weather.getLive(cityName.value, function (err, data) {
            // 获取该城市的当前天气情况
            console.log(err, data);
            getInfo.value = data;
            loading.value = false;
            console.log(getInfo.value);
          });
          weather.getForecast(cityName.value, function (err, data) {
            // 获取该城市未来的天气状况
            console.log(err, data);
            forecastArr.value = data.forecasts;
            updateTime.value = data.reportTime;
            futureLoading.value = false;
          });
          if (!cityName.value) {
            cityName.value = "北京市"
          }
          map.setCity(cityName.value)
          ElMessage.success(`已跳转到${cityName.value}`)
        })
        .catch((e) => {
          console.log(e);
        });
    }
    onMounted(() => {
      // debugger
      show.value = !show.value;
      showData(); // 这个地方显示不出来是因为上面的函数是异步的，当onBeforeMounted执行完后，会立即执行下方的onMounted,因此只展示出Proxy
    });
    let showData = () => {
      console.log(getInfo);
    };
    return {
      // center,
      show,
      getInfo,
      showData,
      loading,
      tag,
      closeWeather,
      futureLoading,
      forecastArr,
      mapLabels,
      updateTime,
      tagFuture,
      nowTag,
      futureTag,
      showHidden,
      cityName,
      jumpTo,
    };
  },
};
</script>
<style lang="stylus" scoped>
.show-predict
  margin-bottom 1rem
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
  .custom-loading-svg .el-loading-mask > .el-loading-spinner > .circular {
    animation: none;
  }
  .loading-style
    position absolute
    width 15rem
    height 17rem
    background #fff
    display inline-block
    padding 0 0.5rem
    top 30%
    left 30%
    border-radius 4px
    .info
      .title
        padding 0.5rem
        // text-align center
        border-bottom 1px solid black
        display flex
        align-item center
        justify-content space-around
        font-size 0.9rem
        .close
          margin-left 8rem
          cursor pointer
          height 1rem
          line-height 1.4rem
      .content
        margin 1rem
        height 0.7rem
        font-size 0.8rem
  .forecast
    position absolute
    width 25rem
    height 15rem
    background #fff
    display inline-block
    padding 0 0.5rem
    top 25%
    left 70%
    border-radius 4px
    overflow scroll
    .bgc
      .title
        display flex
        align-item center
        border-bottom 1px solid black
        padding 0.5rem
        font-size 1rem
        color #625b57
        justify-content space-around
        // position fixed
        // margin-bottom 1rem
        // height 1rem
        .updateTime
          font-size 0.6rem
          height 1.6rem
          line-height 1.6rem
          color firebrick
        .close
          cursor pointer
          height 1rem
          line-height 1.7rem
      .content-style
        font-size 0.6rem
        padding 0.5rem
        // margin-top 1rem
        .content-week
          color #007fff
          .content-week-item
            font-size 0.8rem
            margin-right 0.5rem
        .content-all, .content-week
          display flex
          align-items center
          //justify-content space-around
          .content-item
            height 0.7rem
            font-size 0.5rem
            margin-right 0.5rem
            margin-bottom 0.5rem
  .search
    position absolute
    top 70%
    right 5%
    background #fff
    width 20rem
    height 6rem
    padding-top 1rem
    .block
      display flex
      justify-content space-around
      align-items center
      .input-style
        width 10rem
      .cityName
        font-size 0.8rem
    .btn
      display flex
      justify-content flex-end
      margin 1rem
</style>
