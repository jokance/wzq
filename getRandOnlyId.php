<?php
	//Author:ͭ�㶹
	//QQ:309581329
	//Email:bestphper@126.com
	//http://gongwen.sinaapp.com
	function getRandOnlyId() {
		//��ʱ��ض���,��������δ��2012-12-21��ʱ�����
		$endtime=1356019200;//2012-12-21ʱ���
		$curtime=time();//��ǰʱ���
		$newtime=$curtime-$endtime;//��ʱ���
		$rand=rand(0,99);//��λ���
		$all=$rand.$newtime;
		$onlyid=base_convert($all,10,36);//��10����תΪ36���Ƶ�ΨһID
		return $onlyid;
	}

?>