$.fn.make2048 = function(Coption){
    var Foption = {
        a:150
    };
    var defaultOption = {
        width: 5,
        height: 5,
        style:  {
          background:"rgb(200,200,169)",radius:15,padding:20, Block_length:Foption.a,
            Block_background:"rgb(131,122,155)"
        },
        DateBox:[
            {level:0,value:"<img src='imgs/00.jpg'width="+Foption.a+ "height=" + Foption.a + ">",num:2,style:{"border":"5px solid pink"}},
            {level:1,value:"<img src='imgs/01.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:4,style:{"border":"5px solid white"}},
            {level:2,value:"<img src='imgs/02.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:8,style:{"border":"5px solid green"}},
            {level:3,value:"<img src='imgs/03.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:16,style:{"border":"5px solid green"}},
            {level:4,value:"<img src='imgs/04.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:32,style:{"border":"5px solid yellow"}},
            {level:5,value:"<img src='imgs/05.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:64,style:{"border":"5px solid yellow"}},
            {level:6,value:"<img src='imgs/06.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:128,style:{"border":"5px solid yellow"}},
            {level:7,value:"<img src='imgs/07.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:256,style:{"border":"5px solid yellow"}},
            {level:8,value:"<img src='imgs/08.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:512,style:{"border":"5px solid blue"}},
            {level:9,value:"<img src='imgs/09.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:1024,style:{"border":"5px solid blue"}},
            {level:10,value:"<img src='imgs/10.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:2048,style:{"border":"5px solid orange"}},
            {level:11,value:"<img src='imgs/11.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:4096,style:{"border":"5px solid orange"}},
            {level:12,value:"<img src='imgs/12.jpg' width="+Foption.a+ "height=" + Foption.a + ">",num:8192,style:{"border":"5px solid orange"}},

        ],
        animateSpeed:500
    };
    var $state=[];
    var option = $.extend({},defaultOption,Coption);
    var $this = $(this);
    var Height = (option.style.Block_length + option.style.padding)*option.height+option.style.padding;
    var Width = (option.style.Block_length + option.style.padding)*option.width+option.style.padding;
    $this.css({"background-color":option.style.background,
               "position":"relative",
              "border-radius":option.style.radius,
              "height": Height,
              "width":Width,"webkit-user-select":"none"})


    //方法区
    //通过坐标获取放置位置
    var getPosition = function(x,y){
        return {
            x : option.style.padding + x*(option.style.Block_length + option.style.padding),
            y : option.style.padding + y*(option.style.Block_length + option.style.padding)
        }
    }
    //得到游戏数据state数组中的空对象索引
    var getEmptyIndex =function () {
        var list = [];
        $state.map(function(o,i){
            if (o == null){
                list.push(i)
            }
        });
        return list
    };
    //通过索引值获取坐标
    var getCondiate = function(index){
        return{
            x:index % option.width ,y: Math.floor(index/option.width)
        }
    };
    //通过坐标获取对象
    var getBlock = function(x,y){
      return $state[y*option.width+x]
    }

    //通过坐标获取索引值
    var getIndex = function(x,y){
        return y*option.width + x
    };
    //游戏结束
    var GameEnding = function(){
        var score = 0;
        $(document).off("keydown",keyHandler);
        for(var i = 0;i<$state.length;i++)
        {
            if ($state[i] == null ) continue;
            score += Math.pow(2,$state[i].level+1);
        }

        var $title = $("<h4>阴阳师小游戏已经结束了</h4>");
        $title.css({"font-size":40,"color":"red"});
        var $result = $("<p>阴阳师您的的斗技分是"+ score + "分</p>");
        $result.css({"font-size":30});
        var $btn = $("<button>再玩一次</button>");
        $btn.css({"width":0.15*Width + "px","height":0.05*Height + "px","margin-top":0.05*Height + "px"});
        $btn.on("click",gameStart);
        var $GameBox = $("<div></div>>");
        $GameBox.css({ "background":"rgb(174,221,215)" ,
            "border-radius": option.style.padding,
            "position": "absolute",
            "-webkit-user-select": "none",
            "opacity": 0.7,
            "width": $this.width(),
            "height": $this.height()});
        var $content = $("<div></div>");
        $content.css({ "width": 0.8*Width + "px",
            "height":0.4*Height + "px",
            "text-align": "center",
            "margin": "0 auto",
            "position": "absolute",
            "top": "50%",
            "opacity":1,
            "transform": "translate(-50%, -50%)",
            "left": "50%",
            "padding": 10,
             "border": "4px blue solid","background":"rosybrown"});
        $content.append($title);
        $content.append($result);
        $content.append($btn);
        $GameBox.append($content);
        $this.append($GameBox);
    };
    var GameEnd = function () {
        setTimeout(GameEnding,1000)
    };
    window.end=GameEnd;
    //方法区

    var buildDiv = function(){
        var SmBox = [];
        for(var x = 0;x<option.width;x++)
        {
            for(var y = 0;y<option.height;y++)
            {
                $state.push(null);
                var $block = $("<div></div>");
                var position = getPosition(x,y);
                $block.css({
                   "height":option.style.Block_length,
                    "width":option.style.Block_length,
                    "background":option.style.Block_background,
                    "position":"absolute",
                    "top": position.y,
                    "left": position.x
                });
                SmBox.push($block);
            }
        }
        $this.append(SmBox);
        };
    var FillBlock = function(level,x,y){
        var block;
        if(level != undefined){block = option.DateBox[level]}
        else
        {block = Math.random()>=0.5 ? option.DateBox[0]:option.DateBox[1];}


        var EmptyIndex = getEmptyIndex();//[0,1,2,3,4.....16];
        if (EmptyIndex == 0 ) {return false}
        var ChooseIndex;
        if(x != undefined && y != undefined){ChooseIndex = x + y*option.width}
        else
        {ChooseIndex = EmptyIndex[Math.floor(Math.random()*EmptyIndex.length)]};
        var $img = $("<div></div>");
        $img.level = block.level;
        var Condiate = getCondiate(ChooseIndex);
        $img.addClass("block_" + Condiate.x + Condiate.y);
        var Position = getPosition(Condiate.x,Condiate.y);
        $img.css($.extend({},{"width":0,"height":0,
            "position":"absolute", "top": Position.y + 0.5*option.style.Block_length,
            "left": Position.x + option.style.Block_length/2},block.style));
        $img.html(block.value);
        $this.append($img);
        $img.animate({"width":option.style.Block_length,
            "height":option.style.Block_length,"top": Position.y,
            "left": Position.x},option.animateSpeed,function(){

        });
        $state[ChooseIndex] = $img;
        EmptyIndex = getEmptyIndex();
        if (EmptyIndex.length == 1)
        {
            var canmove = false;
            for(var x = 0;x<option.width;x++)
                for(var y=0; y<option.height;y++)
                {
                    console.log(x,y);
                    if ($state[getIndex(x,y)] == null){continue}
                    if (x>0 && $state[getIndex(x-1,y)]&& $state[getIndex(x,y)].level == $state[getIndex(x-1,y)].level)
                    {canmove = true;
                      break;}
                    if (x<option.width-1 && $state[getIndex(x+1,y)] && $state[getIndex(x+1,y)].level == $state[getIndex(x,y)].level)
                    {
                        canmove = true;
                        break;
                    }
                    if (y>0 && $state[getIndex(x,y-1)] && $state[getIndex(x,y)].level == $state[getIndex(x,y-1)].level)
                    {
                        canmove = true;
                        break;
                    }
                    if (y<option.height-1  && $state[getIndex(x,y+1)] && $state[getIndex(x,y)].level == $state[getIndex(x,y+1)].level)
                    {
                        canmove = true;
                        break;
                    }
                }
               if (!canmove)
               {
                console.log(canmove);
                GameEnd()}
                }

    };
    var move = function(direction){
        var startX,startY,modifyX,modifyY,endX,endY;
        var lastMovedTime = 0;
        if (new Date() - lastMovedTime < 1000)
        {   lastMovedTime = new Date();
            return;}
        var doActioned = false;
        switch(direction){
            case "up":  startX =0;  modifyX=0;       endX=option.width-1; startY=1;              modifyY=-1;  endY=option.height-1;break;

            case "down":startX=0;   modifyX=0;       endX=option.width-1; startY=option.height-2;modifyY=1;   endY=0;break;

            case "left":   startX=1;    modifyX=-1 ; endX=option.width-1; startY=0;              modifyY=0;   endY=option.height-1;break;

            case "right":  startX=option.width-2;    modifyX=1 ; endX=0; startY=0;              modifyY=0;   endY=option.height-1;break;
        };
        for(var x=startX;x<=Math.max(startX,endX) && x>=Math.min(startX,endX);endX>startX?x++:x--)
            for(var y=startY;y<=Math.max(startY,endY)&&y>=Math.min(startY,endY);endY>startY?y++:y--)
            {
                var block = getBlock(x,y);
                if (block == null) continue;
                var targetBlock;//一定存在。可能是上一行或下一列
                var targetCoordinate={x:x,y:y};
                var move = 0;
                do {
                    targetCoordinate.x += modifyX;
                    targetCoordinate.y += modifyY;
                    targetBlock = getBlock(targetCoordinate.x,targetCoordinate.y);
                    if (direction == "up" || direction == "down")
                        if (targetCoordinate.y ==0 || targetCoordinate.y == option.height-1)
                            break;
                    if (direction=="left"||direction=="right")
                        if (targetCoordinate.x == 0 || targetCoordinate.x == option.width-1)
                            break;
                    if (++move>Math.max(option.width-1,option.height-1))
                        break
                }while (targetBlock == null);
                var BlockDom = $(".block_" + x + y);
                if (targetBlock==null)
                {var Position =getPosition(targetCoordinate.x,targetCoordinate.y)
                    $state[getIndex(targetCoordinate.x,targetCoordinate.y)]=block;
                    $state[getIndex(x,y)] = null;
                    BlockDom.removeClass();
                    BlockDom.addClass("block_" + targetCoordinate.x + targetCoordinate.y);
                    BlockDom.animate
                    ({top:Position.y, left:Position.x},option.animateSpeed);
                }else if (targetBlock.html() == block.html() && !targetBlock.justModified)
                {
                    var Position = getPosition(targetCoordinate.x,targetCoordinate.y);
                    var level = $state[getIndex(targetCoordinate.x,targetCoordinate.y)].level;
                    level += 1;
                    $state[getIndex(targetCoordinate.x,targetCoordinate.y)].html(option.DateBox[level].value);
                    $state[getIndex(targetCoordinate.x,targetCoordinate.y)].level = level;
                    $state[getIndex(x,y)].html("");
                    $state[getIndex(x,y)] = null;
                    BlockDom.removeClass();
                    BlockDom.addClass("block_"+targetCoordinate.x+targetCoordinate.y);
                    BlockDom.animate({top:Position.y,left:Position.x},option.animateSpeed);
                    targetBlock.justModified=true;
                    if (level == option.DateBox.length-1)
                    {
                        GameEnd();
                    }
                }
                else if(move>1 || targetBlock.html() !== block.html()||targetBlock.justModified)
                {
                    if (direction == "left" || direction =="right")
                    {targetCoordinate.x = targetCoordinate.x-modifyX;}
                    if (direction =="up" || direction =="down")
                    {targetCoordinate.y = targetCoordinate.y-modifyY;}
                    var Position = getPosition(targetCoordinate.x,targetCoordinate.y);
                    if (targetCoordinate.x == x && targetCoordinate.y== y){continue};
                    $state[getIndex(targetCoordinate.x,targetCoordinate.y)] = block;
                    $state[getIndex(x,y)]=null;
                    BlockDom.removeClass();
                    BlockDom.addClass("block_"+targetCoordinate.x + targetCoordinate.y);
                    BlockDom.animate({top:Position.y,left:Position.x},option.animateSpeed);
                }else {continue;}
                doActioned = true;
            }
            for(var x= 0;x<option.width;x++)
                for(var y=0;y<option.height;y++)
                  {var block = getBlock(x,y);
                      if (block == null)
                          {continue}
                             else
                               delete block.justModified;
            }
            if (doActioned){FillBlock()}
            };
    window.Rmove = move;
    var keyHandler = function(evt){
        switch (evt.which)
        {
            case 38:
                move("up");
                break;
            case 40:
                move("down");
                break;
            case 37:
                move("left");
                break;
            case 39:
                move("right");
                break;
        }
    };
    //游戏开始
    var gameStart = function(){
        $this.html("");
        $state = [];
        buildDiv();
        $(document).on("keydown",keyHandler);
        FillBlock(0,1,0);
        FillBlock(0,1,1);
        FillBlock(1,1,2);
        FillBlock(2,0,1);
        FillBlock(3.0,2);
        alert("游戏开始！移动方块来合成式神！最终召唤茨木大人吧！");
    };
    return{
        start:gameStart()
    }

};




