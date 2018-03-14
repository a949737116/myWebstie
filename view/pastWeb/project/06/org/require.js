/**
 * Created by Administrator on 2017/5/8.
 */
var app = angular.module('mp',['ui.router']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state(
        'home',{
            url:'/home',
            views:{
                top:{templateUrl:'view/top.html'},
                container:{templateUrl:'view/container.html'},
                footer:{templateUrl:'view/footer.html'}
            }
        }
    )
}]);
app.filter('price',function(){
    return function(m){
        var c = m.toFixed(1) + "元";
        return c
    };
});
app.controller('mc',['$scope','$filter',function($scope,$filter){
    $scope.goods = [
        {id:1,name:'王者荣耀中单法师英雄周瑜',price:58.8,count:10,buy:0,choose:false},
        {id:2,name:'王者荣耀野区打野英雄娜可露露',price:88.8,count:5,buy:0,choose:false},
        {id:3,name:'王者荣耀下路射手英雄虞姬',price:58.8,count:7,buy:0,choose:false},
        {id:4,name:'王者荣耀上单战士英雄老夫子',price:58.8,count:4,buy:0,choose:false},
        {id:5,name:'王者荣耀下路射手英雄马可波罗',price:58.8,count:20,buy:0,choose:false},
        {id:6,name:'王者荣耀上单战士英雄吕布',price:68.8,count:15,buy:0,choose:false},
        {id:7,name:'王者荣耀后羿皮肤阿尔法小队',price:58.8,count:11,buy:0,choose:false},
        {id:8,name:'王者荣耀墨子皮肤金属风暴',price:58.8,count:25,buy:0,choose:false},
        {id:9,name:'王者荣耀孙膑皮肤天使之翼',price:88.8,count:11,buy:0,choose:false},
        {id:10,name:'王者荣耀李白皮肤千年之狐',price:76.8,count:18,buy:0,choose:false},
        {id:11,name:'王者荣耀姜子牙皮肤时尚教父',price:28.8,count:19,buy:0,choose:false},
        {id:12,name:'王者荣耀露娜皮肤紫霞仙子',price:78.8,count:2,buy:0,choose:false},
    ];
    $scope.lists = [
        {id:1,name:'王者荣耀中单法师英雄周瑜',price:58.8,count:10,buy:0,choose:false},
        {id:2,name:'王者荣耀野区打野英雄娜可露露',price:88.8,count:5,buy:0,choose:false},
        {id:3,name:'王者荣耀下路射手英雄虞姬',price:58.8,count:7,buy:0,choose:false},
        {id:4,name:'王者荣耀上单战士英雄老夫子',price:58.8,count:4,buy:0,choose:false},
        {id:5,name:'王者荣耀下路射手英雄马可波罗',price:58.8,count:20,buy:0,choose:false},
        {id:6,name:'王者荣耀上单战士英雄吕布',price:68.8,count:15,buy:0,choose:false},
        {id:7,name:'王者荣耀后羿皮肤阿尔法小队',price:58.8,count:11,buy:0,choose:false},
        {id:8,name:'王者荣耀墨子皮肤金属风暴',price:58.8,count:25,buy:0,choose:false},
        {id:9,name:'王者荣耀孙膑皮肤天使之翼',price:88.8,count:11,buy:0,choose:false},
        {id:10,name:'王者荣耀李白皮肤千年之狐',price:76.8,count:18,buy:0,choose:false},
        {id:11,name:'王者荣耀姜子牙皮肤时尚教父',price:28.8,count:19,buy:0,choose:false},
        {id:12,name:'王者荣耀露娜皮肤紫霞仙子',price:78.8,count:2,buy:0,choose:false},
    ];
    $scope.orderBy = function(filed){
        if (arguments.callee[filed] == undefined){
            arguments.callee[filed] = false;
        }else{
            arguments.callee[filed] = !arguments.callee[filed];
        }
        $scope.lists = $filter('orderBy')($scope.goods,filed,arguments.callee[filed]);
    };
    $scope.$watch('search',function(n,o){
        $scope.lists = $filter('filter')($scope.goods,n)
    });
    $scope.totalnum = function(){
        var num = 0;
        angular.forEach($scope.goods,function(v){
            if (v.choose == true){num += v.buy;}
        });
        return num + "件";
    };
    $scope.addGood = function(item){
        if (item.buy >= item.count){
            alert("商品库存不足！")
        }else{
            item.buy++;
        }
    };
    $scope.removeGood = function(item){
        if (item.buy <= 0){
            alert("购买数量不能少于0！")
        }else{
            item.buy--;
        }
    };
    $scope.totalPrice = function(){
        var money = 0 ;
        angular.forEach($scope.goods,function(v){
            if (v.choose == true){money += v.buy * v.price;}
        });
        return money;
    };
    $scope.checkAll =function(n){
        angular.forEach($scope.goods,function(v){
            v.choose = n;
        });
        $scope.all = n;
    }
}]);