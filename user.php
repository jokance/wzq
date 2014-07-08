<?php
if(isset($_POST)){
	$allUser='';
	$dir='data/user/';
	if(is_dir($dir)){
		if($dh=opendir($dir)){
			while(($file=readdir($dh))!==false){
				if($file!='.'&&$file!='..'){
					 $allUser.='|'.pathinfo($file)['filename'];
				}
			}
			 closedir ( $dh );
		}
	}
	
	echo substr($allUser,1);
}

?>