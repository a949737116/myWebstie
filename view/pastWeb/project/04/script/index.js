/**
 * Created by Administrator on 2017/2/16.
 */
window.onload = function(){
    //开场效果
    var tgb = document.getElementById("tbg");
    var Plants = document.getElementById("dPlants");
    var Zombies = document.getElementById("dZombies");
    var zombie = document.getElementById("zombie");
    var ground = document.getElementById("dAll");
    var num = document.getElementById("sSunNum");
    var img = document.getElementsByTagName("img");
    var number = num.innerHTML;var number1 = parseInt(number);
    var ZL = [];
    var PL = [];
    img[0].style.visibility="hidden";img[1].style.visibility = "visible";
    var canPlant =false;
    tgb.style.backgroundImage="url(images/interface/background1unsodded.jpg)";
    tgb.style.visibility="visible";
    var x = 0;
    //僵尸出现
    var timer = setInterval(function(){
        x = x - 20;
        tgb.style.backgroundPositionX= x + "px";
        if (x<=-500){
            clearInterval(timer);
            for(var n = 0 ; n<5; n++){var zombies = document.createElement("div");
                zombie.style.left = 550 + "px";
                zombies.style.position="absolute";
                zombies.style.zindex=10;
                zombies.innerHTML="<img src='images/interface/plantshadow32.png' style='position: absolute;left: 72px;top: 122px;'><img src='images/Zombies/Zombie/zombie123.gif' style='position:absolute;left:10px;top:0px'>";
                zombies.style.left= Math.random() * 186 + "px";
                zombies.style.top= Math.random() * 456 + "px";
                zombie.appendChild(zombies);
            }
        }
    }, 25);
    //种植函数
    var doplant = function(){
        var game = document.getElementById("dAll");
        var Pea = document.getElementById("dCardPeashooter");
        var img = document.getElementsByTagName("img");
        var grass = document.getElementById("dGrass");
        if (canPlant){
            img[1].style.visibility="hidden";img[0].style.visibility = "visible";
            //点击选项卡，选项卡变灰，创建一个植物
            Pea.onclick = function(){
                img[0].style.visibility="hidden";
                img[1].style.visibility = "visible";
                var PeaShooter = document.createElement("img");
                PeaShooter.src="images/Plants/Peashooter/Peashooter.gif";
                PeaShooter.style.zIndex = 999;
                PeaShooter.style.position="absolute";
                PeaShooter.style.top= "0px";
                PeaShooter.style.left = "0px";
                game.appendChild(PeaShooter);
                //创建透明射手
                var PeaShooterG = document.createElement("img");
                PeaShooterG.src="images/Plants/Peashooter/Peashooter.gif";
                PeaShooterG.style.zIndex = 992;
                PeaShooterG.style.position="absolute";
                PeaShooterG.style.top= "0px";
                PeaShooterG.style.left = "0px";
                PeaShooterG.style.opacity = 0.8;
                PeaShooterG.style.visibility = "hidden";
                PeaShooterG.style.filter = "alpha(opacity=80)";
                game.appendChild(PeaShooterG);
                //位移定位
                game.onmousemove = function(event){
                    var e = event || window.event;
                    PeaShooter.style.left = e.clientX - PeaShooter.offsetWidth/2 + "px";
                    PeaShooter.style.top = e.clientY - PeaShooter.offsetHeight/2 + "px";
                    if (e.clientY < grass.offsetTop || e.clientY > grass.offsetTop + grass.offsetHeight - PeaShooter.offsetHeight/2 || e.clientX < grass.offsetLeft || e.clientX > grass.offsetLeft + grass.offsetWidth)
                    {
                        PeaShooterG.style.visibility="hidden";
                        PeaShooter.onclick = function(){
                            game.removeChild(PeaShooter);
                            img[1].style.visibility="hidden";
                            img[0].style.visibility = "visible";
                            game.onmousemove = null;
                        }
                    }
                    else{
                        for (var n =1;n<=9;n++){
                            PeaShooterG.style.visibility = "visible";
                            if (e.clientX > (n-1)/9 * grass.offsetWidth + grass.offsetLeft && e.clientX < n/9 * grass.offsetWidth + grass.offsetLeft )
                            {   PeaShooterG.style.top = grass.offsetTop + grass.offsetHeight/2 - PeaShooterG.offsetHeight/2 + "px";
                                PeaShooterG.style.left = (n-0.5)/9*grass.offsetWidth - 0.5*PeaShooterG.offsetWidth + grass.offsetLeft + "px" ;
                                PeaShooter.onclick = function(){
                                    PeaShooter.style.top = PeaShooterG.offsetTop + "px";
                                    PeaShooter.style.left = PeaShooterG.offsetLeft + "px";
                                    var plant = new Plant();
                                    PL.push(plant);
                                    plant.doPlant(PeaShooter.offsetLeft,PeaShooter.offsetTop);
                                    game.removeChild(PeaShooter);
                                    game.onmousemove = null;
                                    img[1].style.visibility="hidden";
                                    img[0].style.visibility = "visible";
                                    game.removeChild(PeaShooterG);
                                    number1 -=100;num.innerHTML = number1;
                                    PeaShooter.onclick=null;
                                    if (number1>=100){canPlant=true;}else{canPlant = false};
                                    doplant();
                                }
                            }else{continue;}
                        }
                    }
                }};
        }else{img[0].style.visibility="hidden";
            img[1].style.visibility = "visible";Pea.onclick =null;}
    };
    //定义阳光函数
    function sun(){
        //产生阳光并从顶部随机出现
        var autopic = true;
        var game = document.getElementById("dAll");
        setInterval(function(){
            var sun = document.createElement("img");
            sun.style.position = "absolute";
            sun.style.top = "-78px";
            sun.style.left = (game.offsetWidth - 78) * Math.random() + "px";
            sun.src="images/interface/Sun.gif";
            sun.style.cursor = "pointer";
            sun.style.zIndex = 999;
            sun.style.width = "78px";
            sun.style.height = "78px";
            sun.style.opacity = 0.8;
            sun.style.filter = "alpha(opacity = 80)";
            game.appendChild(sun);
            var ai = 0;
            //阳光跌落到随机高度
            var Chight = Math.random() * (game.offsetHeight - 78);
            var n = 3;
            var timer = setInterval(function(){
                sun.style.top = sun.offsetTop + n + "px";
                if (sun.offsetTop >= Chight){
                    clearInterval(timer);
                    ai = setTimeout(function(){
                        if (autopic == true){sun.onclick();} else{game.removeChild(sun)}
                    },5000);};
            },30);
            //阳光斜飞至积分榜
            sun.onclick = function(){
                sun.onclick = null;
                clearTimeout(ai);
                clearInterval(timer);
                var a = sun.offsetTop;
                var b = sun.offsetLeft -10;
                var c = Math.sqrt(a*a + b*b);
                var SpeedX = b/c;
                var SpeedY = a/c;
                var speed = 10;
                var timer2 =  setInterval(function(){
                    sun.style.top = sun.offsetTop - SpeedY*speed + "px";
                    sun.style.left = sun.offsetLeft - SpeedX*speed  + "px";
                    if (sun.offsetLeft <=10 || sun.offsetTop <= 0)
                    {   clearInterval(timer2);
                        sun.style.top="0px";
                        sun.style.left="10px";
                        if (number1<200){number1 +=10;
                            num.innerHTML = number1}; if (number1 >=100){canPlant = true;}else{canPlant = false;}
                        doplant();game.removeChild(sun);}
                },30)
            }
        },3000)
    }
    //场景拉回
    setTimeout(function(){
            //计分牌出现
            var writer = $("#dTop");
            $("#dCardList").fadeIn(2000);
            writer.fadeIn(2000,function(){alert("游戏已经开始！种植豌豆射手来抵御僵尸的入侵吧！");sun();});
            zombie.style.left = "1400px";
            var x1 = -500;
            var timer2 = setInterval(function(){
                x1 = x1+25;
                tgb.style.backgroundPositionX = x1 + "px" ;
                if (parseInt(tgb.style.backgroundPositionX) >= -115){
                    clearInterval(timer2);
                    //草坪平铺
                    var grass = document.createElement("div");
                    grass.style.position = "absolute";
                    grass.style.height="117px";
                    grass.style.width="70px";
                    grass.style.top="280px";
                    grass.style.left="150px";
                    grass.style.zIndex= 990;
                    grass.id="dGrass";
                    grass.style.background = "url(./images/interface/sod1row.png) no-repeat 0px 0px";
                    ground.appendChild(grass);
                    var ZombieTimer = setInterval(create,10000);
                    var grassRoll = document.createElement("img");
                    grassRoll.style.position = "absolute";
                    grassRoll.style.height= "141px";
                    grassRoll.style.width="68px";
                    grassRoll.style.top="250px";
                    grassRoll.style.left="150px";
                    grassRoll.style.zIndex=991;
                    grassRoll.src="images/interface/SodRoll.png";
                    ground.appendChild(grassRoll);
                    var grassRollCap = document.createElement("img");grassRollCap.style.position = "absolute";grassRollCap.style.height= "71px";grassRollCap.style.zIndex = 999;
                    grassRollCap.style.width="73px";grassRollCap.style.top="345px";grassRollCap.style.left="150px";grassRollCap.src="images/interface/cup.png";
                    ground.appendChild(grassRollCap);
                    var L = 20; var L1 = 1;
                    var timer3 = setInterval(function(){
                        grass.style.width = grass.offsetWidth + L  + "px";
                        grassRoll.style.left = grassRoll.offsetLeft + L + L1 + "px";
                        grassRollCap.style.left = grassRollCap.offsetLeft + L1 + L + "px";
                        grassRoll.style.width =  grassRoll.offsetWidth - L1 + "px";
                        grassRollCap.style.height = grassRollCap.offsetHeight - L1 + "px";
                        grassRollCap.style.width = grassRollCap.offsetWidth - L1 + "px";
                        grassRollCap.style.top = grassRollCap.offsetTop + L1 + "px";
                        if (grass.offsetWidth >= 900){clearInterval(timer3);ground.removeChild(grassRoll);ground.removeChild(grassRollCap)}
                    },30);
                }
            },15.4);}
        ,2000);
    //僵尸类
    function Zombie(){
        this.blood = 8;
        this.js = this.init();
        this.start = this.check();
    }
    Zombie.prototype.init = function(){
        var grass = document.getElementById("dGrass");
        var js = document.createElement("div");
        js.innerHTML ='<img src="images/interface/plantshadow32.png" style="position:absolute;left:70px;top:122px;"><img src="images/Zombies/Zombie/Zombie.gif"style="position:absolute;left:0px;">';
        js.style.top = "226px";
        js.style.zIndex = 0;
        js.style.left = grass.offsetWidth + grass.offsetLeft -200 + "px";
        Zombies.appendChild(js);
        return js;
    };
    Zombie.prototype.walk = function(){
        var This = this;
        var Image = this.js.getElementsByTagName("img");
        Image[1].src= "images/Zombies/Zombie/Zombie.gif";
        this.ZombieWalker = setInterval(function(){
            This.js.style.left = This.js.offsetLeft - 0.6 + "px";
        },60);
    };
    Zombie.prototype.check = function(){
        var This = this;
        var grass = document.getElementById("dGrass");
        This.checktimer = setInterval(function(){
                if (This.blood <=0){This.dead()}
                else {
                    if (PL.length>0){
                        var g = PL;
                        for(var i = 0;i<PL.length;i++)
                            for(var j=i+1;j<PL.length;j++){
                                if (PL[i].zw.offsetLeft<PL[j].zw.offsetLeft){var C = PL[i];PL[i]=PL[j];PL[j] = C}
                            }
                        var zww = null;
                        for(var d=0;d<PL.length;d++){if (PL[d].zw.offsetLeft<This.js.offsetLeft && PL[d].blood>0){zww = PL[d];break}}
                        if (zww !=null){
                            PL = g;
                            if (This.blood ==2){This.dropHead()}
                            if (This.blood>2 && This.js.offsetLeft > zww.zw.offsetLeft + 20){This.stopWalk();This.walk()}
                            if (This.blood==2 && This.js.offsetLeft > zww.zw.offsetLeft + 20){This.stopWalk();This.WithoutHead()}
                            if (This.blood<2 && This.js.offsetLeft > zww.zw.offsetLeft + 20){This.stopWalk();This.WithoutHead()}
                        }
                        else{PL = g;if (This.blood>2){This.stopWalk();This.walk()}
                            if (This.blood==2){This.stopWalk();setTimeout(This.WithoutHead(),800)}
                            if (This.blood<2){This.stopWalk();This.WithoutHead()}}}
                    else{if (This.blood>2){This.stopWalk();This.walk()}
                        if (This.blood==2){This.stopWalk();setTimeout(This.WithoutHead(),800)}
                        if (This.blood<2){This.stopWalk();This.WithoutHead()}}
                }
                if (This.js.offsetLeft <= grass.offsetLeft - 80){This.stopWalk();alert("僵尸吃掉了你的脑子！");location.href="index.html";}
            }
            ,2000);
        This.attackTimer = setInterval(function () {
            var g = PL;
            for(var i = 0;i<PL.length;i++)
                for(var j=i+1;j<PL.length;j++){
                    if (PL[i].zw.offsetLeft<PL[j].zw.offsetLeft){var C = PL[i];PL[i]=PL[j];PL[j] = C}
                }
            var zww = null;
            for(var d=0;d<PL.length;d++){if (PL[d].zw.offsetLeft<This.js.offsetLeft && PL[d].blood>0){zww = PL[d];break}}
            if (zww !=null){
                PL=g;
                if(This.js.offsetLeft>zww.zw.offsetLeft && This.blood > 2 && This.js.offsetLeft <= zww.zw.offsetLeft + 10){
                    This.stopWalk();This.attack();}
                if (This.js.offsetLeft>zww.zw.offsetLeft && This.blood <=2 && This.js.offsetLeft <= zww.zw.offsetLeft + 10 ){
                    This.stopWalk();This.NoHeadAttack();
                }}
        },400)
    };
    Zombie.prototype.dead = function(){
        this.stopWalk();
        clearInterval(this.checktimer);
        var This =this;
        var Image = this.js.getElementsByTagName("img");
        Image[1].src= "images/Zombies/Zombie/ZombieDie.gif";
        setTimeout(function(){Zombies.removeChild(This.js)},2000)
        ZL.shift();
    };
    Zombie.prototype.dropHead = function(){
        var Head = document.createElement("img");
        Head.src="images/Zombies/Zombie/ZombieHead.gif";
        Head.style.position="absolute";
        Head.style.left =  this.js.offsetLeft +"px";
        Head.style.top=  this.js.offsetTop  +"px";
        Zombies.appendChild(Head);
        setTimeout(function(){
            Zombies.removeChild(Head);
        },1200)
    };
    Zombie.prototype.WithoutHead = function(){
        clearInterval(this.ZombieWalker);
        var This = this;
        var Image = this.js.getElementsByTagName("img");
        Image[1].src= "images/Zombies/Zombie/ZombieLostHead.gif";
        this.NoHeadWalker = setInterval(function(){
            This.js.style.left = This.js.offsetLeft - 0.6 + "px";
        },60)
    };
    Zombie.prototype.stopWalk = function(){
        clearInterval(this.NoHeadWalker || this.ZombieWalker);
    };
    Zombie.prototype.attack = function(){
        var Image = this.js.getElementsByTagName("img");
        Image[1].src= "images/Zombies/Zombie/ZombieAttack.gif";
    };
    Zombie.prototype.NoHeadAttack = function(){
        var Image = this.js.getElementsByTagName("img");
        Image[1].src= "images/Zombies/Zombie/ZombieLostHeadAttack.gif";
    };
    function create(){
        var zombie = new Zombie();
        ZL.push(zombie);
        zombie.walk();
    }
    //定义植物类
    function Plant(){
        this.zw = this.init();
        this.pc = this.pcheck();
        this.blood = 5;}
    Plant.prototype.pcheck = function(){
        var This = this;
        this.hptimer = setInterval(function(){
            if (This.blood <=0){This.dead()}
            if (ZL.length>0){
                var g = ZL;
                for(var i = 0;i<ZL.length;i++)
                    for(var j=i+1;j<ZL.length;j++){
                        if (ZL[i].js.offsetLeft>ZL[j].js.offsetLeft){var b = ZL[i];ZL[i]=ZL[j];ZL[j] = b}
                    }
                var sz = null;
                for(var a=0;a<ZL.length;a++){if (ZL[a].js.offsetLeft>This.zw.offsetLeft && ZL[a].blood>0){sz = ZL[a];break}}
                if (sz != null){ZL = g;
                    if (This.zw.offsetLeft + 10 >= sz.js.offsetLeft){
                        This.blood = This.blood - 0.035;
                    }}}}, 30)
        this.ptimer = setInterval(function(){
            if (ZL.length>0){
                var g =ZL;
                for(var i = 0;i<ZL.length;i++)
                    for(var j=i+1;j<ZL.length;j++){
                        if (ZL[i].js.offsetLeft>ZL[j].js.offsetLeft){var b = ZL[i];ZL[i]=ZL[j];ZL[j] = b}
                    }
                var sz = null;
                for(var a=0;a<ZL.length;a++){if (ZL[a].js.offsetLeft>This.zw.offsetLeft && ZL[a].blood>0){sz = ZL[a];break}}
                if (sz != null){
                    ZL = g;
                    This.shoot(sz);
                }}
        },2000)

    };
    Plant.prototype.init = function(){
        var zw = document.createElement("div");
        zw.innerHTML = '<img src="images/interface/plantshadow32.png" style="left:-12px;top: 49px;" ><img src="images/Plants/Peashooter/Peashooter.gif"style="left:0px;">';
        return zw;};
    Plant.prototype.doPlant = function(left,top){
        this.zw.style.left = (left || 200) + "px";
        this.zw.style.top = (top || 294) + "px";
        Plants.appendChild(this.zw);};
    Plant.prototype.dead = function(){
        clearInterval(this.hptimer);
        clearInterval(this.shootTimer);
        clearInterval(this.ptimer);
        var This = this;
        setTimeout(function(){Plants.removeChild(This.zw);PL.shift();},500);
    };
    Plant.prototype.createBall = function(){
        var Ball = document.createElement("img");
        Ball.src="images/Plants/PB00.gif";
        Ball.style.left = this.zw.offsetLeft + this.zw.offsetWidth + 30 + "px";
        Ball.style.top = this.zw.offsetTop + 2 + "px";
        Ball.style.zIndex= 999;
        Zombies.appendChild(Ball);
        return Ball;}
    Plant.prototype.shoot = function(js){
        var This =this;
        var grass = document.getElementById("dGrass");
        var MBall = This.createBall();
        var BallTimer = setInterval(function(){
            MBall.style.left = MBall.offsetLeft + 5 + "px";
            if (MBall.offsetLeft > grass.offsetLeft + grass.offsetWidth + 30)
            {
                clearInterval(BallTimer);
                Zombies.removeChild(MBall);
            }else if (MBall.offsetLeft - 30 >= js.js.offsetLeft && js.blood>0){
                clearInterval(BallTimer);
                MBall.src="images/Plants/PeaBulletHit.gif";
                js.blood--;
                setTimeout(function(){Zombies.removeChild(MBall)},300);
            }
        },10);
    };
    Plant.prototype.stopShoot = function(){
        clearInterval(this.shootTimer);
    };
}