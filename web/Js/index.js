$(function () {
    function checkState(url){
        var img = new Image();
        img.src = url;
        img.onload = function () {
            setTimeout(function(){
                $("#loadingPanel").hide();
                $("#show").show();},2000);
        }
    }
    function loadingPic(url){
        var img = new Image();
        img.src = url;
    };
    var args = {time:new Date()};
    var btnList = $(".navBtn li");
    $("#HomeBtn").click(function(){
        $.each(btnList,function (i) {
            $(btnList[i]).removeClass("active");
        });
        $(btnList[0]).addClass("active");
        var url = this.href;
        $.get({
            async: false,
           url:url,
            data:args,
            beforeSend:function () {
                $("#show").hide();
                $("#loadingPanel").show();
            },
            success:function (response) {
                $("#show").html(response);
            },
            complete:function(){
                var url = "imgs/bg.jpg";
                checkState(url);
                var url1 = "imgs/homeBg.jpg"
                loadingPic(url1);
            }
        });
        return false;
    });
    $("#PersonalBtn").click(function () {
        $.each(btnList,function (i) {
            $(btnList[i]).removeClass("active");
        });
        $(btnList[1]).addClass("active");
        var url = this.href;
        $.get({
            url:url,
            data:args,
            beforeSend:function () {
                $("#show").hide();
                $("#loadingPanel").show();
            },
            success:function (response) {
                $("#show").html(response);
            },
            complete:function(){
                var url = "imgs/person/3.jpg";
                checkState(url);
                var url1 = "imgs/person/2.jpg";
                var url2 = "imgs/person/1.jpg";
                loadingPic(url1);
                loadingPic(url2);
            }
        });
        return false;
    });
    $("#ProjectBtn").click(function(){
        $.each(btnList,function (i) {
            $(btnList[i]).removeClass("active");
        });
        $(btnList[2]).addClass("active");
        var url = this.href;
        $.get({
            url:url,
            data:args,
            beforeSend:function () {
                $("#show").hide();
                $("#loadingPanel").show();
            },
            success:function (response) {
                $("#show").html(response);
            },
            complete:function(){
                var url = "imgs/project/bg_projects.png"
                checkState(url);
            }
        });
        return false;
    });
    $("#HomeBtn").click();
});