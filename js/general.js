/* Equal Height */
function equalHeight() {
	$.fn.extend({
		equalHeights: function() {
			var top = 0;
			var row = [];
			var classname = ('equalHeights' + Math.random()).replace('.', '');
			$(this).each(function() {
				var thistop = $(this).offset().top;
				if (thistop > top) {
					$('.' + classname).removeClass(classname);
					top = thistop;
				}
				$(this).addClass(classname);
				$(this).height('auto');
				var h = (Math.max.apply(null, $('.' + classname).map(function() {
					return $(this).outerHeight();
				}).get()));
				$('.' + classname).height(h);
			}).removeClass(classname);
		}
	});
	$('.grid-wrapper .grid-row .grid-item .content-block h3').equalHeights();
}

// scroll spy
function scrollspy() {
    var sTop = $(window).scrollTop();
    var footer_block = $('footer').offset().top - $('.site-header').innerHeight();
    if (sTop < footer_block) {
        $('.scrollspy-block').each(function() {
            var id = $(this).attr('id');
            offset = $(this).offset().top - $('.site-header').innerHeight() - 1;
            height = $(this).height();
            if (sTop >= offset && sTop < offset + height) {
                cur_link = $('.site-header .main-navigation ul li[data-id = '+id+']');
                cur_link.addClass('active').siblings('li').removeClass('active');
            }

        });
    } else {
        $('.site-header .main-navigation ul li:first-child').addClass('active').siblings().removeClass('active');
    }
}

// for check the section in view port or not;
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function parallaxImg() {
    $('.parallax-img').each(function(){
        var imageElement = $(this);

        var sTop = $(window).scrollTop();
        var offset = imageElement.offset().top;
        var height = imageElement.innerHeight();
        var value = 0;

        if (imageElement.isInViewport()) {
             value = Math.round((sTop - offset) * 0.5);
        }
        else{ 
              value = 0;
        }
        
        imageElement.css({
          backgroundPosition: '100%' + value + 'px'
        });

    });
}

function mobile_animation(){
    AOS.init({
        once: true,
        disable: function() {
            var maxWidth = 767;
            return window.innerWidth >= maxWidth;
          }
    });
}

// Back to top JS
function go_to_top(){
    var banner_height = jQuery(window).innerHeight() / 2;              
    if(jQuery(window).scrollTop() > banner_height){        
        jQuery('.back-to-top').fadeIn();
    }
    else{
        jQuery('.back-to-top').fadeOut();
    }
    jQuery('.back-to-top').click(function(){
        jQuery('html, body').stop().animate({ 
            'scrollTop': 0,
        }, 500);
    });
}

/* Document Ready */
$(document).ready(function() {
	setTimeout(function(){
        equalHeight();
    },200);

	$("a[href='#']").click(function(e) {
		e.preventDefault();
	});

    $(".scroll-down").click(function(e) {
        if ($('#service').length) {
           var offset_top = $('#service').offset().top - $('.site-header').innerHeight();
           $('body,html').stop().animate({
               scrollTop: offset_top
           }, 1000);
        }
    });

    // scroll-to-section
    $('.site-header .main-navigation ul li a').on('click',function(){

        if ($(".custom-modal").hasClass("visible")) {
            $(".custom-modal").removeClass("visible").fadeOut(300, function() {
                $("body").removeClass('modal-open');
                $("body").removeClass('oveflow-h');
            });
        }

        $('body').removeClass('open-menu');
        let scrollId = $(this).attr('href');
        $('.site-header .main-navigation ul li').removeClass('active');
        $(this).closest('li').addClass('active');
        if ($(scrollId).length) {
            let _this_content_offset = $(scrollId).offset().top - $('.site-header').innerHeight();
            $('html,body').stop().animate({
                scrollTop:_this_content_offset
            },1000);
        }
    });

    if($('.client-listing').length){
        $('.client-listing').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 1500,    
            pauseOnFocus:false,
            pauseOnHover:false,
            responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              }
            },
          ]
        })
    }
    if($('.project-details-modal.custom-modal .project-detail-wrapper').length){
        $('.project-details-modal.custom-modal .project-detail-wrapper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            fade: true,
            autoplay: false,
            // speed: 1500,    
            pauseOnFocus:false,
            pauseOnHover:false,
        })
    }

    // modal 
    $('.modal-btn').click(function (e) {
        e.preventDefault();
        e.stopPropagation();


        if(!$(this).parents('.modal-btn').length){

            if ($('.project-item').length) {
                slideIndex = $(this).closest('.project-item').index();
                $('.project-details-modal.custom-modal .project-detail-wrapper').slick('resize');
                $('.project-details-modal.custom-modal .project-detail-wrapper').slick('slickGoTo', parseInt(slideIndex));
            }

            $("body").addClass('oveflow-h');   
            setTimeout(function(){
                $(".project-details-modal.custom-modal").animate({
                    scrollTop: 0
                });
            },10);
        }

        $(this).addClass('test');
        $("body").addClass('modal-open');
        var _this = $(this).attr('data-link');

        var _currentModal = $("[data-target='" + _this + "']");
        _currentModal.fadeIn(300);
        _currentModal.addClass("visible");
    });

    $('.modal-backdrop,.modal-close,.modal-close-btn').click(function () {        
      var _this = $(this);
        _this.closest(".custom-modal").removeClass("visible").fadeOut(300, function() {
            $("body").removeClass('modal-open');
            $("body").removeClass('oveflow-h');
        });
    });

    $('.custom-modal .social-share-copylink-container button').click(function (e) {
        e.preventDefault();
        $(this).addClass('copy-link');
        setTimeout(function(){
            $('.custom-modal .social-share-copylink-container button').removeClass('copy-link');
        },800);
    });

    $('.project-block-wrapper .project-list .liked-project').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).toggleClass('active');
    });

    $('.site-header .hamburger-icon').click(function(){
        $('body').toggleClass('open-menu');
    });

    scrollspy();
    parallaxImg();
    mobile_animation();
    go_to_top();

})


/* Window Resize */
$(window).resize(function() {
	setTimeout(function(){
        equalHeight();
    },200);
    if ($(window).innerWidth() > 767) {
        $('body').removeClass('open-menu');
    }
    mobile_animation();
});


/* Window Load */
$(window).on("load",function() {
	setTimeout(function(){
        equalHeight();
    },200);
});

/* Window Scroll */
$(window).on("scroll",function() {
    scrollspy();
    parallaxImg();
    go_to_top();
});