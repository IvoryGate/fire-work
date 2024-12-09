<template>
    <canvas ref="fireworksCanvas" id="fireworks"></canvas>
    <canvas ref="text"></canvas>
</template>
<style scoped>
    *{
      margin: 0;
      padding: 0;
    }
    #fireworks{
        position: absolute;
        background-color: black;
        background-image: url('../assets/night_2.png');
        background-size: cover;
        z-index: 1;
        transform: translate3d(0,0,0);
    }
    #text{
        margin: 0;
        padding: 0;
        position: absolute;
        z-index: 2;
    }
</style>

<script>
import { ref, onMounted } from 'vue';
import { Firework } from '../js/Firework'

export default {
  setup() {
    const fireworksCanvas = ref();
    
    onMounted(() => {
      //监听屏幕大小，以对canvas大小进行实时更新
      window.addEventListener('resize', resizeDiv);
      function resizeDiv() {
        fireworksCanvas.value.height = window.innerHeight;
        fireworksCanvas.value.width = window.innerWidth;
      }
      // 更新屏幕大小
      resizeDiv();
      // 获取画布元素
      const offscreenCanvas = fireworksCanvas.value.transferControlToOffscreen();
      const context = offscreenCanvas.getContext('2d');
      // const context = fireworksCanvas.value.getContext('2d');
      // 维护烟花数组
      let fireworks = [];
      function draw(){
        context.stroke();
        context.clearRect(0,0,fireworksCanvas.value.width,fireworksCanvas.value.height);
        if(Math.random()<0.01){
          if(fireworks.length<=5){
            fireworks.push(new Firework(Math.floor(Math.random()*window.innerWidth + 1),window.innerHeight,context));
          }else{
            fireworks.shift();
          }
        }
        for (let i = fireworks.length;i>=0;i--){
          if(fireworks[i]){
            if(fireworks[i].done){
              fireworks.splice(i,1);
            }else{
              fireworks[i].update();
              fireworks[i].show();
            }
          }
        }
        console.log(fireworks.length);
      }
      function animate(){
        window.requestAnimationFrame(animate);
        draw();
      }
      animate();
    });
    return {
      fireworksCanvas
    };
  },
};
</script>