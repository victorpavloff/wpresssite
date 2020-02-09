$(document).ready(function() {

	/* scroll */

	$("a[href^='#']").click(function() {
		var target = $(this).attr("href");
		var headerHeight = $(".block1").outerHeight();
		var destination = $(target).offset().top - headerHeight;
		$("html, body").animate({scrollTop: destination}, 600);
	});

	/* sliders */

	var slider1 = $(".slider");
	var slider2 = $(".steps_slider");

	slider1.owlCarousel({
		lazyLoad: true,
		dots: false,
		nav: false,
		nav: true,
		navText: "",
		responsive:{
			0:{
				items: 1,
				margin: 0
			},
			720:{
				items: 2,
				margin: 8,
			},
			960:{
				items: 3,
				margin: 8,
			}
		}
	});

	slider2.owlCarousel({
		lazyLoad: true,
		dots: false,
		nav: false,
		nav: true,
		navText: "",
		responsive:{
			0:{
				items: 1,
				margin: 0
			},
			540:{
				items: 2,
				margin: 20
			},
			720:{
				items: 3,
				margin: 20
			},
			960:{
				items: 4,
				margin: 20
			}
		}
	});

	/* buttons */

	$(".js-slider_button").click(function(){
		var button = $(this);
		var index = button.index() + 1;
		$(".js-slider_button").removeClass("active");
		button.addClass("active");
		$(".js-slider").addClass("hide");
		$(".js-slider"+index).removeClass("hide");
	});

	$(".js-type_button").click(function(){
		var button = $(this);
		var index = button.index() + 1;
		$(".js-type_button").removeClass("active");
		button.addClass("active");
		$(".js-steps_list").hide();
		$(".js-steps_list"+index).show();
	});

	/* mobile menu */

	$(".js-menu_button").click(function(){
		$(".js-mobile_menu").animate({right: "0px"}, 100);
		$(".js-overlay").fadeIn(100);
	});

	$(".js-mobile_close").click(function(){
		$(".js-mobile_menu").animate({right: "-240px"}, 100);
		$(".js-overlay").fadeOut(100);
	});

	/* phone */

	$.mask.definitions["~"]="[+-]";
	$("input[name='phone']").mask("+7 (999) 999-99-99");

	/* open window */
	
	function openWindow(target) {
		$(target).arcticmodal({
			afterClose: function(data, el) {
				$("input").removeClass("error");
			},
			openEffect: {
				type: "fade", 
				speed: 300
			},
			closeEffect: {
				type: "fade", 
				speed: 300
			},
		    overlay: {
			    css: {
					backgroundColor: "#000",
					opacity: 0.8
				}
			}
		});
	}
	
	$(".js-callback_button").click(function() {		
		openWindow(".order_window");
	});
	
	/* close window */
	
	var timerClose;
	
	$(".js-close_button").click(function() {
		$.arcticmodal("close");
		clearInterval(timerClose);
	});
	
	/* validate form */
	
	$(".order_form").validate({
		errorPlacement: function(error, element) { },
		rules: {
			name: {required: true}, 
			phone: {required: true}
		},
		messages: {
			name: {required: false}, 
			phone: {required: false}
		},
		submitHandler: function(form) {
			sendForm(form);
		}
	});
	
	/* send form */
	
	function sendForm(form) {
		
		var data = 
		{
			name: $(form).find("input[name='name']").val(),
			phone: $(form).find("input[name='phone']").val()
		}
		
		$.ajax({
			type: "POST",
			url: "php/send.php",
			data: data,
			success: function() {
				$.arcticmodal("close");
				setTimeout(function() {
					$("input").val("");
				}, 500);
				OpenWindow(".success_window");
				timerClose = setTimeout(function() {
					$.arcticmodal("close");
				}, 5000);
			}
		});
		
	}


});