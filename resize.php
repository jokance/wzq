
<?php
//ͼƬ΢��
	$src_img = "img/white.png";
	$dst_w = 40;
	$dst_h = 40;

	list($src_w,$src_h)=getimagesize($src_img);  // ��ȡԭͼ�ߴ�
	$dst_scale = $dst_h/$dst_w; //Ŀ��ͼ�񳤿��
	$src_scale = $src_h/$src_w; // ԭͼ�����

	if($src_scale>=$dst_scale)
	{  
		// ����
		$w = intval($src_w);
		$h = intval($dst_scale*$w);
		$x = 0;
		$y = ($src_h - $h)/3;
	}
	else
	{ 
	// ����
		$h = intval($src_h);
		$w = intval($h/$dst_scale);
		$x = ($src_w - $w)/2;
		$y = 0;
	}
	// ����
	$source=imagecreatefrompng($src_img);
	$croped=imagecreatetruecolor($w, $h);
	imagecopy($croped,$source,0,0,$x,$y,$src_w,$src_h);
	// ����
	$scale = $dst_w/$w;
	$target = imagecreatetruecolor($dst_w, $dst_h);
	$final_w = intval($w*$scale);
	$final_h = intval($h*$scale);
	imagecopyresampled($target,$croped,0,0,0,0,$final_w,$final_h,$w,$h);
	// ����
	//$timestamp = time();
	imagepng($target, "2.jpg");
	imagedestroy($target);