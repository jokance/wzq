<?php
	//ajax����ҳ��
	if (isset($_POST['userid'])){
		$filename='data/user/'.$_POST['userid'].'.txt';
		if(file_exists($filename)){
			unlink($filename);
		}
			

	}
?>