<?php
	header("Content-Type:text/html;charset=gbk");
	require('getRandOnlyId.php');//�����ȡΨһID�ĺ���
	$userid=strval(getRandOnlyId());
	$filename='data/user/'.$userid.'.txt';
	
	if(!file_put_contents($filename,$userid)){
		exit('�û�����д��ʧ�ܣ���ˢ��ҳ��');
	}
	//��ȡ��ǰ���������û�
	$allUser=array();
	$dir='data/user/';
	if(is_dir($dir)){
		if($dh=opendir($dir)){
			while(($file=readdir($dh))!==false){
				if($file!='.'&&$file!='..'){
					 $allUser[]=pathinfo($file)['filename'];
				}
			}
			 closedir ( $dh );
		}
	}

?>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>������</title>
<link rel="stylesheet" type="text/css" href="css/index.css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</head>
<body>
	
	<header>
		<h1>��������Ϸ</h1>
	</header>
	<div id="state">
		<h2>��Ϸ˵��</h2>
		<p>1.������Ϸ��������������һλ�����û��ſ�����Ϸ����û�������û��������ٴ�һ����Ϸҳ��ģ�������û���֮�������Ͻǵ�ˢ��ͼ��Ϳ��Կ�����һλ�����û���ID��</p>
		<p>2.��������롱��Է����ٳ�û�л�Ӧ������ˢ��ҳ���������룻�Է�����ͨ��������鿴���롱�����ܻ�ܾ�����</p>
		<p>3.������鿴���롱��ťȷ�϶Է���������󷽿����ӣ�</p>
		<p>4.��ս˫��������������ʼ���ӡ���ť����ֲ�������ʼ����ϷĬ�Ϻڷ������ӣ�</p>
		<p>5.��Ϸ�û����Ի���һ����</p>
		<p>6.�����ڼ䲻����֣�</p>
		<p>7.�����ڼ䲻�ɻ�ԭ���</p>
	</div>
	
	<div id="container">
		<div id="top">
			<p class="p1">���ID:<span id="userid"><?php echo $userid; ?></span></p>
			<p class="p2">��ǰ��ս:  <span id="buid">��</span> <strong>����</strong>  <span id="wuid">��</span> <strong>����</strong><em id="alertinfo"></em></p>
		</div>
		<table>
		<?php for($i=0;$i<10;$i++){?>
			<tr>
			<?php for($j=0;$j<10;$j++){?>
				<td></td>
			<?php }?>
			</tr>
		<?php }?>

		</table>
		
		<div id="rightbar">
			<p><button id="check">�鿴����</button></p>
			<p><button id="start">��ʼ����</button></p>
			<p><button id="back">����</button></p>
			<p><button id="clear">���</button></p>
			
			
			<p><button id="restore">��ԭ</button>
			��<input type="number" name="restore" value="1">��
			</p>
		</div>
		<div id="user">
			<h2>�����û�<img src="img/reload.png"/></h2>
			<ul>
				<?php foreach($allUser as $value){ ?>
				<li <?php if($value==$userid){echo "class='red'";} ?>><span class="onlineuid"><?php echo $value; ?></span></span><span class="invite" onclick="invite(this)">����</span></li>
				<?php } ?>
			</ul>
		</div>
	</div>
			
	<footer>
		<p>��ϵ���䣺<a href="mailto:hzn.itself@gmail.com">hzn.itself@gmail.com</a>��QQ:464839522</p>
		<p>All Rights Reserved.Designed by Huangzunian</p>
	</footer>
<body>
</html>