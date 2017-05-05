require.config({
	paths:{
		jquery: 'jquery-3.2.1.min',
		jqueryUI: 'http://code.jquery.com/ui/1.12.0/jquery-ui'
	}
});
require(['jquery','window'],function($,w){
	$('#a').click(function(){

		var win = new w.Popup();

		win.alert({
			title: '提示',
			content: "welcome!",
			textAlertBtn: '关闭',
			handlerAlertBtn: function(){
				alert('you click the alert button');
			},
			handlerCloseBtn: function(){
				alert('you click the close button');
			},

			width: 300,
			height: 150,
			y: 100,
			hasCloseBtn: true,
			skinClassName: 'window_skin_a',
			dragHandle: '.window_header'

		}).on('alert',function(){
			alert('这是alert的第二个处理程序');
		}).on('alert',function(){
			alert('这是alert的第三个个处理程序');
		}).on('close',function(){
			alert('这是colse的第二个处理程序');
		});

		
	});

	$('#b').click(function(){
		var win = new w.Popup();
		win.confirm({
			title: '系统消息',
			content: '你确定要删除这个文件吗？',
			width: 300,
			height: 150,
			y: 100,
			textConfirmBtn: '是',
			textCancelBtn: '否',
			dragHandle: 'window_header'
		}).on('confirm',function(){
			alert('确定');
		}).on('cancel',function(){
			alert('取消');
		});
	});

	$('#c').click(function(){
		var win = new w.Popup();
		win.prompt({
			title: '请输入您的名字',
			content: '我们将会为您保存输入的信息',
			width: 300,
			height: 150,
			y: 100,
			textPromptBtn: '输入',
			textCancelBtn: '取消',
			defaultValuePromptInput: '唐大虾',
			dragHandle: 'window_header',
			handlerPromptBtn: function(inputValue){
				alert('你输入的内容是：' + inputValue);
			},
			handlerCancelBtn: function(){
				alert('取消');
			}
		});
	});

	$('#d').click(function(){
		var win = new w.Popup();
		win.common({
			content: '我是一个通用的弹窗',
			width: 300,
			height: 150,
			y: 100,
			hasCloseBtn: true
		});
	});
});