<template>
  <div class="map-style">
    <div id="map"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
// import { L7 } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
import { Scene, Control, Zoom } from "@antv/l7";
// import { DrillDownLayer } from '@antv/l7-district';
// import { GaodeMap } from '@antv/l7-maps';
export default defineComponent({
  name: "demoMap",
  setup() {
    // const colors = [ '#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70' ];
    const colors = ["#7fffd4", "#ffa500", "#9370db", "#d2691e", "#da70d6", "#b22222"];
    const ProvinceData = [
      {
        name: "云南省",
        // code: 530000,
        value: 100,
      },
      {
        name: "黑龙江省",
        // code: 230000,
        value: 160,
      },
      {
        name: "贵州省",
        code: 520000,
        value: 200,
      },
      {
        name: "北京市",
        code: 110000,
        value: 500,
      },
      {
        name: "河北省",
        code: 130000,
        value: 200,
      },
      {
        name: "山西省",
        code: 140000,
        value: 90,
      },
      {
        name: "吉林省",
        code: 220000,
        value: 400,
      },
      {
        name: "宁夏回族自治区",
        code: 640000,
        value: 20,
      },
      {
        name: "辽宁省",
        code: 210000,
        value: 450,
      },
      {
        name: "海南省",
        code: 460000,
        value: 100,
      },
      {
        name: "内蒙古自治区",
        code: 150000,
        value: 100,
      },
      {
        name: "天津市",
        code: 120000,
        value: 200,
      },
      {
        name: "新疆维吾尔自治区",
        code: 650000,
        value: 200,
      },
      {
        name: "上海市",
        code: 310000,
        value: 500,
      },
      {
        name: "陕西省",
        code: 610000,
        value: 200,
      },
      {
        name: "甘肃省",
        code: 620000,
        value: 150,
      },
      {
        name: "安徽省",
        code: 340000,
        value: 200,
      },
      {
        name: "香港特别行政区",
        code: 810000,
        value: 100,
      },
      {
        name: "广东省",
        code: 440000,
        value: 500,
      },
      {
        name: "河南省",
        code: 410000,
        value: 200,
      },
      {
        name: "湖南省",
        code: 430000,
        value: 150,
      },
      {
        name: "江西省",
        code: 360000,
        value: 200,
      },
      {
        name: "四川省",
        code: 510000,
        value: 200,
      },
      {
        name: "广西壮族自治区",
        code: 450000,
        value: 200,
      },
      {
        name: "江苏省",
        code: 320000,
        value: 450,
      },
      {
        name: "澳门特别行政区",
        code: 820000,
        value: 100,
      },
      {
        name: "浙江省",
        code: 330000,
        value: 500,
      },
      {
        name: "山东省",
        code: 370000,
        value: 500,
      },
      {
        name: "青海省",
        code: 630000,
        value: 100,
      },
      {
        name: "重庆市",
        code: 500000,
        value: 200,
      },
      {
        name: "福建省",
        code: 350000,
        value: 270,
      },
      {
        name: "湖北省",
        code: 420000,
        value: 300,
      },
      {
        name: "西藏自治区",
        code: 540000,
        value: 50,
      },
      {
        name: "台湾省",
        code: 710000,
        value: 100,
      },
    ];
    onMounted(() => {
      const scene = new Scene({
        id: "map",
        map: new Mapbox({
          // mapStyle: 'amap://styles/a92c23c68ca519ec235825c3be99462b',
          // style: 'amap://styles/2a09079c3daac9420ee53b67307a8006?isPublic=true',
          // style: "dark",
          pitch: 0,
          // center: [116.2825, 39.9],
          logoVisible: false,
          zoom: 5,
          minZoom: 3.5,
          autoFit: true,
          token:
            "pk.eyJ1IjoiamVyZW15eXUiLCJhIjoiY2t0aDVzOGo1MG96dDJyanl4dXpjaWdyaCJ9.tgBIzwOyxUI-rW7aD0r-Iw",
          // plugin: [ 'AMap.ToolBar' ]
        }),
      });
      scene.setCenter([116.2825, 39.9]);
      scene.on("loaded", () => {
        // debugger
        new CountryLayer(scene, {
          data: ProvinceData,
          // viewStart: 'Country',
          // viewEnd: 'City',
          joinBy: ["NAME_CHN", "name", "code", "value"],
          depth: 1,
          provinceStroke: "#fff",
          cityStroke: "#EBCCB4",
          cityStrokeWidth: 1,
          // zoom: 10,
          fill: {
            color: {
              field: "value",
              values:
                // colors,
                (item) => {
                  // if(item) {
                  //   return colors[1]
                  // }
                  if (item <= 100) {
                    return colors[0];
                  } else if (item > 100 && item <= 200) {
                    return colors[1];
                  } else if (item > 200 && item <= 400) {
                    return colors[2];
                  } else if (item > 400 && item <= 500) {
                    return colors[3];
                  }
                },
            },
          },
          popup: {
            enable: true,
            Html: (props) => {
              return `<span>${props.value}-${props.name}</span>`;
            },
          },
        });
        const zoomControl = new Zoom();
        scene.addControl(zoomControl);
      });
      const legend = new Control({
        position: "bottomright",
      });
      legend.onAdd = () => {
        const el = document.createElement("div");
        el.className = "infolegend legend";
        let grades = [0, 100, 200, 300, 400, 500];
        for (let i = 0; i < grades.length; i++) {
          el.innerHTML +=
            '<i style="background:' +
            colors[i] +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? "–" + grades[i + 1] + "<br>" : "+");
        }
        return el;
      };
      scene.addControl(legend);
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
