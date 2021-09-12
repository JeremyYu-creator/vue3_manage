<template>
  <div class="map-style">
    <div id="map"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
// import { L7 } from "@antv/l7";
// import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
import { Scene } from '@antv/l7';
import { DrillDownLayer } from '@antv/l7-district';
// import { GaodeMap } from '@antv/l7-maps';
export default defineComponent({
  name: "demoMap",
  setup() {
    const colors = [ '#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70' ];
    onMounted(() => {
      const scene = new Scene({
        id: 'map',
        map: new Mapbox({
          // mapStyle: 'amap://styles/a92c23c68ca519ec235825c3be99462b',
          // style: 'amap://styles/2a09079c3daac9420ee53b67307a8006?isPublic=true',
          pitch: 0,
          center: [ 116.2825, 39.9 ],
          zoom: 3,
          token: 'pk.eyJ1IjoiamVyZW15eXUiLCJhIjoiY2t0aDVzOGo1MG96dDJyanl4dXpjaWdyaCJ9.tgBIzwOyxUI-rW7aD0r-Iw',
          // plugin: [ 'AMap.ToolBar' ]
        })
      });
      scene.on('loaded', () => {
        new DrillDownLayer(scene, {
          data: [],
          viewStart: 'Country',
          viewEnd: 'City',
          fill: {
            color: {
              field: 'NAME_CHN',
              values: colors
            }
          },
          popup: {
            enable: true,
            Html: props => {
              return `<span>${props.NAME_CHN}</span>`;
            }
          }
        });
      });
    })
  },
});
</script>

<style scoped lang="stylus">
.map-style
  width 800px
  height 500px
//.l7-scene
//  width 800px
//  height 300px
  #map
    position absolute
    width 1000px
    height 600px
</style>
