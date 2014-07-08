<?php
	//处理qipan/order/win/flag数据的ajax请求
	if(isset($_POST)){
		if($_POST['a']=='put'){
			file_put_contents('data/qipan.txt',$_POST['qipan']);
			file_put_contents('data/order.txt',$_POST['order']);
			file_put_contents('data/win.txt',$_POST['win']);
			file_put_contents('data/flag.txt',$_POST['flag']);
			file_put_contents('data/back.txt',$_POST['back']);
		}else if($_POST['a']=='update'){
			echo file_get_contents('data/qipan.txt').'|'.file_get_contents('data/order.txt').'|'.file_get_contents('data/flag.txt').'|'.file_get_contents('data/win.txt').'|'.file_get_contents('data/back.txt');
		
		}else if($_POST['a']=='delete'){//更新棋局
			unlink('data/qipan.txt');
			unlink('data/order.txt');
			unlink('data/win.txt');
			unlink('data/flag.txt');
		}else if($_POST['a']=='setWin'){
			file_put_contents('data/win.txt','0');
		}else if($_POST['a']=='store'){
		
			$filename='data/store/'.$_POST['filename'].'.txt';
			$text=$_POST['qipan'].'|'.$_POST['order'];
			if(!$fp=@fopen($filename,'a+')){
				//exit("用户数据文件打开失败，请重新刷新页面");
			}else{
				//将数据写入文件
				if(fwrite($fp,'&'.$text)===false){
					echo '1';
				}
				
			}
			fclose($fp);

		}
		
	}

?>