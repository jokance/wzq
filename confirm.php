<?php
	//ajax修改确认信息
	if(isset($_POST)){
		if($_POST['a']=='put'){
			file_put_contents('data/confirm.txt',$_POST['d']);//该值为1,表示用户接受邀请,为0，表示不接受
			$dataStr=file_get_contents('data/invite.txt');
			$dataArr=json_decode($dataStr);
			echo $dataArr->fromuid;
		}elseif($_POST['a']=='get'){
			echo file_get_contents('data/confirm.txt');
		}elseif($_POST['a']=='read'){
			$dataStr=file_get_contents('data/invite.txt');
			$dataArr=json_decode($dataStr);
			echo $dataArr->touid;
		}

	}
	
?>