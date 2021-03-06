<?php
	header("Content-Type:text/html;charset=gbk");
	require('getRandOnlyId.php');//引入获取唯一ID的函数
	$userid=strval(getRandOnlyId());
	$filename='data/user/'.$userid.'.txt';
	
	if(!file_put_contents($filename,$userid)){
		exit('用户数据写入失败，请刷新页面');
	}
	//获取当前所有在线用户
	$allUser=array();
	$dir='data/user/';
	if(is_dir($dir)){
		if($dh=opendir($dir)){
			while(($file=readdir($dh))!==false){
				if($file!='.'&&$file!='..'){
					 $allUser[]=pathinfo($file)['filename'];
				}
			}
			 closedir ( $dh );
		}
	}

?>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>五子棋</title>
<link rel="stylesheet" type="text/css" href="css/index.css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</head>
<body>
	
	<header>
		<h1>五子棋游戏</h1>
	</header>
	<div id="state">
		<h2>游戏说明</h2>
		<p>1.进入游戏后，您必须先邀请一位在线用户才可以游戏。若没有在线用户，可以再打开一个游戏页面模拟在线用户，之后点击右上角的刷新图标就可以看到另一位在线用户的ID；</p>
		<p>2.点击“邀请”后对方若迟迟没有回应，可以刷新页面重新邀请；对方可以通过点击“查看邀请”来接受或拒绝邀请</p>
		<p>3.点击“查看邀请”按钮确认对方接受邀请后方可下子；</p>
		<p>4.对战双方都必须点击“开始下子”按钮，棋局才真正开始。游戏默认黑方先下子；</p>
		<p>5.游戏用户可以悔棋一步；</p>
		<p>6.下棋期间不可清局；</p>
		<p>7.下棋期间不可还原棋局</p>
	</div>
	
	<div id="container">
		<div id="top">
			<p class="p1">你的ID:<span id="userid"><?php echo $userid; ?></span></p>
			<p class="p2">当前对战:  <span id="buid">无</span> <strong>黑子</strong>  <span id="wuid">无</span> <strong>白子</strong><em id="alertinfo"></em></p>
		</div>
		<table>
		<?php for($i=0;$i<10;$i++){?>
			<tr>
			<?php for($j=0;$j<10;$j++){?>
				<td></td>
			<?php }?>
			</tr>
		<?php }?>

		</table>
		
		<div id="rightbar">
			<p><button id="check">查看邀请</button></p>
			<p><button id="start">开始下子</button></p>
			<p><button id="back">悔棋</button></p>
			<p><button id="clear">清局</button></p>
			
			
			<p><button id="restore">还原</button>
			第<input type="number" name="restore" value="1">局
			</p>
		</div>
		<div id="user">
			<h2>在线用户<img src="img/reload.png"/></h2>
			<ul>
				<?php foreach($allUser as $value){ ?>
				<li <?php if($value==$userid){echo "class='red'";} ?>><span class="onlineuid"><?php echo $value; ?></span></span><span class="invite" onclick="invite(this)">邀请</span></li>
				<?php } ?>
			</ul>
		</div>
	</div>
			
	<footer>
		<p>联系邮箱：<a href="mailto:hzn.itself@gmail.com">hzn.itself@gmail.com</a>　QQ:464839522</p>
		<p>All Rights Reserved.Designed by Huangzunian</p>
	</footer>
<body>
</html>