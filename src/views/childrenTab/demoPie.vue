<template>
  <div>
    <div id="pie"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
export default  defineComponent({
  name: "demoPie",
  setup() {
    const data = [
      { name: '狮子', type: '火象星座', value: 21 },
      { name: '白羊', type: '火象星座', value: 10 },
      { name: '射手', type: '火象星座', value: 10 },
      { name: '水瓶', type: '风向星座', value: 14 },
      { name: '双子', type: '风向星座', value: 7 },
      { name: '天平', type: '风向星座', value: 7 },
      { name: '摩羯', type: '土象星座', value: 14 },
      { name: '金牛', type: '土象星座', value: 3 },
      { name: '处女', type: '土象星座', value: 3 },
      { name: '天蝎', type: '水象星座', value: 11 },
      { name: '巨蟹', type: '水象星座', value: 5 },
      { name: '双鱼', type: '水象星座', value: 5 },
    ];
    onMounted(() => {
      const ds = new DataSet(); // 创建数据对象,进行数据初始化
      const dv = ds.createView(); // 创建视图
      dv.source(data).transform({ // 进行数据加载和渲染处理
        type: 'percent', // 表示类型
        field: 'value', // 和数据的名字有关
        dimension: 'type',
        as: 'percent',
      });

      const colorMap = {
        火象星座: '#1890ff',
        风向星座: '#13c2c2',
        土象星座: '#ffc53d',
        水象星座: '#73d13d',
      };

      const chart = new Chart({ // 创建chart实例
        container: 'pie',
        autoFit: true,
        height: 500,
      });
      chart.data(dv.rows); // 存储处理过后的数据
      chart.legend(false); // 是否加载图例
      chart.coordinate('theta', { // 定义坐标系类型，一般来讲默认为笛卡尔坐标系，本次使用的是一个特殊的极坐标，专门为饼图设计
        radius: 0.5, // 极坐标半径
        innerRadius: 0.3, // 极坐标内半径
      });
      chart.tooltip({ // 是否展示提示信息
        showMarkers: false,
        title: (title, datum) => datum['name']
      });
      chart          // 此处为开始绘画
        .interval()
        .adjust('stack') // 层叠
        .position('percent')
        .color('type', (val) => colorMap[val])
        .style({
          stroke: 'white',
          lineWidth: 1,
        })
        .label('type', {
          offset: -5,
          style: {
            fill: 'white',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
        });

      const ds2 = new DataSet();
      const dv2 = ds2.createView();
      dv2.source(data).transform({
        type: 'percent',
        field: 'value',
        dimension: 'name',
        as: 'percent',
      });
      const outterView = chart.createView();
      outterView.data(dv2.rows);
      outterView.coordinate('theta', {
        innerRadius: 0.5 / 0.8,
        radius: 0.8,
      });
      outterView
        .interval()
        .adjust('stack')
        .position('percent')
        .color('type*name', (type, name) => colorMap[type])
        .style({
          stroke: 'white',
          lineWidth: 1,
        })
        .label('name', {
          offset: -10,
          style: {
            fill: 'white',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
        });

      chart.interaction('element-active') // 声明交互

      chart.render(); // 渲染引擎
    })
  }
});
</script>

<style scoped>

</style>
