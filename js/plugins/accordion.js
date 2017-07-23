

/*!
 *
 * accordion - jQuery plugins for accordion contents
 * builder:CRONWMMM
 * 
 */



;(function($,window,document,undefined){
	var pluginName = 'accordion',
		settings = {
			selectors : {
				binder : 'ac-bind',
				module : 'ac-module'
			},
			show : 'closeall',		// module部分的默认展示状态[ac-module/closeall/openall]
			autoslide : true,		// 当一个模块展开时其余模块是否自动折叠
			speed : 300				// 模块收缩速度(ms)
		};

	function Accordion($el,options){
		if(options && typeof options === 'object') $.fn.extend(settings,options,true);
		this.config = settings;
		this.$wrap = $el;
		this.init();
	}

	Accordion.prototype = {
		constructor : Accordion,
		init : function(){
			var self = this;
			$(function(){
				self.bind();
				self.start();
			});
		},

		// 事件绑定函数
		bind : function(){
			var self = this,
				config = this.config,
				$binder = this.$wrap.find('['+ config.selectors.binder +']'),
				$module = this.$wrap.find('['+ config.selectors.module +']'),
				data = this;
			$module.each(function(){
				$(this).data('open',false);
			});
			// 为每个Binder绑定点击事件
			$binder.on('click',data,self._control);
			$module.on('autoSlider',data,self._autoSlider)
				   .on('manualSlider',data,self._manualSlider);
		},

		// 状态初始化函数
		start : function(){
			var self = this,
				config = this.config,
				show = config.show,
				module = config.selectors.module,
				$module = this.$wrap.find('['+ module +']');	
			switch(show){
				case 'closeall':
					$module.slideUp();
					break;
				case 'openall':
					$module.slideDown();
					break;
				default:
					$module.slideUp().each(function(index,item){
						var $item = $(item);
						if($item.attr(module) === show){
							$item.slideDown();
						}
					});
			}
		},

		// 控制器
		_control : function(e){
			var self = e.data,
				binder = self.config.selectors.binder,
				module = self.config.selectors.module,
				autoslide = self.config.autoslide,
				$module = self.$wrap.find('['+ module +']');
			self.bindName = $(e.target).attr(binder);
			self.$binder = $(e.target);
			$module.each(function(index,item){
				var $item = $(item);
				if($item.attr(module) === self.bindName){
					self.$module = $item;
				}
			});
			if(autoslide){
				self.$module.trigger('autoSlider');
			}else{
				self.$module.trigger('manualSlider');
			}
		},

		// 自动slider事件执行函数
		_autoSlider: function(e){
			var self = e.data,
				config = self.config,
				speed = config.speed,
				module = config.selectors.module,
				$module = self.$wrap.find('['+ module +']');
			$module.each(function(index,item){
				var $item = $(item);
				if($item.attr(module) === self.bindName){
					$item.data('open',!$item.data('open'));
				}else{
					$item.data('open',false);
				}
			}).each(function(index,item){
				var $item = $(item);
				if(!$item.data('open')){
					$item.slideUp(speed);
				}else{
					$item.slideDown(speed);
				}
			});
		},

		// 手动slider事件执行函数
		_manualSlider: function(e){
			var self = e.data;
			self.$module.slideToggle();
		}
	};

	$.fn[pluginName] = function(options){
		return this.each(function(){
			if(!$(this).data(pluginName)) new Accordion($(this),options);
		});
	};

}(jQuery,window,document));

