<?php
//ajax����������Ϣ
	if(isset($_POST)){
		//�����ݴ���invite.txt�ļ�
		$data=json_encode($_POST);
		if(!file_put_contents('data/invite.txt',$data)){
			echo '1';//����ʧ��
		}else{
			file_put_contents('data/confirm.txt','0');//0��ʾ�Է�û��ȷ������
		}
	}

?>