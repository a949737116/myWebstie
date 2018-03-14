<?php
 session_start();
 function getCode($m=4,$type=0){
         $str = "0123456789abcdefghijklmnopqrstuywxyzQWERTYUIOPLKJHGFDSAZXCVBNM";
         $t = array(9,35,strlen($str)-1);
         //随机生成验证码所需内容
         $c="";
         for($i=0;$i<$m;$i++){
          $c.= $str[rand(0,$t[$type])];
          }
          return $c;
 }

 $num = 4;//验证码长度
 $str = getCode($num,0);//使用下面的自定义函数,获取需要的验证码值
 $height = 30;$width = $num*20;
 $im = imagecreatetruecolor($width,$height);//创建一个画布
//定义几个颜色
 $c[0] = imagecolorallocate($im,111,0,55);
 $c[1] = imagecolorallocate($im,0,77,0);
 $c[2] = imagecolorallocate($im,221,111,0);
 $c[3] = imagecolorallocate($im,0,0,160);
 $c[4] = imagecolorallocate($im,220,0,0);
 $c[5] = imagecolorallocate($im,111,0,55);
 $bg = imagecolorallocate($im,220,220,220);//背景颜色
 imagefill($im,0,0,$bg);
 imagerectangle($im,0,0,$width-1,$height-1,$c[rand(0,5)]);
 //干扰点
  for($i=0;$i<200;$i++){
      $b = imagecolorallocate($im,rand(0,255),rand(0,255),rand(0,255));
      imagesetpixel($im,rand(0,$width),rand(0,$height),$b);
  }
  //干扰线
   for($i=0;$i<5;$i++){
    $b = imagecolorallocate($im,rand(0,255),rand(0,255),rand(0,255));
    imageline($im,rand(0,$width),rand(0,$height),rand(0,$width),rand(0,$height),$b);
}
  //绘制验证码
  for($i=0;$i<=$num-1;$i++){
      imagettftext($im,18,rand(-40,40),8 + (18*$i),24,$c[rand(0,5)],"ITCKRIST.TTF",$str[$i]);
  }
 header("Content-Type:image/png");//设置相应头信息
 imagepng($im);
 imagedestroy($im);
 $_SESSION['code'] = $str;

?>