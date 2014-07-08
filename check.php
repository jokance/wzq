<?php
	header("Content-Type:text/html;charset=gbk");
	//查看邀请文件
	if(isset($_POST)){
		$dataStr=file_get_contents('data/invite.txt');
		$dataArr=json_decode($dataStr);
		if($dataArr->fromuid==$_POST['uid']){
			echo '1';//说明查看邀请的用户和发送邀请的用户是同一个
		}elseif($dataArr->touid==$_POST['uid']){
			echo '2';//说明查看邀请的用户被邀请了
		}else{
			echo '3';//说明没有邀请消息
		}
	}
?>