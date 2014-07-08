<?php

	if(isset($_POST['a'])){
		$action=$_POST['a'];
		if($action=='put1'){
			file_put_contents('data/listener.txt','1');
			echo 'put1';
		}else if($action=='get'){
			echo file_get_contents('data/listener.txt');
		}else if($action=='put0'){
			file_put_contents('data/listener.txt','0');
			echo 'put0';
		}
	}
	
?>