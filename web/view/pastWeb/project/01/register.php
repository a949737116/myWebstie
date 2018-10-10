<?php
session_start();
$a = $_SESSION['code'];
$b = $_POST['user1'];
if ($a != $b){
    exit("验证码错误！！");
}
//网页的UTF-8
header("Content-type: text/html; charset=utf-8");
//停止报错
error_reporting(0);
//连接数据库
$conn = mysql_connect('sqld-hk.bcehost.com','5f047fac306145f8948c72ea651d107d','e3ca7239073044619af186d2b65910cd');
if(!$conn ){exit("数据库连接失败");};
mysql_select_db('SdkbYUKszCJDQaixZwTa');
mysql_query('set names utf8');
//获取表单提交数据
$name = $_POST['user'];
$pass = $_POST['passwd'];
$cass = $_POST['pass'];
$tel = $_POST['tele'];
//表单检验
if(!$name || !$pass || !$cass ||!$tel){
exit('信息不完整</br>请等待浏览器自动跳转或点击<a href="javascript:history.back(-1);">返回</a>进行重试<script>setTimeout(function(){history.back(-1)},5000)</script>');
};
if($pass != $cass){exit('两次密码输入不同!</br>请等待浏览器自动跳转或点击<a href="javascript:history.back(-1);">返回</a>进行重试<script>setTimeout(function(){history.back(-1)},5000)</script>');};
$sql = "SELECT * FROM QQ WHERE name = '$name'";
$res = mysql_query($sql);
$row = mysql_fetch_assoc($res);
if($row['name'] != ''){
exit('该用户名已被注册！</br>请等待浏览器自动跳转或点击<a href="javascript:history.back(-1);">返回</a>进行重试<script>setTimeout(function(){history.back(-1)},5000)</script>');
}else{$pass = md5($pass);mysql_query("INSERT INTO QQ(name,password,tel) VALUES('$name','$pass','$tel')");
echo('注册成功！</br>
即将<a href="javascript:window.location.href=\'login.html\';">返回</a>登录界面！
<script>setTimeout(function(){window.location.href="login.html"},5000)</script>');}
mysql_close();?>





