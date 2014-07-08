<?php
//ajax处理邀请信息
	if(isset($_POST)){
		//把数据存入invite.txt文件
		$data=json_encode($_POST);
		if(!file_put_contents('data/invite.txt',$data)){
			echo '1';//邀请失败
		}else{
			file_put_contents('data/confirm.txt','0');//0表示对方没有确认邀请
		}
	}

?>