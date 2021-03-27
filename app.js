//object for the canvas element
var canvas = document.getElementById("canvas");

//object to draw 2d for the canvas
var ctx = canvas.getContext("2d");

var radius = canvas.height / 2;

ctx.translate(radius,radius);

radius = radius*0.90;

setInterval(drawClock,1000);
function drawClock(){
    drawFace(ctx,radius);
    drawNumber(ctx,radius);
    drawTime(ctx,radius);
}


function drawFace(ctx,radius){
    var grad;
    ctx.beginPath();
    ctx.arc(0,0,radius,0,Math.PI*2);
    ctx.fillStyle="white";
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
    grad.addColorStop(0,"grey");
    grad.addColorStop(0.5,"grey");
    grad.addColorStop(1,"black");
    ctx.strokeStyle=grad;
    ctx.lineWidth=radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,0,radius*0.1,0,Math.PI*2);
    ctx.fillStyle="#333";
    ctx.fill();
}

function drawNumber(ctx,radius){
    var ang,num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseLine="middle";
    ctx.textAlign = "center";
    for(num=1; num<13;num++){
        ang=num*Math.PI/6;
        ctx.rotate(ang);
        ctx.translate(0,-radius*0.85);
        ctx.rotate(-ang); 
        ctx.fillText(num.toString(),0,0);
        ctx.rotate(ang);
        ctx.translate(0,radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx,radius){
    var now=new Date();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second = now.getSeconds();
    hour = hour%12;

    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60));
    drawHand(ctx,hour,radius*0.5,radius*0.07);

    minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    drawHand(ctx,minute,radius*0.8,radius*0.07);

    second = (second*Math.PI/30);
    drawHand(ctx,second,radius*0.9,radius*0.02);
}
function drawHand(ctx,pos,length,width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-pos);
}
