<?php
	//ajax�޸�ȷ����Ϣ
	if(isset($_POST)){
		if($_POST['a']=='put'){
			file_put_contents('data/confirm.txt',$_POST['d']);//��ֵΪ1,��ʾ�û���������,Ϊ0����ʾ������
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