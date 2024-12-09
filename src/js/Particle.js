class Particle{
    constructor(x,y,ctx,isFirework,colorR,colorG,colorB){
        this.isFirework = isFirework;
        this.x=x;
        this.y=y;
        this.theta = Math.random()*Math.PI*2;
        this.alpha = 2;
        this.colorR = colorR;
        this.colorG = colorG;
        this.colorB = colorB;
        this.x_arr = [];
        this.y_arr = [];
        // 重力
        // 初速度
        if (this.isFirework){
            this.gravity = 0.05;
            this.radius = 3;
            this.velX = 0;
            this.velY = Math.random()*(-9 - (-6) + 1) + (-6);
        }else{ 
            this.gravity = 0.05;
            this.radius = 1;
            let circle_randius = Math.random()*4;
            this.velX = circle_randius*Math.cos(this.theta);
            this.velY = circle_randius*Math.sin(this.theta);
        }
        
        // 加速度
        this.accX = 0;
        this.accY = 0;
        this.ctx = ctx;
    }
    update(){
        if(this.x_arr.length<=10){
            this.x_arr.push(this.x);
            this.y_arr.push(this.y);
        }else{
            this.x_arr.unshift();
            this.y_arr.unshift();
            this.x_arr.push(this.x);
            this.y_arr.push(this.y);
        }
        this.x += this.velX;
        this.y += this.velY;
        this.velY += this.gravity;
    }
    show(){
        if(this.alpha>0){
            let beta = this.alpha;
            for(let i = this.x_arr.length;i>=0;i--){
                this.ctx.beginPath();
                this.ctx.fillStyle=`rgba(${this.colorR},${this.colorG},${this.colorB},${beta})`;
                this.ctx.arc(this.x_arr[i-1],this.y_arr[i-1],this.radius,0,2*Math.PI);
                this.ctx.fill();
                this.ctx.closePath();
                beta= beta - 0.1;
            }
        }
    }
}
export{Particle}