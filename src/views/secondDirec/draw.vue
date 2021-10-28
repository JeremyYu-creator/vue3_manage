<template>
  <div class="main">
    <canvas id="box" width="600" height="600"></canvas>
    <canvas id="try" width="300" height="300"></canvas>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "draw",
  setup() {
    onMounted(() => {
      // 加载绘画类图像时，要注意在mounted里加载
      const canvas = document.getElementById("box"); // 获取当前元素
      const ctx = canvas.getContext("2d"); // 使用2D

      setInterval(() => {
        ctx.save();
        ctx.clearRect(0, 0, 600, 600);
        ctx.translate(300, 300); // 设置中心点，此时300，300变成了坐标的0，0
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
      }, 1000);
      const canvasTry = document.getElementById("try");
      const ctx2 = canvasTry.getContext("2d");
      ctx2.translate(110, 110);
      ctx2.save();
      ctx2.beginPath();
      ctx2.arc(0, 0, 100, 0, 2 * Math.PI);
      ctx2.moveTo(-10, 0);
      ctx2.lineTo(40, 0);
      ctx2.stroke();
      ctx2.closePath();
      ctx2.beginPath();
      ctx2.arc(0, 0, 10, 0, 2 * Math.PI);
      ctx2.fillStyle = "black";
      ctx2.stroke();
      ctx2.closePath();
    });
  },
};
</script>

<style lang="stylus" scoped>
.main
    width 100%
    height 100%
</style>
