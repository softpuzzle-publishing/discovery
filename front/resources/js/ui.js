var Init = {
	defaults : function(){
		var bodyHeight = 0;
		var bodyWidth = 0;
		var breakpoint;
		this.resize();
		window.addEventListener("resize", this.resize);
	},
	resize : function(){
		Init.getBrowserSize();
		Init.drawBreakPoint();

		Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
		if(!Init.breakpoint){
			$('html').removeClass('is-desktop');
			$('html').addClass('is-mobile');
		}else{
			$('html').removeClass('is-mobile');
			$('html').addClass('is-desktop');
		}
	},
	getBrowserSize : function(){
		this.bodyHeight = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
		this.bodyWidth = Math.max(
			document.body.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.clientWidth,
			document.documentElement.scrollWidth,
			document.documentElement.offsetWidth
		);
	},
	drawBreakPoint : function(){
		$('html').attr('data-width',this.bodyWidth);
		$('html').attr('data-height',this.bodyHeight);
	},
};

var Common = {
	init : function(){
		this.dropdown();
		this.revealed();
		this.common();
	},
	grid : function(){


	},
	revealed : function(){
		$('[data-event="revealed"]').each(function (i) {
			if ($(window).scrollTop() + $(window).height() > $(this).offset().top + $(this).outerHeight()) {
				$(this).addClass('in');
			}
		});
		$(window).scroll(function () {
			$('[data-event="revealed"]').each(function (i) {
				if (($(window).scrollTop() + $(window).height()) - ($(window).height() / 3) > $(this).offset().top) {
					$(this).addClass('in');
				}
			});
		});
	},
	dropdown : function(){
		$('.dropdown-custom .selected').on('click',function(e){
			e.preventDefault();
			$(this).closest('.dropdown-custom').toggleClass('active');
		});
		$(document).click(function(e) {
			if(!$('.dropdown-custom').has(e.target).length){
				$(".dropdown-custom.active").removeClass('active');
			}
		});
	},
	common : function(){
		$('.category a').on('click',function(e){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
		});

		$('.long .close').on('click',function(e){
			$(this).closest('.long').hide();
		});

		//모바일 카테고리
		$(document).on('change','.select-mobile select',function(e){
			$(this).next('.select-value').text($(this).val());
		});
	}
};

var Header = {
	init : function(){
		this.sns();
		this.menu();
		this.scrolling();
		window.addEventListener('mousewheel', Header.scrolling);
		window.addEventListener('touchmove', Header.scrolling);
		$(window).scroll(function(){
			Header.scrolling();
		});
	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();
		var gnbTop = $('#header').height();
		gnbTop = Number(gnbTop);

		if(scrollTop > 0){
			$('html').addClass('is-scrolled');
		}else{
			$('html').removeClass('is-scrolled');
		}
	},
	menu : function(){
		$('.mobile-menu > a').on('click',function(e){
			e.preventDefault();
			$('html').toggleClass('open-mobile-menu');
		});
	},
	sns : function(){
		$('#header .social').on('mouseenter',function(){
			$(this).addClass('active');
		}).on('mouseleave',function(){
			$(this).removeClass('active');
		});

		$('.btn-sns').on('focusin',function(){
			$(this).closest('.social').addClass('active');
		});
		$('.social .list li:last-child a').on('focusout',function(){
			$(this).closest('.social').removeClass('active');
		});
	}
};

$(function() {
	Init.defaults();
	Common.init();
	Header.init();
});