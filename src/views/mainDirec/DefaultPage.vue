<template>
  <div class="main">
    <div class="time-style">
      <div class="canvas-style">
        <el-card v-loading="canvasLoading">
          <canvas id="box" width="300" height="200"></canvas>
        </el-card>
      </div>
      <h1>现在是{{Formate(nowTime)}}</h1>
    </div>
    <div>
      <span>完成度:</span>
      <meter min="0" max="500" value="350"></meter>
      <label for="file">完成度:</label>
      <progress max="100" :value="number"></progress>
      <span>{{number}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
// import { getLunar } from 'chinese-lunar-calendar'
export default {
  name: "DefaultPage",
  setup() {
    const number = ref(0)
    const timer:any = ref(null)
    const nowTime: any = ref(new Date())
    const canvasLoading = ref(false)
    const formateTime = (n: number) => {
      if (n < 10) {
        return '0' + n
      } else {
        return n
      }
    }
    const Formate = () => {
      const date = new Date()
      const year = formateTime(date.getFullYear())
      const month = formateTime((date.getMonth() + 1))
      const day = formateTime((date.getDate()))
      const hour = formateTime(date.getHours())
      const minute = formateTime(date.getMinutes())
      const second = formateTime(date.getSeconds())
      const weekDay = date.getDay()
      const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六',]
      const week = weeks[weekDay]
      return year + '-' + month + '-' + day + ' ' + week + ' ' +hour + ':' + minute + ':' + second
    }
    onMounted(() => {
      timer.value = setInterval(() => {
        nowTime.value = new Date().toLocaleDateString()
      })
      // 加载绘画类图像时，要注意在mounted里加载
      canvasLoading.value = true
      const canvas:any = document.getElementById("box"); // 获取当前元素
      const ctx = canvas.getContext("2d"); // 使用2D
      setInterval(() => {
        ctx.save();
        ctx.clearRect(0, 0, 600, 600);
        ctx.translate(150, 100); // 设置中心点，此时300，300变成了坐标的0，0
        ctx.save();

        // 画大圆
        ctx.beginPath();
        // 画圆线使用arc(中心点X,中心点Y,半径,起始角度,结束角度)
        ctx.arc(0, 0, 100, 0, 2 * Math.PI);
        ctx.stroke(); // 执行画线段的操作
        ctx.closePath();

        // 画小圆
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        // 获取当前 时，分，秒
        let time = new Date();
        let hour = time.getHours() % 12;
        let min = time.getMinutes();
        let sec = time.getSeconds();

        // 时针
        ctx.rotate(
          ((2 * Math.PI) / 12) * hour +
          ((2 * Math.PI) / 12) * (min / 60) -
          Math.PI / 2
        );
        ctx.beginPath();
        // moveTo设置画线起点
        ctx.moveTo(-10, 0);
        // lineTo设置画线经过点
        ctx.lineTo(40, 0);
        // 设置线宽
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        ctx.save();

        // 分针
        ctx.rotate(
          ((2 * Math.PI) / 60) * min +
          ((2 * Math.PI) / 60) * (sec / 60) -
          Math.PI / 2
        );
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(60, 0);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        ctx.save();

        //秒针
        ctx.rotate(((2 * Math.PI) / 60) * sec - Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(80, 0);
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        ctx.save();

        // 绘制刻度，也是跟绘制时分秒针一样，只不过刻度是死的
        ctx.lineWidth = 1;
        for (let i = 0; i < 60; i++) {
          ctx.rotate((2 * Math.PI) / 60);
          ctx.beginPath();
          ctx.moveTo(90, 0);
          ctx.lineTo(100, 0);
          // ctx.strokeStyle = 'red'
          ctx.stroke();
          ctx.closePath();
        }
        ctx.restore();
        ctx.save();
        ctx.lineWidth = 5;
        for (let i = 0; i < 12; i++) {
          ctx.rotate((2 * Math.PI) / 12);
          ctx.beginPath();
          ctx.moveTo(85, 0);
          ctx.lineTo(100, 0);
          // ctx.strokeStyle = 'red'
          ctx.stroke();
          ctx.closePath();
        }

        ctx.restore();
        ctx.restore();
        canvasLoading.value = false
        if (number.value < 100) {
          number.value++
        }
      }, 1000);
    });
    onBeforeUnmount(() => {
      if (timer.value) {
        clearInterval((timer.value))
      }
    })
    return {
      number,
      Formate,
      nowTime,
      canvasLoading,
    }
  },
};
</script>

<style lang="stylus" scoped>
.main
  width 100%
  height 100%
  .time-style
    display flex
    .canvas-style
      margin-right 30px
</style>


