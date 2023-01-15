$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    adaptiveHeight: false,
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
        $('.pageup').fadeOut();
        $('.hamburger').fadeOut();
    });
    $('.overlay, .modal__close').on('click', function (e) {
        if (e.target.className == 'modal__close' || e.target.className == 'overlay') {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
            $('.hamburger').fadeIn('slow');
        }
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
            $('.pageup').fadeOut();
            $('.hamburger').fadeOut();
        });
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+1 (999) 999-99-99");

    // Smooth scroll and pageup

    $(window).scroll(function () {
        let width = $(window).width();

        if (width > 300 && width < 775) {
            if ($(this).scrollTop() > 270) {
                $('.pageup').fadeIn();
            } else {
                $('.pageup').fadeOut();
            }
        } else if (width > 775 && width < 1200) {
            if ($(this).scrollTop() > 1000) {
                $('.pageup').fadeIn();
            } else {
                $('.pageup').fadeOut();
            }
        } else {
            if ($(this).scrollTop() > 1600) {
                $('.pageup').fadeIn();
            } else {
                $('.pageup').fadeOut();
            }
        }
    });

    $("a[href=#up]").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    new WOW().init();

    //Send form

    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: 'config.php',
            data: $(this).serialize()
        });

        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        setTimeout(function () {
            $('.overlay, #thanks').fadeOut('slow');
        }, 2000);
        $('form').trigger('reset');
        $('.hamburger').fadeIn('slow');
        return false;
    });
    // Work with hamburger and mobile menu
    $('.hamburger').click(function () {
        $('.hamburger').toggleClass('hamburger_active');
        $('.menu').toggleClass('menu_active');
    });

    $('.menu_item').each(function (i) {
        $(this).on('click', function () {
            $('.hamburger').toggleClass('hamburger_active');
            $('.menu').toggleClass('menu_active');
        });
    });

    jQuery(document).ready(function ($) {
        $('a[href^="#"]').bind('click.smoothscroll', function (e) {
            e.preventDefault();
            var target = this.hash,
                $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 40
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });
    });

});