//����һ��10x10�Ķ�ά����,0��ʾ�����û���ӣ�-1��ʾ�а��ӣ�1��ʾ�к���
window.qipan =new Array();
//����һ��һά���飬�����洢�����˳���λ��
window.order = new Array();
//��ǰ������ɫ
window.flag='black';
//�������Ƿ��Ѿ���ʤ,�ٶ���ʤ
window.win = true;

//�ж��Ƿ��ڻ�ԭ�ڼ䣬1��ʾ�ǣ�0��ʾ����
window.restore=0;

window.listener='0';



$(function(){

	listenerfuc('put0');
	
	//��ʼ��qipan	
	for (var i = 0; i < 10 ; i++){
		qipan[i]=new Array();
		for (var j = 0; j < 10; j++){
			qipan[i][j] = 0;
		}
	}
	/*
	//��ȡ�����û�����
	allUser=$('#allUser').val().split('|');
	//��ʾ�����û�
	var li='';
	for(var i=0; i<allUser.length; i++){
		li+='<li><span class="onlineuid">'+allUser[i]+'</span><span class="invite" onclick="invite(this)">����</span></li>';
	}
	$('#user ul').html(li);
	*/
	//��ʼ�����¼�
	$('#start').click(function(){
		//��ԭ�����ڼ䲻�ܵ������
		if(restore) return;
		if($('#buid').html()=='��'){
			alert('������һ���û�������Ϸ');
			return;
		}
		//�����ڼ䲻���ٵ������
		if(!win){
			alert('��������þ�');
			return;
		}
		//�������
		clear();
		//�Ѻ��Ӵ��ڼ���״̬����Ϣ����
		if($('#userid').html()==$('#buid').html()){
			listenerfuc('put1');
		}
		
		//���̳�ʼ��
		order[0]=44;
		qipan[4][4]=1;
		flag='white';
		win=false;
		$('td').eq(44).addClass('black');
		
		$.ajax({
			type:'post',
			url:'online.php',
			data:{
				'a':'put',
				'qipan':1,
				'order':44,
				'flag':'white',
				'win':'0',
				'back':'0',
			},
			success:function(text){
			},
			async:false,
		});
		
		window.sit=setInterval(function(){
			$.ajax({
				type:'post',
				url:'online.php',
				data:'a=update',
				success:function(text){
					var info = text.split('|');
					var qipanStr=parseInt(info[0]);
					var orderStr=parseInt(info[1]);
					var flagStr=info[2];
					var winStr=info[3];
					var backStr=info[4];
					var row=Math.floor(orderStr/10);
					var col=orderStr%10;
					flag=flagStr;
					win=winStr=='1'?true:false;
					if(backStr=='1'){//�������
						if (qipan[row][col]!=0){//���ǻ����壬��������ӵ���ȥ��
							qipan[row][col]=qipanStr;//0
							order.pop();//�Ƴ�
							$('td').eq(orderStr).removeClass('black').removeClass('white');
						}
					}else if(backStr=='0'){
						if (qipan[row][col]!=qipanStr){//��ʾ���̵�row�е�col����û������
							
							qipan[row][col]=qipanStr;
							order.push(orderStr);
							if(qipanStr==1){
								$('td').eq(orderStr).addClass('black');
								/*
								if(win){
									clearInterval(sit);
									alert('����Ӯ');
								}
								*/
							}else if(qipanStr==-1){
								$('td').eq(orderStr).addClass('white');
								/*
								if(win){
									clearInterval(sit);
									alert('����Ӯ');
								}
								*/
							}	
						}
					}

					//�����ʤ���������ʱ
					if(win){
						clearInterval(sit);
						if(qipanStr==1){
							$('#alertinfo').html('�����ʤ');
							//alert('�����ʤ');
						}else{
							$('#alertinfo').html('�����ʤ');
							//alert('�����ʤ');
						}
					}
					
				},
				async:false,
			});
			
		},500);
		
	});

	
	
	
	
	//td����¼�
	$('td').click(function(){
		if(restore) return;//��ԭ�ڼ䲻������
		//����Ѿ����˻�ʤ����������
		if (win){
			return;
		}
		//����û����ǵ�ǰ��ս�ߣ��򲻿�����
		if($('#userid').html() != $('#buid').html() && $('#userid').html()!=$('#wuid').html()){
			alert('���ȹ�ս�����Ͼ͵�');
			return;
		}
		//�����ǰ��ս�߲���ϵͳ�������ɫ�����ӣ���������
		if ($('#userid').html()==$('#buid').html() && flag !='black'){
			alert('�ȴ�����...');
			return;
		}
		if ($('#userid').html()==$('#wuid').html() && flag !='white'){
			alert('�ȴ�����...');
			return;
		}

		//�жϸø����Ƿ����������
		if ($(this).hasClass('white') || $(this).hasClass('black')){
			alert('�����ڴ�����');
			return;
		}
		//�������Ƿ��ڼ���״̬
		if(order.length==1){//ֻ��һ�������ǲż��
			if($('#userid').html()==$('#wuid').html()){
				$.ajax({
					type:'post',
					url:'listener.php',
					data:'a=get',
					success:function(text){
						listener=text;
					},
					async:false,
				});
				if(listener=='0'){
					alert('�ڷ�����δ����״̬');
					return false;
				}
			}
		}
		//�û���������ĸ���Ԫ��
		var index = $('td').index(this);
		var row = Math.floor(index/10);
		var col = index%10;
		//�ж�Ӧ����������ɫ������
		if (flag=='black'){
			$(this).addClass(flag);
			flag='white';
			//�����º��qipan��Ӧ������Ԫ�ؽo-1���ף���1���ڣ�
			qipan[row][col] = 1;
		}else if (flag=='white'){
			$(this).addClass(flag);
			flag='black';
			qipan[row][col] = -1;
		}
		
		//��¼�����˳��
		order.push(index);
		

		
		//�ж���Ӯ�㷨
		if(order.length>=9){//ֻ�������ϵ�������������9�������ж���Ӯ�����ٱ�������
			for (var i = 0; i < 10 ; i++){
				for (var j = 0; j < 10; j++){
		
					//��һ�ֿ��Ի�ʤ�������������ͬ��ɫ������������5��
					var num1 =0;	//ֻ��num��ֵ����5������Ӯ����-5������Ӯ��
					if (j <=5){		//��ֹqipan[i][j+4]Խ��
						num1 = qipan[i][j] + qipan[i][j+1] + qipan[i][j+2] + qipan[i][j+3] + qipan[i][j+4];
						if (num1==5){
							win=true;
							
							//alert('����Ӯ');
							break;
						}else if (num1==-5){
							win=true;
					
							//alert('����Ӯ');
							break;
						}
					}
			
					//�ڶ��������������ͬ��ɫ������������5��
					var  num2 =0;
					if (i<=5){	//��ֹqipan[i+4][j]Խ��
						num2 = qipan[i][j] + qipan[i+1][j] + qipan[i+2][j] + qipan[i+3][j] + qipan[i+4][j];
						if (num2==5){
							win=true;
						
							//alert('����Ӯ');
							break;
						}else if (num2==-5){
							win=true;
							
							//alert('����Ӯ');
							break;
						}
					}
					
					//�����������б����ͬ��ɫ������������5��
					//��б��
					var  num3 =0;//��0�ⲽ����Ҫ
					if (i<=5 && j<=5){	//��ֹqipan[i+4][j+4]Խ��
						num3 = qipan[i][j] + qipan[i+1][j+1] + qipan[i+2][j+2] + qipan[i+3][j+3] + qipan[i+4][j+4];		
					}
					//��б��
					var num4 =0;
					if (i<=5 && j>=4){	//��ֹqipan[i+4][j-4]Խ��
						num4 = qipan[i][j] + qipan[i+1][j-1] + qipan[i+2][j-2] + qipan[i+3][j-3] + qipan[i+4][j-4];		
					}
					if (num3==5 || num4==5 ){
						win=true;
		
						//alert('����Ӯ');
						break;
					}else if (num3==-5 || num4==-5){
						win=true;
						
						//alert('����Ӯ');
						break
					}
					
				}
				//����Ѿ����˻�ʤ������������ѭ������¼�þֵ���Ϣ
				if(win){
					//��Ҫ��¼qipan\order
					var filename=$('#buid').html()+$('#wuid').html();//�ļ���
					var qipanStr = JSON.stringify(qipan);//תΪjson�ַ���	
					var orderStr = JSON.stringify(order);
					$.ajax({
						type:'post',
						url:'online.php',
						data:{
							'a':'store',
							'filename':filename,
							'qipan':qipanStr,
							'order':orderStr,
						},
						success:function(text){
							if (text=='1'){
								alert('��¼����ʧ��');
							}
						},
						async:false,
						
					});
					break;
				}
				
			}
		}
		
		//��¼order\qipan\flag\win���ļ���ȥ
		
		var winStr = win?'1':'0';
		$.ajax({
			type:'post',
			url:'online.php',
			data:{
				'order':index,
				'qipan':qipan[row][col],
				'win':winStr,
				'flag':flag,
				'back':'0',//��ʾ����һ��������ӵĲ����������ǻ���
				'a':'put',
			},
			async:false,
		});	
		
	});
	
	//�����㷨
	$('#back').click(function(){//�û�������尴ť�����������¼�
		if ($('#buid').html()=='��') {
			alert('δ�����ս������ɻ�');
			return;
		}
		if(restore) return;//��ԭ����ڼ䲻�ܻ���
		if(win) return;//�Ѿ��ֳ�ʤ������ֲ��ܻ���
		if(order.length==0) return;//������û�����Ӳ��ܻ���	
		//Ҫ�����ӵ�����
		var axis=order[order.length-1];
		var row = Math.floor(axis/10);
		var col = axis%10;
		//�ж��û��ڵ��Ƿ����Լ�������
		if (qipan[row][col]==1 && $('#userid').html()==$('#wuid').html()){
			alert('���ܻڶԷ�����');
			return;
		}
		if (qipan[row][col]==-1 && $('#userid').html()==$('#buid').html()){
			alert('���ܻڶԷ�����');
			return;
		}
		//�ѻ��嵥Ԫ���ֵ����Ϊ0
		qipan[row][col]=0;
		//���Ѹõ�Ԫ��������Ƴ�
		if (flag=='white'){
			$('td').eq(axis).removeClass('black');
			flag='black';
		}else if(flag=='black'){
			$('td').eq(axis).removeClass('white');
			flag='white';
		}
		//����֮��Ҫ��order���һ��Ԫ�أ����ڵ����ӣ�pop����
		order.pop();
		//�ѻ�����Ϣ�����ļ���
		var winStr = win?'1':'0';
		$.ajax({
			type:'post',
			url:'online.php',
			data:{
				'order':axis,//���������
				'qipan':qipan[row][col],
				'win':winStr,
				'flag':flag,
				'back':'1',//1��ʾ�ǻ��壬0��ʾ����
				'a':'put',
			},
			async:false,
		});	
	});
	
	
	//����㷨
	$('#clear').click(function(){
		if (!win) {
			alert('�����ڼ䲻�����');
			return;
		}
		clear();
		if (typeof(sit)!='undefined') clearInterval(sit);//�رն�ʱ����
		listenerfuc('put0');//ͬʱ�洢����״̬
	});
	
	
	//��ԭ���
	$('#restore').click(function(){//�û������ԭ��ť��������ԭ�¼�	
		//�����ڼ䲻�ɻ�ԭ���
		if(!win) return;
		alert('����ɿ���Ч��');
		var optval=$('input[name=restore]').val();//�ñ������ڱ�ʾ�ڼ���
		var filename=$('#buid').html()+$('#wuid').html();//��¼�ڼ���Ϣ���ļ���
		
		$.ajax({
			type:'post',
			url:'restore.php',
			data:{
				'optval':optval,
				'filename':filename,
			},
			success:function(text){
				if(text=='1'){
					alert('�����ڸþ�');
				}else if(text=='2'){
					alert('��û�вμӶ�ս');
				}else{
					//���ص�optval�ֵ������Ϣ��qipan��order��json�ִ���ʹ��|����
					var data=text.split('|');
					qipan=JSON.parse(data[0]);
					order=JSON.parse(data[1]);
					//orderΪ�����ܻ�ԭ
					if (order.length==0) return;
					//�ж��Ƿ��ڻ�ԭ�ڼ䣬1��ʾ�ǣ�0��ʾ����
					restore=1;//��ԭ�ڼ�
					//�Ƴ�ǰһ�ֵ���������
					$('td').removeClass('white').removeClass('black');	
					for (var i=0; i<order.length; i++){
						
						//�ӳ�2��,��ΪsetTimeout�ǲ���ִ�У�ʵ��û�취��ʹ��ajax
						$.ajax({
							type:'post',
							url:'delay.php',
							async:false
						});
						
						//�����ӵ�����
						var row=Math.floor(order[i]/10);
						var col=order[i]%10;
						//�����ӵ���ɫ
						var color='';
						if (qipan[row][col]==1){
							color='black';
						}else if(qipan[row][col]==-1){
							color='white';
						}
						$('td').eq(order[i]).addClass(color);
								
					}
					//��ԭ�ڼ����
					restore=0;
				}
			},
			async:false,
		});
	});

	//�鿴����
	$('#check').click(function(){
		$.ajax({
			type:'post',
			url:'check.php',
			data:'uid='+$('#userid').html(),
			success:function(text){
				if (text == '1'){
					$.ajax({
						type:'post',
						url:'confirm.php',
						data:'a=get',
						success:function(text){
							if (text=='0'){
								alert('�ȴ��Է���������');
							}else if(text=='1'){
								$.ajax({
									type:'post',
									url:'confirm.php',
									data:'a=read',
									success:function(text){
										alert('�Է��ѽ�������,�������ʼ���ӡ���ʼ��Ϸ��');
										$('#buid').html($('#userid').html());
										$('#wuid').html(text);
									},
									async:false,
								});
							}
						},
						async:false,
					});
				}else if(text=='2'){
					//���û�����鿴�����
					var data=confirm('ȷ�Ͻ���������')? 1 :0;
						//�޸�confirm.txt����
					$.ajax({
						type:'post',
						url:'confirm.php',
						data:'a=put&d='+data,
						success:function(text){
							$('#buid').html(text);
							$('#wuid').html($('#userid').html());
						},
						async:false,
					});
				}else if(text=='3'){
					alert('û��������Ϣ');
				}
			},
			async:false,
		});
	});
		
	//ˢ����ʾ�����û�	
	$('#user img').click(function(){
		$.ajax({
			type:'post',
			url:'user.php',
			success:function(text){
				var users=text.split('|');
				var li='';
				for(var i=0; i<users.length; i++){
					if(users[i]==$('#userid').html()){
						li+='<li class="red"><span class="onlineuid">'+users[i]+'</span><span class="invite" onclick="invite(this)">����</span></li>';
					}else{
						li+='<li><span class="onlineuid">'+users[i]+'</span><span class="invite" onclick="invite(this)">����</span></li>';
					}
				}
				$('#user ul').html(li);
			},
			async:false,
		
		});
	});
	/*
	//ģ��������
	$('#update').click(function(){
		$.ajax({
			type:'post',
			url:'online.php',
			data:'a=update',
			success:function(text){
				var info = text.split('|');
				//qipan=JSON.parse(info[0]);
				order.push(info[1]);
				flag=info[2];
				win= info[3]=='0' ? false :true;
				var row=Math.floor(info[1]/10);
				var col=info[1]%10;
				if (flag=='white'){
					$('td').eq(info[1]).addClass('black');
					qipan[row][col]=1;
				}else if(flag=='black'){
					$('td').eq(info[1]).addClass('white');
					qipan[row][col]=-1;
				}
				if(win){
					if (flag=='white'){
						alert('���ӻ�ʤ');
					}else if(flag=='black'){
						alert('���ӻ�ʤ');
					}
				}
			}
		});
	});
		*/
		

});

//���뺯��
//_this��ʾ��������DOM����
function invite(_this){
	var index=$('.invite ').index(_this);
	var touid=$('.onlineuid').eq(index).html();//�������˵�id
	var fromuid=$('#userid').html();//�����˵�id
	if(touid==fromuid){
		alert('���������Լ�');
		return;
	}
	$.ajax({
		type:'post',
		url:'invite.php',
		data:{
			'touid':touid,
			'fromuid':fromuid
		},
		success:function(text){
			if(text=='1'){
				alert('����ʧ��');
			}else{
				alert('����ɹ�����ȴ�');
			}
		},
		async:false,
	});
	
}

//��ֺ���
function clear(){
	for (var i = 0; i < 10 ; i++){
		for (var j = 0; j < 10; j++){
			qipan[i][j] = 0;
		}
	}
	$('td').removeClass('white').removeClass('black');
	//����ʼ������ɫ��Ϊ��ɫ
	flag='black';
	//���order
	order.splice(0,order.length);
	//���ѵĻ�ʤ��Ϣ����Ϊ��
	$('#alertinfo').html('');
}
		//���úڷ��ļ���״̬
function listenerfuc(str){
	$.ajax({
		type:'post',
		url:'listener.php',
		data:{
			'a':str,
		},
		success:function(text){

		},
		async:false,
	});
}

//ɾ���û�
window.onbeforeunload=function(){
	$.ajax({
		type:'post',
		url:'delUser.php',
		data:'userid='+$('#userid').html(),
		async:false,
	});

	return 'ȷ���뿪���ף�';
}


