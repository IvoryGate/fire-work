import { Particle } from "./Particle"

class Firework{
    constructor(width,height,ctx){
        this.ctx = ctx;
        this.fireworks = [];
        this.exploded = false;
        this.done = this.done();
        this.colorR = Math.floor(Math.random()*195+60);
        this.colorG = Math.floor(Math.random()*195+60);
        this.colorB = Math.floor(Math.random()*195+60);
        this.firework = new Particle(width,height,this.ctx,!this.exploded,this.colorR,this.colorG,this.colorB);
    }
    update(){
        if (!this.exploded){
            this.firework.update();
            if (this.firework.velY>=0){
                this.exploded = true;
                this.explode();
            }
        }
        for (let i = this.fireworks.length;i>=0;i--){
            if(this.fireworks[i]){
                this.fireworks[i].update();
                this.fireworks[i].alpha -= 0.02;
            }
            if(this.fireworks[i] && this.fireworks[i].alpha<=0){
                this.fireworks.splice(i,1);
            }
        }
    }
    show(){
        if(!this.exploded && this.firework.alpha>0){
            this.firework.show();
        }
        for (let i = 0;i<this.fireworks.length;i++){
            if(this.fireworks[i]){
                this.fireworks[i].show();
            }
        }
    }
    explode(){
        for (let i = 0;i <80;i++){
            let point = new Particle(this.firework.x,this.firework.y,this.ctx,!this.exploded,this.colorR,this.colorG,this.colorB);
            this.fireworks.push(point);
        }
    }
    done() {
        if (this.exploded && !this.fireworks.length) {
          return true
        }else{
            return false
        }
    }
}
export{Firework}


