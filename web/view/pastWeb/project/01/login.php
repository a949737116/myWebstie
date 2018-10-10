<?php
session_start();
header("Content-type: text/html; charset=utf-8");
error_reporting(0);
$conn = mysql_connect('localhost','root','');
if(!$conn ){exit("数据库连接失败");};
mysql_select_db('SdkbYUKszCJDQaixZwTa');
mysql_query('set names utf8');
$name = $_POST['username'];
$pass = $_POST['pass'];
//表单检验
if(!$name || !$pass){
exit('登录信息不完整!</br>请等待浏览器自动跳转或点击<a href="javascript:history.back(-1);">返回</a>进行重试<script>setTimeout(function(){history.back(-1)},5000)</script>');
};
$sql = "SELECT * FROM QQ WHERE name = '$name'";
$res = mysql_query($sql);
$row = mysql_fetch_assoc($res);
if($row['name'] == ""){exit('用户名不存在！</br>请等待浏览器自动跳转或点击<a href="javascript:history.back(-1);">返回</a>进行重试<script>setTimeout(function(){history.back(-1)},5000)</script>');}
else if($row['password'] != md5($pass) )
{exit('密码不正确!</br>请等待浏览器自动跳转或点击<a href="javascript:history.back(-1);">返回</a>进行重试<script>setTimeout(function(){history.back(-1)},5000)</script>');}
else{$_SESSION['user'] = $row['tel'];
exit('登录成功!</br>即将<a href="javascript:window.location.href=\'index1.php\';">返回</a>主界面
<script>setTimeout(function(){
window.location.href = "index1.php"
},5000)</script>');}
mysql_close();
?>