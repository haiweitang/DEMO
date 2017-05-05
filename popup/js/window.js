define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	function Popup(){
		this.cfg = {
			//默认配置
			width: 500,
			height: 300,
			title: '系统消息',
			content: '',			//文本内容
			hasMask: true,			//创建遮罩
			isDraggable: true,		//拖动开关
			skinClassName: null,	//皮肤 window_skin_a

			//alert配置
			hasCloseBtn: false,		//添加左上角关闭按钮
			handlerAlertBtn: null,	//确定按钮事件
			handlerCloseBtn: null,	//关闭按钮事件
			dragHandle: null,		//拖动手柄
			textAlertBtn: '确定',	//按钮文本

			//confirm配置
			textConfirmBtn: '确定',
			textCancelBtn: '取消',
			handlerConfirmBtn: null,
			handlerCancelBtn: null,

			//prompt配置
			textPromptBtn: '确定',
			isPromptInputPassword: false,
			defaultValuePromptInput: '',
			maxlengthPromptInput: 10,
			handlerPromptBtn: null
		};
		
	};

	Popup.prototype = $.extend({},new widget.Widget(),{
		//添加DOM节点
		renderUI: function(){

			var footerContent = '';

			switch(this.cfg.winType){

				case 'alert':
					footerContent = '<input type="button" value="'+ this.cfg.textConfirmBtn +'" class="window_alertBtn">';
				break;

				case 'confirm':
					footerContent = '<input type="button" value="'+ this.cfg.textConfirmBtn +'" class="window_confirmBtn"><input type="button" value="'+this.cfg.textCancelBtn+'" class="window_cancelBtn">';
				break;

				case 'prompt':
					this.cfg.content += '<p class="window_promptIputWrapper"><input type="'+(this.cfg.isPromptInputPassword?"password":"text")+'" value="'+
						this.cfg.defaultValuePromptInput+'" maxlength="'+this.cfg.maxlengthPromptInput+'" class="window_promptInput"></p>';

					footerContent = '<input type="button" value="'+ this.cfg.textPromptBtn +'" class="window_promptBtn"><input type="button" value="'+
						this.cfg.textCancelBtn+'" class="window_cancelBtn">';
					break;
			};

			

			//创建alert弹窗主体
			this.boundingBox = $(
				'<div class="window_boundingBox"><div class="window_body">' + this.cfg.content + '</div></div>'
				);
			if(this.cfg.winType != 'common'){
				this.boundingBox.prepend('<div class="window_header">' + this.cfg.title + '</div>');
				this.boundingBox.append('<div class="window_footer">'+footerContent+'</div>');
			}
			
			//创建遮罩
			if(this.cfg.hasMask){
				this.mask = $('<div class="window_mask"></div>');
				this.mask.appendTo('body');
			}
			//创建右上角X关闭按钮
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			}
			this.boundingBox.appendTo(document.body);
			this.promptInput = this.boundingBox.find(".window_promptInput");
		},

		//添加监听事件
		bindUI: function(){
			var that = this;
			//绑定两个按钮点击事件
			this.boundingBox.delegate('.window_alertBtn','click',function(){
				that.fire('alert');
				that.destroy();
			}).delegate('.window_closeBtn','click',function(){
				that.fire('close');
				that.destroy();
			}).delegate('.window_confirmBtn','click',function(){
				that.fire('confirm');
				that.destroy();
			}).delegate('.window_cancelBtn','click',function(){
				that.fire('cancel');
				that.destroy();
			}).delegate('.window_promptBtn','click',function(){
				that.fire('prompt',that.promptInput.val());
				that.destroy();
			});

			if(this.cfg.handlerAlertBtn){
				this.on('alert',this.cfg.handlerAlertBtn);
			}
			if(this.cfg.handlerCloseBtn){
				this.on('close',this.cfg.handlerCloseBtn);
			}
			if(this.cfg.handlerConfirmBtn){
				this.on('confirm',this.cfg.handlerConfirmBtn);
			}
			if(this.cfg.handlerCancelBtn){
				this.on('cancel',this.cfg.handlerCancelBtn);
			}
			if(this.cfg.handlerPromptBtn){
				this.on('prompt',this.cfg.handlerPromptBtn);
			}
		},


		//初始化组件属性
		syncUI: function(){
			//定义boundingBox样式
			this.boundingBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
			});

			//添加皮肤
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			//添加拖动组件
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}
				else{
					this.boundingBox.draggable();
				}
			}
		},

		//销毁遮罩函数
		destructor: function(){
			this.mask && this.mask.remove();
		},

		alert: function(cfg){
			$.extend(this.cfg,cfg,{winType:'alert'});
			this.render();
			return this;
		},

		confirm: function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'});
			this.render();
			return this;
		},

		prompt: function(cfg){
			$.extend(this.cfg,cfg,{winType:'prompt'});
			this.render();
			this.promptInput.focus();
			return this;
		},

		common: function(cfg){
			$.extend(this.cfg,cfg,{winType:'common'});
			this.render();
			return this;
		}

	});

	return {
		Popup : Popup
	};
})