<?php
	//����ԭ������ajax����
	if(isset($_POST)){
		$optval=$_POST['optval'];
		$optval=$optval<=0?1:$optval;
		$filename='data/store/'.$_POST['filename'].'.txt';
		if(file_exists($filename)){
			$data=file_get_contents($filename);
			if(substr($data,0,1)=='&'){
				$data=substr($data,1);
			}
			$data=explode('&',$data);
			if($optval<=count($data)){
				echo $data[$optval-1];
			}else{
				echo '1';//��ʾ�û�ѡ���ľ���������
			}
		}else{
			echo '2';//��ʾ���û���û�ж�ս��Ϣ
		}
	}
?>