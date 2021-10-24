<template>
  <div class="map-style">
    <div id="map"></div>
  </div>
</template>

<script>
import { Scene } from "@antv/l7";
import { DrillDownLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  setup() {
    const colors = ["#0047A5", "#B8E1FF", "#7DAAFF", "#3D76DD", "#001D70"];
    const ProvinceData = [
      {
        name: "云南省",
        adcode: 530000,
        count: 100,
      },
      {
        name: "黑龙江省",
        adcode: 230000,
        count: 160,
      },
      {
        name: "贵州省",
        adcode: 520000,
        count: 200,
      },
      {
        name: "北京市",
        adcode: 110000,
        count: 500,
      },
      {
        name: "河北省",
        adcode: 130000,
        count: 200,
      },
      {
        name: "山西省",
        adcode: 140000,
        count: 90,
      },
      {
        name: "吉林省",
        adcode: 220000,
        count: 400,
      },
      {
        name: "宁夏回族自治区",
        adcode: 640000,
        count: 20,
      },
      {
        name: "辽宁省",
        adcode: 210000,
        count: 450,
      },
      {
        name: "海南省",
        adcode: 460000,
        count: 100,
      },
      {
        name: "内蒙古自治区",
        adcode: 150000,
        count: 100,
      },
      {
        name: "天津市",
        adcode: 120000,
        count: 200,
      },
      {
        name: "新疆维吾尔自治区",
        adcode: 650000,
        count: 200,
      },
      {
        name: "上海市",
        adcode: 310000,
        count: 500,
      },
      {
        name: "陕西省",
        adcode: 610000,
        count: 200,
      },
      {
        name: "甘肃省",
        adcode: 620000,
        count: 150,
      },
      {
        name: "安徽省",
        adcode: 340000,
        count: 200,
      },
      {
        name: "香港特别行政区",
        adcode: 810000,
        count: 100,
      },
      {
        name: "广东省",
        adcode: 440000,
        count: 500,
      },
      {
        name: "河南省",
        adcode: 410000,
        count: 200,
      },
      {
        name: "湖南省",
        adcode: 430000,
        count: 150,
      },
      {
        name: "江西省",
        adcode: 360000,
        count: 200,
      },
      {
        name: "四川省",
        adcode: 510000,
        count: 200,
      },
      {
        name: "广西壮族自治区",
        adcode: 450000,
        count: 200,
      },
      {
        name: "江苏省",
        adcode: 320000,
        count: 450,
      },
      {
        name: "澳门特别行政区",
        adcode: 820000,
        count: 100,
      },
      {
        name: "浙江省",
        adcode: 330000,
        count: 500,
      },
      {
        name: "山东省",
        adcode: 370000,
        count: 500,
      },
      {
        name: "青海省",
        adcode: 630000,
        count: 100,
      },
      {
        name: "重庆市",
        adcode: 500000,
        count: 200,
      },
      {
        name: "福建省",
        adcode: 350000,
        count: 270,
      },
      {
        name: "湖北省",
        adcode: 420000,
        count: 300,
      },
      {
        name: "西藏自治区",
        adcode: 540000,
        count: 50,
      },
      {
        name: "台湾省",
        adcode: 710000,
        count: 100,
      },
    ];
    const cityData = [
      {
        name: "广州市",
        count: 2840,
      },
      {
        name: "深圳市",
        count: 2149,
      },
      {
        name: "东莞市",
        count: 1812,
      },
      {
        name: "佛山市",
        count: 563,
      },
      {
        name: "汕头市",
        count: 400,
      },
      {
        name: "惠州市",
        count: 316,
      },
      {
        name: "揭阳市",
        count: 258,
      },
      {
        name: "江门市",
        count: 241,
      },
      {
        name: "湛江市",
        count: 237,
      },
      {
        city: "0",
        count: 211,
      },
      {
        name: "韶关市",
        count: 172,
      },
      {
        name: "中山市",
        count: 165,
      },
      {
        name: "梅州市",
        count: 127,
      },
      {
        name: "珠海市",
        count: 98,
      },
      {
        name: "汕尾市",
        count: 74,
      },
      {
        name: "清远市",
        count: 69,
      },
      {
        name: "肇庆市",
        count: 48,
      },
      {
        name: "云浮市",
        count: 44,
      },
      {
        name: "茂名市",
        count: 41,
      },
      {
        name: "河源市",
        count: 30,
      },
      {
        name: "潮州市",
        count: 27,
      },
      {
        name: "阳江市",
        count: 13,
      },
      {
        name: "长春市",
        count: 200,
      },
    ];
    onMounted(() => {
      const scene = new Scene({
        id: "map",
        map: new Mapbox({
          center: [116.2825, 39.9],
          pitch: 0,
          style: "blank",
          zoom: 3,
          minZoom: 3,
          maxZoom: 10,
          token:
            "pk.eyJ1IjoiamVyZW15eXUiLCJhIjoiY2t0aDVzOGo1MG96dDJyanl4dXpjaWdyaCJ9.tgBIzwOyxUI-rW7aD0r-Iw",
        }),
      });
      scene.on("loaded", () => {
        // debugger
        // console.log()
        new DrillDownLayer(scene, {
          // data: [],
          provinceData: ProvinceData,
          cityData: cityData,
          joinBy: ["NAME_CHN", "name", "count"],
          // joinBy: ["adcode", "adcode", "count"],
          viewStart: "Country",
          viewEnd: "City",
          // drillDownEvent: (),
          fill: {
            color: {
              field: ["count"],
              values:
                // colors,
                (item) => {
                  // console.log(item)
                  if (item <= 200) {
                    return colors[0];
                  } else if (item > 200 && item <= 500) {
                    return colors[1];
                  } else if (item > 500 && item <= 1000) {
                    return colors[2];
                  } else if (item > 1000 && item <= 2000) {
                    return colors[3];
                  } else {
                    return colors[4];
                  }
                },
            },
          },
          popup: {
            enable: true,
            Html: (props) => {
              return `<span>${props.count}</span>`;
            },
          },
          drillDownEvent: (item) => {
            console.log(item);
          },
          autoUpdateData: true,
        });
      });
      // scene.on("click", (ev) => {
      //   console.log(ev);
      // }); // 鼠标左键点击事件
    });
  },
});
</script>

<style scoped lang="stylus">
.map-style
  width 800px
  height 500px
  #map
    position absolute
    width 1200px
    height 1000px
</style>
<style lang="stylus">
.l7-bottom
  bottom 300px
  .legend
    line-height: 18px;
    color: #555;
    position absolute
    width 100px
    // top -50%
    bottom 100%
.legend i
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
</style>
