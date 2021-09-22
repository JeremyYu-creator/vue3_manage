<template>
  <div class="container">
    <div class="show-predict">
      <el-button
        type="primary"
        v-if="nowTag"
        @click="showHidden(1)"
        v-loading="loading"
        >显示实时天气</el-button
      >
      <el-button
        type="success"
        v-if="futureTag"
        @click="showHidden(2)"
        v-loading="loading"
        >显示未来一周天气预报</el-button
      >
      <el-button
        type="primary"
        v-if="searchCityTag"
        @click="showHidden(3)"
        v-loading="loading"
        >显示搜索城市框</el-button
      >
      <el-button
        type="success"
        v-if="tagPlace"
        @click="showHidden(4)"
        v-loading="loading"
        >显示搜索具体位置</el-button
      >
      <el-button
        type="primary"
        v-if="searchDriving"
        @click="showHidden(5)"
        v-loading="loading"
        >显示设定路线框</el-button
      >
    </div>
    <div id="map" style="width: 100%; height: 98%"></div>
    <div v-loading="loading" class="loading-style" v-if="tag">
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
    <div class="search" v-loading="loading" v-if="tagSearchCity">
      <div class="block">
        <span class="cityName">请输入城市名字</span>
        <div class="input-style">
          <el-input v-model="cityName"></el-input>
        </div>
        <div class="close">
          <i class="el-icon-circle-close" @click="closeWeather(3)"></i>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" size="mini" @click="jumpTo">确定</el-button>
      </div>
    </div>
    <div class="searchPlace" v-if="placeTag">
      <div class="title">
        <div class="close">搜索位置</div>
        <i class="el-icon-circle-close" @click="closeWeather(4)"></i>
      </div>
      <div class="block-place">
        <div class="input-place">
          <el-input v-model="aimPlace" id="tipinput"></el-input>
        </div>
        <el-button @click="searchPlace" type="primary" plain>搜索</el-button>
      </div>
    </div>
    <div class="route" v-if="drivingTag">
      <el-card>
        <div class="title">
          <div>规划路线</div>
          <div class="close">
            <i class="el-icon-circle-close" @click="closeWeather(5)"></i>
          </div>
        </div>
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane
            :name="item.index"
            v-for="(item, index) in tabLabels"
            :key="index"
          >
            <template #label>
              <span>
                <!--                <el-icon>-->
                <!--                  <bicycle />-->
                <!--                </el-icon>-->
                <i :class="item.icon"></i>
                {{ item.name }}
              </span>
            </template>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="divRef"
              label-width="5rem"
              class="demo-ruleForm"
            >
              <el-form-item label="所在城市" prop="provinceValue">
                <el-input v-model="ruleForm.provinceValue"></el-input>
              </el-form-item>
              <el-form-item label="出发地点" prop="wantPlaceStartValue">
                <el-input v-model="ruleForm.wantPlaceStartValue"></el-input>
              </el-form-item>
              <el-form-item label="目标地点" prop="wantPlaceEndValue">
                <el-input v-model="ruleForm.wantPlaceEndValue"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn-route">
              <el-button type="primary" @click="submitForm(item.index)"
                >搜索</el-button
              >
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <div id="panel"></div>
  </div>
</template>

<script lang="ts">
// import { GoogleMap, Marker } from "vue3-google-map";
import { onMounted, ref, onBeforeMount, reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { ElMessage } from "element-plus";

export default {
  name: "mapShow",
  setup() {
    onBeforeMount(() => {
      AMapLoader.load({
        key: "41417da0b45d919952ca225160450a43", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Weather",
          "AMap.ToolBar",
          "AMap.PlaceSearch",
          "AMap.Marker",
          "AMap.Geolocation",
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
            // center: [116.4929, 39.942], //中心点坐标: 这里可以写成动态获取坐标吗？小程序方面需要获取用户允许才可以拿到位置
            viewMode: "3D", //使用3D视图
          });
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition(function (status: any, result: any) {
            if (status == "complete") {
              console.log(result);
              console.log(result.position.lng, result.position.lat); // 可以拿到坐标
            } else {
              console.log(result);
            }
          });
          const tool = new AMap.ToolBar();
          map.addControl(tool);
          const trafficLayer = new AMap.TileLayer.Traffic({
            // 显示当前路段的交通情况
            zIndex: 10,
          });
          map.add(trafficLayer); //添加图层到地图
          // AMap.plugins("AMap.Weather", function() {
          const weather = new AMap.Weather();
          weather.getLive("北京市", function (err: any, data: any) {
            // 获取该城市的当前天气情况
            console.log(err, data);
            getInfo.value = data;
            loading.value = false;
            console.log(getInfo.value);
          });
          weather.getForecast("北京市", function (err: any, data: any) {
            // 获取该城市未来的天气状况
            console.log(err, data);
            forecastArr.value = data.forecasts;
            updateTime.value = data.reportTime;
            futureLoading.value = false;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
    let getInfo = ref({}); // 获取当前城市当天天气信息
    let loading = ref(true); // 第一个模块的loading
    let tag = ref(false); // 第一个模块的隐藏
    let forecastArr = ref([]); // 第二个模块的渲染数组
    let futureLoading = ref(true); // 第二个模块的loading
    let updateTime = ref("");
    let nowTag = ref(true);
    let futureTag = ref(true);
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
    const show = ref(true);
    let tagFuture = ref(false);
    const closeWeather = (index: number) => {
      // 关闭选择页(可以考虑优化下)
      if (index === 1) {
        tag.value = false;
        nowTag.value = true;
      } else if (index === 2) {
        tagFuture.value = false;
        futureTag.value = true;
      } else if (index === 3) {
        tagSearchCity.value = false;
        searchCityTag.value = true;
      } else if (index === 4) {
        tagPlace.value = true;
        placeTag.value = false;
      } else if (index === 5) {
        searchDriving.value = true;
        drivingTag.value = false;
      }
    };
    const showHidden = (index: number) => {
      // 显示btn进行控制
      if (index === 1) {
        tag.value = true;
        nowTag.value = false;
      } else if (index === 2) {
        tagFuture.value = true;
        futureTag.value = false;
      } else if (index === 3) {
        tagSearchCity.value = true;
        searchCityTag.value = false;
      } else if (index === 4) {
        tagPlace.value = false;
        placeTag.value = true;
      } else if (index === 5) {
        searchDriving.value = false;
        drivingTag.value = true;
      }
    };
    let tagSearchCity = ref(false);
    let searchCityTag = ref(true);
    let placeTag = ref(false);
    let tagPlace = ref(true);
    const jumpTo = () => {
      AMapLoader.load({
        key: "41417da0b45d919952ca225160450a43", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Weather",
          "AMap.ToolBar",
          "AMap.PlaceSearch",
          "AMap.Marker",
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
          const tool = new AMap.ToolBar();
          map.addControl(tool);
          const trafficLayer = new AMap.TileLayer.Traffic({
            // 显示当前路段的交通情况
            zIndex: 10,
          });
          map.add(trafficLayer); //添加图层到地图
          // AMap.plugins("AMap.Weather", function()
          const weather = new AMap.Weather();
          weather.getLive(cityName.value, function (err: any, data: any) {
            // 获取该城市的当前天气情况
            console.log(err, data);
            getInfo.value = data;
            loading.value = false;
            console.log(getInfo.value);
          });
          weather.getForecast(cityName.value, function (err: any, data: any) {
            // 获取该城市未来的天气状况
            console.log(err, data);
            forecastArr.value = data.forecasts;
            updateTime.value = data.reportTime;
            futureLoading.value = false;
          });
          if (!cityName.value) {
            cityName.value = "北京市";
          }
          map.setCity(cityName.value);
          ElMessage.success(`已跳转到${cityName.value}`);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const searchPlace = () => {
      AMapLoader.load({
        key: "41417da0b45d919952ca225160450a43", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Weather",
          "AMap.ToolBar",
          "AMap.PlaceSearch",
          "AMap.Marker",
          "AMap.Autocomplete",
          // "AMap.infoWindow",
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
          const tool = new AMap.ToolBar();
          map.addControl(tool);
          const trafficLayer = new AMap.TileLayer.Traffic({
            // 显示当前路段的交通情况
            zIndex: 10,
          });
          map.add(trafficLayer); //添加图层到地图
          // AMap.plugins("AMap.Weather", function() {
          // const weather = new AMap.Weather();
          // weather.getLive(cityName.value, function (err, data) {
          //   // 获取该城市的当前天气情况
          //   console.log(err, data);
          //   getInfo.value = data;
          //   loading.value = false;
          //   console.log(getInfo.value);
          // });
          // weather.getForecast(cityName.value, function (err, data) {
          //   // 获取该城市未来的天气状况
          //   console.log(err, data);
          //   forecastArr.value = data.forecasts;
          //   updateTime.value = data.reportTime;
          //   futureLoading.value = false;
          // });
          const placeSearch = new AMap.PlaceSearch({
            map: map,
            city: cityName.value,
            citylimit: false, //是否强制限制在设置的城市内搜索
            pageSize: 20, // 每页限制多少条数(目前是这样：返回数据只能是1页，但是1页里的条数可以设置)
            extensions: "base", //返回基本地址信息
          });

          placeSearch.search(
            aimPlace.value,
            function (status: any, result: any) {
              // console.log(aimPlace.value)
              console.log(result);
              const pois = result.poiList.pois;
              for (let i = 0; i < pois.length; i++) {
                const poi = pois[i];
                const marker = [];
                marker[i] = new AMap.Marker({
                  position: poi.location,
                  title: poi.name,
                });
                map.add(marker[i]);
              }
              map.setFitView();
            }
          );
        })
        .catch((e) => {
          console.log(e);
        });
    };
    let ruleForm = ref({
      // 启用表单限制输入
      provinceValue: "",
      wantPlaceStartValue: "",
      wantPlaceEndValue: "",
    });
    let rules = reactive({
      provinceValue: [
        { required: true, message: "请输入所在省份", trigger: "blur" },
      ],
      wantPlaceStartValue: [
        { required: true, message: "请输入起始地点", trigger: "blur" },
      ],
      wantPlaceEndValue: [
        { required: true, message: "请输入目标地点", trigger: "blur" },
      ],
    });
    const divRef = ref(null);
    const submitForm = (index: string) => {
      // 验证提交表单
      (divRef.value as any).validate((valid: any) => {
        if (valid) {
          routeDrive(index);
        } else {
          ElMessage.error("请输入完整搜索信息!");
          return false;
        }
      });
    };
    const activeName = ref("1");
    const tabLabels = ref([
      {
        name: "公交路线规划",
        icon: "el-icon-truck",
        index: "1",
      },
      {
        name: "驾车路线规划",
        icon: "el-icon-location-outline",
        index: "2",
      },
      {
        name: "骑行路线规划",
        icon: "el-icon-bicycle",
        index: "3",
      },
    ]);
    let searchDriving = ref(true);
    let drivingTag = ref(false);
    const routeDrive = (index: string) => {
      AMapLoader.load({
        key: "41417da0b45d919952ca225160450a43", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Weather",
          "AMap.ToolBar",
          "AMap.PlaceSearch",
          "AMap.Marker",
          "AMap.Autocomplete",
          "AMap.Driving",
          "AMap.DragRoute",
          "AMap.Geocoder",
          "AMap.Transfer",
          "AMap.Riding",
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
            resizeEnable: true,
            zoom: 15, //级别
            center: [116.4929, 39.942], //中心点坐标: 这里可以写成动态获取坐标吗？下一步可以考虑考虑如何获取当前位置坐标，但可能和api使用有关
            viewMode: "3D", //使用3D视图
          });
          console.log(index);
          if (index === "2") {
            const driving = new AMap.Driving({
              // 展示路线详情
              map: map,
              panel: "panel",
            });
            driving.search(
              [
                {
                  keyword: ruleForm.value.wantPlaceStartValue,
                  city: ruleForm.value.provinceValue,
                },
                {
                  keyword: ruleForm.value.wantPlaceEndValue,
                  city: ruleForm.value.provinceValue,
                },
              ],
              function (status: any, result: any) {
                if (status === "complete") {
                  ElMessage.success("绘制驾车路线完成");
                } else {
                  ElMessage.error("获取驾车数据失败：" + result);
                }
              }
            );
          } else if (index === "1") {
            const transOptions = reactive({
              map: map,
              city: ruleForm.value.provinceValue,
              panel: "panel",
              policy: AMap.TransferPolicy.LEAST_TIME, //乘车策略
            });
            const transfer = new AMap.Transfer(transOptions);
            transfer.search(
              [
                {
                  keyword: ruleForm.value.wantPlaceStartValue,
                  city: ruleForm.value.provinceValue,
                },
                {
                  keyword: ruleForm.value.wantPlaceEndValue,
                  city: ruleForm.value.provinceValue,
                },
              ],
              function (status: any, result: any) {
                if (status === "complete") {
                  ElMessage.success("绘制交通路线完成！");
                } else {
                  ElMessage.error("绘制失败！" + result);
                }
              }
            );
          } else if (index === "3") {
            const riding = new AMap.Riding({
              map: map,
              panel: "panel",
            });
            riding.search(
              [
                {
                  keyword: ruleForm.value.wantPlaceStartValue,
                  city: ruleForm.value.provinceValue,
                },
                {
                  keyword: ruleForm.value.wantPlaceEndValue,
                  city: ruleForm.value.provinceValue,
                },
              ],
              function (status: any, result: any) {
                if (status === "complete") {
                  ElMessage.success("骑行路线绘制成功!");
                } else {
                  ElMessage.error("该路线绘制失败！" + result);
                }
              }
            );
          }

          // const geocoder = new AMap.Geocoder();
          const tool = new AMap.ToolBar();
          map.addControl(tool);
          const trafficLayer = new AMap.TileLayer.Traffic({
            // 显示当前路段的交通情况
            zIndex: 10,
          });
          map.add(trafficLayer); //添加图层到地图
          drivingTag.value = false;
          searchDriving.value = true;
        })
        .catch((e) => {
          console.log(e);
        });
    };
    onMounted(() => {
      // debugger
      show.value = !show.value;
      showData(); // 这个地方显示不出来是因为上面的函数是异步的，当onBeforeMounted执行完后，会立即执行下方的onMounted,因此只展示出Proxy
    });
    let showData = () => {
      console.log(getInfo);
    };
    let aimPlace = ref("");
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
      tagSearchCity,
      searchCityTag,
      searchPlace,
      aimPlace,
      placeTag,
      tagPlace,
      submitForm,
      ruleForm,
      rules,
      divRef,
      searchDriving,
      drivingTag,
      tabLabels,
      activeName,
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
    top 60%
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
      .close
        cursor pointer
    .btn
      display flex
      justify-content flex-end
      margin 1rem
  .searchPlace
    position absolute
    top 55%
    right 5%
    background #fff
    width 20rem
    height 8rem
    padding-top 0.5rem
    .title
      border-bottom 0.1rem solid black
      color #625b57
      // text-align center
      display flex
      justify-content space-between
      align-items center
      margin 0.5rem
      padding-bottom 0.5rem
      .close
        padding-left 1.5rem
    .block-place
      display flex
      align-items center
      justify-content space-around
      padding 1rem
      .input-place
        width 10rem
  .route
    width 30rem
    position absolute
    top 20%
    left 30%
    .btn-route
      display flex
      justify-content flex-end
    .title
      font-size 1rem
      border-bottom 0.1rem solid black
      margin-bottom 1rem
      padding-bottom 0.5rem
      display flex
      justify-content space-between
      .close
        cursor pointer
    .range-item
      display flex
      align-items center
      margin-bottom 1rem
      .txt
        width 5rem
        font-size 0.8rem
      .input-style
        width 10rem
      // display flex
  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
</style>
