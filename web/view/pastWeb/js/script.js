var mainCanvas=document.getElementById("myCanvas"),mainContext=mainCanvas.getContext("2d"),circles=[],requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,rainDrops=mainCanvas.getAttribute("rainDrops"),wind=mainCanvas.getAttribute("windPower"),direction=mainCanvas.getAttribute("direction");function Circle(a,b,c,d){this.speed=b;this.xPos=c;this.yPos=d;this.opacity=-.03+a/10;this.counter=0}
$(window).resize(resizeCanvas);var canvas = $("#myCanvas");function resizeCanvas(){canvas.attr("width", $(window).get(0).innerWidth*2);canvas.attr("height", $(window).get(0).innerHeight*2);mainContext.fillRect(0, 0, canvas.width(), canvas.height());};resizeCanvas();
Circle.prototype.update=function(){this.counter+=this.speed;this.yPos+this.counter>mainCanvas.height&&(this.xPos=Math.round(Math.random()*mainCanvas.width*wind+mainCanvas.width),"right"==direction?this.xPos=-1*Math.round(Math.random()*mainCanvas.width*wind+25):"left"!=direction&&(this.xPos=Math.round(Math.random()*mainCanvas.width+1)),this.yPos=-1*Math.round(Math.random()*mainCanvas.height*2+1),this.counter=0);mainContext.beginPath();1>wind&&(wind=1);"left"==direction?moveParticules(this,-1,7,10,
    11,5):"right"==direction?moveParticules(this,1,7,10,11,5):(wind=0,moveParticules(this,1,0,15,3,20));mainContext.fillStyle="rgba(220, 220, 220,"+this.opacity.toFixed(2)+")";mainContext.fill()};function moveParticules(a,b,c,d,e,f){mainContext.moveTo(a.xPos+a.counter*wind*b,a.yPos+a.counter);mainContext.bezierCurveTo(a.xPos+a.counter*wind*b+c*b,a.yPos+a.counter+d,a.xPos+a.counter*wind*b+e*b,a.yPos+a.counter+f,a.xPos+a.counter*wind*b,a.yPos+a.counter)}
function drawCircles(){for(var a=0;a<rainDrops;a++){var b=Math.round(Math.random()*mainCanvas.width*wind+mainCanvas.width);"right"==direction?b*=-1:"left"!=direction&&(b=Math.round(Math.random()*mainCanvas.width*wind+1));var c=-1*Math.round(Math.random()*mainCanvas.height*2+50),d=5+2*Math.random(),e=Math.floor(10*Math.random()+1),b=new Circle(e,d,b,c);circles.push(b)}draw()}
function draw(){mainContext.clearRect(0,0,mainCanvas.width,mainCanvas.height);for(var a=0;a<circles.length;a++)circles[a].update();requestAnimationFrame(draw)}drawCircles();
window.onload=function(){setTimeout(function(){var a = document.getElementsByClassName("loader")[0];
    $(".loader").addClass("animated1 lightSpeedOut");setTimeout(function(){a.style.display="none";},1000);
    setTimeout(function()
    {$(".home").addClass("animated zoomInLeft");$(".about").addClass("animated slideInRight");
        $(".contact").addClass("animated slideInLeft");$(".slidebox").addClass("animated flipInX");$(".box3").addClass("animated lightSpeedIn")
        $(".london").addClass("animated bounceInUp");$(".paris").addClass("animated bounceInUp");$(".ball").addClass("animated slideInDown");
    },100);setTimeout(function () {
        $(".ball").removeClass("animated slideInDown")
    },2000)
    $("body").css("overflow-y","scroll");
},300)};
$('.carousel').carousel({ 	interval: 4500 });
$('.london').hover(function(){$(".title1").css("display","block");
    $(".title1").addClass("animated1 slideInDown");} ,function(){$(".title1").removeClass("animated1 slideInDown");$(".title1").css("display","none");});
$('.paris').hover(function(){$(".title2").css("display","block");
    $(".title2").addClass("animated1 slideInDown");} ,function(){$(".title2").removeClass("animated1 slideInDown");$(".title2").css("display","none");});
function idCard(){$(".idCard").addClass("animated slideInDown");
    setTimeout(function(){$(".idCard").removeClass("animated slideInDown");$(".idCard").css("visibility","visible");},2000);
    setTimeout(function(){$(".idCard").addClass("animated slideOutUp");setTimeout(function(){$(".idCard").css("visibility","hidden");
        $(".idCard").removeClass("animated slideOutUp")
    },2000)},4000)};
$(".about").hover(function(){$(".about").removeClass("animated slideInRight");$(".about").addClass("animated rubberBand")},function(){
    $(".about").removeClass("animated rubberBand");
});
$(".contact").hover(function(){$(".contact").removeClass("animated slideInLeft");$(".contact").addClass("animated jello")},function(){
    $(".contact").removeClass("animated jello");
});
window.onbeforeunload = function(){$(window).scrollTop(0);};
function checkRefesh(){$(window).scrollTop(0);};
$(window).on('beforeunload',function(){return $(window).scrollTop(0);});
function num(){
    var c = Math.round(Math.random() * 8);
    return c
}
$(".balloon").on("click",function(){
    var a = num();console.log(a);
    $("body").css("background-image","url(bg/"+a+".jpg)")
});
function doit(){var resetbtn = document.getElementById("myBtn1");
    var btn = new Neontext("myBtn1");
    var neontext = new Neontext("myText");
    neontext.render.run();
    btn.render.run();
    resetbtn.addEventListener("click",function(){
        neontext.render.killer();
        btn.render.killer();
    })};
function contact(){
$(".stage").removeClass("stage1");
$(".balloon").removeClass("balloon1");
$(".balloon").addClass("animated zoomOutUp");
$(".skyline").addClass("animated fadeOut");
$(".ground").addClass("animated fadeOut");
function action2(){$(".friendshipShell").addClass("animated fadeOutLeftBig");
    $(".dowEventCenter").addClass("animated slideOutLeft");
    $(".glockenspiel").addClass("animated fadeOutLeftBig");
    $(".planetarium").addClass("animated fadeOutRightBig");
    $(".beans").addClass("animated fadeOutRightBig");
    function action3(){$(".tieta").addClass("tietaChange");
    $(".paper").addClass("animated slideInDown");setTimeout(function(){$(".paper").css("visibility","visible");$(".paper").removeClass("animated slideInDown");doit();},2000);
    }
    setTimeout(function(){action3();$(".friendshipShell").css("display","none");$(".dowEventCenter").css("display","none");$(".glockenspiel").css("display","none");$(".planetarium").css("display","none");$(".beans").css("display","none");},2000)
}
setTimeout(function(){action2();$(".balloon").css("display","none");$(".ground").css("display","none");$(".skyline").css("display","none")},2000);
}
















