<?php
	header("Content-Type:text/html;charset=gbk");
	//�鿴�����ļ�
	if(isset($_POST)){
		$dataStr=file_get_contents('data/invite.txt');
		$dataArr=json_decode($dataStr);
		if($dataArr->fromuid==$_POST['uid']){
			echo '1';//˵���鿴������û��ͷ���������û���ͬһ��
		}elseif($dataArr->touid==$_POST['uid']){
			echo '2';//˵���鿴������û���������
		}else{
			echo '3';//˵��û��������Ϣ
		}
	}
?>