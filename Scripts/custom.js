$(document).ready(function () {
    //Home Fixed
    $('.bnnr-type-comm').hover(function () {
        $(this).find('.bnnr-tooltip').show();        
    }, function () {
        $(this).find('.bnnr-tooltip').hide(); 
    });

    $('.hdr-fixed-1').scrollToFixed({
        zIndex: 5,
        preFixed: function () {
            $('.hdr-fixed-1').addClass('hdr-fixed-wrapper');
        },
        postFixed: function () {
            $('.hdr-fixed-1').removeClass('hdr-fixed-wrapper');
        }
    });

    $('.hdr-fixed-2').scrollToFixed({
        zIndex: 5
    });


    $('.bnnr-quote a').scrollToFixed({
        zIndex: 3,
        preFixed: function () {
            $('.bnnr-quote a').addClass('bnnr-quote-fixed');
        },
        postFixed: function () {
            $('.bnnr-quote a').removeClass('bnnr-quote-fixed');
        }
    });

    $(window).scroll(function (evt) {

        //console.log($(document).scrollTop() + ' ' + $(document).height());
        if ($(document).scrollTop() / $(document).height() > 0.7 && $.isScrollToFixed('.bnnr-quote a')) {
            $('.bnnr-quote a').trigger('detach.ScrollToFixed');
        }
        else {
            if ($(document).scrollTop() / $(document).height() < 0.7 && !$.isScrollToFixed('.bnnr-quote a')) {
                $('.bnnr-quote a').scrollToFixed({
                    zIndex: 3,
                    preFixed: function () {
                        $('.bnnr-quote a').addClass('bnnr-quote-fixed');
                    },
                    postFixed: function () {
                        $('.bnnr-quote a').removeClass('bnnr-quote-fixed');
                    }
                });
            }
        }

        if ($(document).scrollTop() < 400 && $.isScrollToFixed('.hdr-fixed-1')) {
            $('.hdr-fixed-1').trigger('detach.ScrollToFixed');
            $('.hdr-fixed-1').removeClass('hdr-fixed-wrapper');

        } else {
            if ($(document).scrollTop() > 400 && !$.isScrollToFixed('.hdr-fixed-1')) {
                $('.hdr-fixed-1').scrollToFixed({
                    zIndex: 5,
                    preFixed: function () {
                        $('.hdr-fixed-1').addClass('hdr-fixed-wrapper');
                    },
                    postFixed: function () {
                        $('.hdr-fixed-1').removeClass('hdr-fixed-wrapper');
                    }
                });
            }
        }
    });

    $('.hdr-menu-bar').click(function () {
        if ($('.mobile-menu-wrapper').css('display') == 'none') {
            $('.mobile-menu-wrapper').slideDown();
            $('.menu-bar').addClass('menu-bar-close');
        }
        else {
            $('.mobile-menu-wrapper').slideUp();
            $('.menu-bar').removeClass('menu-bar-close');
        }
    });

    $(window).resize(function () {
        if ($(window).width() > 800) {
            $('.mobile-menu-wrapper').slideUp();
            $('.menu-bar').removeClass('menu-bar-close');
        }
    });

    $("#testimonial-container").owlCarousel({
        items: 1,
        loop: true,
        singleItem: true
    });

    $("#sub-product-owl").owlCarousel({
        items: 1,
        loop: true,
        singleItem: true,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: false,
        autoplaySpeed: 1000
    });

    //Five Question Popup
    $('.bnnr-five-question a').click(function () {
        $('#hm-question').show();
    });

    $('#bestPrice').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#best-price'
        },
        callbacks: {
            open: function () {
                $('.mfp-bg').addClass('mfp-bg-1');
            },
            beforeClose: function () {

            },
            beforeOpen: function () {

            },
            close: function () {
            }
        }
    });
    $('#pesonalConcierge').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#personal-concierge'
        },
        callbacks: {
            open: function () {
                $('.mfp-bg').addClass('mfp-bg-1');
            },
            beforeClose: function () {

            },
            beforeOpen: function () {
            },
            close: function () {
            }
        }
    });
    $('#doorstep').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#door-step'
        },
        callbacks: {
            open: function () {
                $('.mfp-bg').addClass('mfp-bg-1');
            },
            beforeClose: function () {

            },
            beforeOpen: function () {
            },
            close: function () {
            }
        }
    });

    //Home Question Carousel
    var question_owl = $("#hm-question-carousel").owlCarousel({
        items: 1,
        singleItem: true,
        dots: true
    });

    $('.hm-que-prev').click(function () {
        question_owl.trigger('prev.owl.carousel');
    });
    $('.hm-que-next').click(function () {
        question_owl.trigger('next.owl.carousel');
    });

    //Close Question popup
    $('#hm-question-close-icon').click(function () {
        $('#hm-question').hide();
    });

    $('.animated-control').css('opacity', 0).waypoint({
        handler: function (direction) {
            $(this).css('opacity', 1);
            $(this).find('.animated-control-up').addClass('fadeInUp');
            $(this).find('.animated-control-right').addClass('fadeInRight');
            $(this).find('.animated-control-down').addClass('fadeInDown');
            $(this).find('.animated-control-scale').addClass('scaleToFull');
            $(this).find('.animated-control-left').addClass('fadeInLeft');
            $(this).find('.animated-control-line').addClass('anmLineFill');
        },
        offset: '35%'
    });
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    //Car Page Request Popup
    var make = [];
    var model = [];
    var makeModel = [];
    var bought = 0;
    $.ajax({
        url: '/home/getVehicle',
        method: 'GET'
    }).
        done(function (data) {
            make = data.Make;
            makeModel = data;
            $('#carpop-car-type input').autocomplete({
                source: make,
                minLength: 0,
                select: function (event, ui) {
                    $('#carpop-list-cars').slideUp();
                    $('#carpop-car-modal input').attr('disabled', false);
                    model = [];
                    $('#carpop-list-modal .car-list-container').empty();
                    $('#carpop-list-cars input[value="' + ui.item.value + '"]').attr('checked', true);

                    for (var i = 0; i < makeModel.Models.length; i++) {
                        if (ui.item.value == makeModel.Models[i].Make) {
                            model.push(makeModel.Models[i].Model);
                            if (model.length < 10) {
                                $('#carpop-list-modal .car-list-container').append('<div class="carpop-list-block"><input type="radio" name="car-model" value="' + makeModel.Models[i].Model + '" id="make' + i + '" /><label for="make' + i + '">' + makeModel.Models[i].Model + '</label></div>');
                            }
                        }
                    }
                    $('#carpop-car-modal input').val('');
                    $('#carpop-car-modal input').autocomplete({
                        source: model,
                        minLength: 0,
                        select: function (event, ui) {
                            $('#carpop-list-modal input[value="' + ui.item.value + '"]').attr('checked', true);
                            window.setTimeout(function () {
                                $('#carpop-car-year input').attr('disabled', false);
                                $('#carpop-list-modal').slideUp();
                                $('#carpop-list-year').slideDown();
                                $('#carpop-car-year input').val('');
                                $('#carpop-car-year input').focus();
                            }, 200);
                        }
                    });
                    window.setTimeout(function () {
                        $('#carpop-car-modal input').focus();
                    }, 200);
                }
            });
            //console.log(make);
        }).
        fail(function (err) {
            console.log(err);
        });

    $('.carpop-user-quote button').click(function () {
        var clck_invld = 0,
            mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            mob_filter = /^[0-9]*$/;
        $('.carpop-user-input').removeClass('carpop-input-error');
        if ($('#carpop-user-mobile').val().trim().length < 10) {
            $('#carpop-user-mobile').parent('.carpop-user-input').addClass('animated shake');
            $('#carpop-user-mobile').parent('.carpop-user-input').addClass('carpop-input-error');
            window.setTimeout(function () {
                $('#carpop-user-mobile').parent('.carpop-user-input').removeClass('animated shake');
            }, 1000);
            clck_invld = 1;
            $('#carpop-user-mobile').focus();
        }
        if (!mail_filter.test($('#carpop-user-email').val())) {
            $('#carpop-user-email').parent('.carpop-user-input').addClass('animated shake');
            window.setTimeout(function () {
                $('#carpop-user-email').parent('.carpop-user-input').removeClass('animated shake');
            }, 1000);
            $('#carpop-user-email').parent('.carpop-user-input').addClass('carpop-input-error');
            $('#carpop-user-email').parent('.carpop-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#carpop-user-email').focus();
        }
        if ($('#carpop-user-last-name').val().trim().length < 1) {
            $('#carpop-user-last-name').parent('.carpop-user-input').addClass('animated shake');
            window.setTimeout(function () {
                $('#carpop-user-last-name').parent('.carpop-user-input').removeClass('animated shake');
            }, 1000);
            $('#carpop-user-last-name').parent('.carpop-user-input').addClass('carpop-input-error');
            $('#carpop-user-last-name').parent('.carpop-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#carpop-user-last-name').focus();
        }
        if ($('#carpop-user-first-name').val().trim().length < 1) {
            $('#carpop-user-first-name').parent('.carpop-user-input').addClass('animated shake');
            window.setTimeout(function () {
                $('#carpop-user-first-name').parent('.carpop-user-input').removeClass('animated shake');
            }, 1000);
            $('#carpop-user-first-name').parent('.carpop-user-input').addClass('carpop-input-error');
            $('#carpop-user-first-name').parent('.carpop-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#carpop-user-first-name').focus();
        }
        if (clck_invld === 1) {
            return false;
        }
        var obj = {
            FirstName: $('#carpop-user-first-name').val(),
            LastName: $('#carpop-user-last-name').val(),
            Email: $('#carpop-user-email').val(),
            Mobile: $('#carpop-user-mobile').val(),
            Make: $('#carpop-car-type input').val(),
            Model: $('#carpop-car-modal input').val(),
            Year: $('#carpop-car-year input').val(),
            City: $('#carpop-car-city input').val(),
            Claim: $('input[name=carpop-know-claim]:checked').val(),
            Expired: $('input[name=carpop-know-expire]:checked').val()
        };

        $('.carpop-user').hide();
        $('.carpop-bought').hide();
        $('.carpop-thank span').text('Dear, ' + $('#carpop-user-first-name').val().trim());
        $('#make-model').text($('#carpop-car-type input').val() + ' ' + $('#carpop-car-modal input').val());
        $('.carpop-thank').show();

        $.ajax({
            url: '/home/postQuote',
            method: 'POST',
            data: obj
        }).
            done(function (data) {
                //$('.carpop-user').hide();
                //$('.carpop-bought').hide(); 
                //$('.carpop-thank span').text('Dear, ' + $('#carpop-user-first-name').val().trim());
                //$('#make-model').text($('#carpop-car-type input').val() + ' ' + $('#carpop-car-modal input').val());
                //$('.carpop-thank').show();
                //console.log(data);
            }).
            fail(function (err) {
                console.log(err);
            });
    });

    $('.bnnr-quote a').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#carpop'
        },
        closeOnBgClick: false,
        callbacks: {
            open: function () {
            },
            beforeClose: function () {
            },
            beforeOpen: function () {

                $('.carpop-know-prev').removeClass('carpop-check-error');
                $('.carpop-input').removeClass('carpop-input-error');
                $('.carpop-user-input').removeClass('carpop-input-error');

                $('#carpop-car-modal input').attr('disabled', true);
                $('#carpop-car-year input').attr('disabled', true);
                $('#carpop-car-city input').attr('disabled', true);

                $('#carpop-car-modal input').val('');
                $('#carpop-car-year input').val('');
                $('#carpop-car-city input').val('');
                $('#carpop-car-type input').val('');
                $('input[name=carpop-know-expire]').removeAttr('checked');
                $('input[name=carpop-know-claim]').removeAttr('checked');
                $('input[name=carpop-know-bought]').removeAttr('checked');

                $('.carpop-list').slideUp();

                $('.carpop-user').hide();
                $('.carpop-thank').hide();
                $('.carpop-no-bought').hide();
                $('#carpop-know-container').hide();
                $('#carpop-notknow-container').show();

                $('#carpop-list-cars').parents('.carpop-block').find('.carpop-input').addClass('active');
                $('#carpop-list-cars').slideDown();

            },
            close: function () {
            }
        }
    });

    $('#carpop-know-continue').click(function () {
        event.preventDefault();
        $('.carpop-know-prev').removeClass('carpop-check-error');
        $('.carpop-input').removeClass('carpop-input-error');
        var clck_invld = 0;
        if ($('input[name=carpop-know-bought]:checked').val() == "No") {
            if ($('input[name=carpop-know-expire]:checked').length <= 0) {
                $('input[name=carpop-know-expire]').parents('.carpop-know-prev').addClass('carpop-check-error');
                clck_invld = 1;
            }
            if ($('input[name=carpop-know-claim]:checked').length <= 0) {
                $('input[name=carpop-know-claim]').parents('.carpop-know-prev').addClass('carpop-check-error');
                clck_invld = 1;
            }
        }
        else if ($('input[name=carpop-know-bought]:checked').length <= 0) {
            $('input[name=carpop-know-bought]').parents('.carpop-know-prev').addClass('carpop-check-error');
            clck_invld = 1;
        }
        if (clck_invld == 1) {
            return false;
        }

        $('#carpop-notknow').hide();
        $('#carpop-bought').hide();
        $('#carpop-know').show
        $('#carpop-know-back').show();
        $('#carpop-know-container').hide();
        $('#carpop-notknow-container').hide();
        $('.carpop-user').show();
    });
    $('#carpop-notknow-continue').click(function () {
        event.preventDefault();
        var clck_invld = 0;
        var clck_make = 0;
        var clck_model = 0;
        $('.carpop-input').removeClass('carpop-input-error');
        $('.carpop-user-input').removeClass('carpop-input-error');
        for (var i = 0; i < make.length; i++) {
            if ($('#carpop-car-type input').val().trim() == make[i]) {
                clck_make = 1;
            }
        }
        for (var i = 0; i < makeModel.Models.length; i++) {
            if ($('#carpop-car-modal input').val().trim() == makeModel.Models[i].Model) {
                clck_model = 1;
            }
        }
        if ($('#carpop-car-type input').val().trim().length < 4 || clck_make == 0) {
            $('#carpop-car-type').addClass('carpop-input-error');
            clck_invld = 1;
            $('#carpop-list-type').focus();
        }
        if ($('#carpop-car-modal input').val().trim().length < 4 || clck_model == 0) {
            $('#carpop-car-modal').addClass('carpop-input-error');
            clck_invld = 1;
            $('#carpop-list-modal').focus();
        }
        if ($('#carpop-car-year input').val().trim().length < 4 || parseInt($('#carpop-car-year input').val().trim()) > (new Date).getFullYear() || parseInt($('#carpop-car-year input').val().trim()) < 1997) {
            $('#carpop-car-year').addClass('carpop-input-error');
            clck_invld = 1;
            $('#carpop-car-year').focus();
        }
        if ($('#carpop-car-city input').val().trim().length < 4) {
            $('#carpop-car-city').addClass('carpop-input-error');
            clck_invld = 1;
            $('#carpop-car-city').focus();
        }

        if (clck_invld == 1) {
            return false;
        }
        $('#carpop-user-make').html($('#carpop-car-type input').val() + '</br> ' + $('#carpop-car-modal input').val());
        $('#carpop-user-year').text($('#carpop-car-year input').val());
        $('#carpop-user-city').text($('#carpop-car-city input').val());

        $('#carpop-notknow-container').hide();
        $('#carpop-bought').hide();
        $('#carpop-old').hide();
        $('#carpop-notknow-back').show();
        $('.carpop-user').hide();
        $('#carpop-know-container').show();
    });
    $('#carpop-bought').click(function () {
        event.preventDefault();
        bought = 1;
        $('.carpop-user').hide();
        $('#carpop-bought').hide();
        $('#carpop-old').show();
        $('#carpop-notknow').hide();
        $('#carpop-know-back').hide();
        $('#carpop-know').show();
        $('#carpop-know-container').hide();
        $('#carpop-notknow-container').show();
    });
    $('#carpop-old').click(function () {
        $('.carpop-user').hide();
        $('#carpop-old').hide();
        $('#carpop-bought').show();
        $('#carpop-notknow-container').hide();
        $('#carpop-know-container').show();
    });

    $('#carpop-know-back').click(function () {
        $('.carpop-user').hide();
        $('#carpop-notknow-container').hide();
        $('#carpop-know-container').show();
        if (bought == 0) {
            $('#carpop-bought').show();
        }
        else {
            $('#carpop-old').show();
        }
    });
    $('#carpop-notknow-back, #carpop-user-back').click(function () {
        $('.carpop-user').hide();
        $('#carpop-notknow-container').show();
        if (bought == 1) {
            $('#carpop-old').show();
        }
    });

    $('.carpop-input input').focus(function () {
        $('.carpop-list').hide();
        $(this).parents('.carpop-block').find('.carpop-list').show();
    });

    $('body').on('click', '.carpop-list-block input:radio', function () {
        var ele = $(this);
        var ele_parent = $(this).parents('.carpop-list');
        if ($(this).val() == '') {
            alert('Not selected');
        } else {
            $(this).parents('.carpop-block').find('.carpop-input').removeClass('active');
            $(this).parents('.carpop-block').find('.carpop-input input').val($(this).val());
            $(this).parents('.carpop-list').hide();
            if (ele_parent.attr('id') == 'carpop-list-cars') {
                $('#carpop-car-modal input').attr('disabled', false);
                $('#carpop-car-modal input').focus();
                model = [];
                $('#carpop-list-modal .car-list-container').empty();
                for (var i = 0; i < makeModel.Models.length; i++) {
                    if ($(this).val() == makeModel.Models[i].Make) {
                        model.push(makeModel.Models[i].Model);
                        if (model.length < 10) {
                            $('#carpop-list-modal .car-list-container').append('<div class="carpop-list-block"><input type="radio" name="car-model" value="' + makeModel.Models[i].Model + '" id="make' + i + '" /><label for="make' + i + '">' + makeModel.Models[i].Model + '</label></div>');
                        }
                    }
                }

                $('#carpop-car-modal input').val('');
                $('#carpop-car-modal input').autocomplete({
                    source: model,
                    minLength: 0,
                    select: function (event, ui) {
                        $('#carpop-list-modal input[value="' + ui.item.value + '"]').attr('checked', true);
                        window.setTimeout(function () {
                            $('#carpop-car-year input').attr('disabled', false);
                            $('#carpop-list-modal').slideUp();
                            $('#carpop-list-year').slideDown();
                            $('#carpop-car-year input').focus();
                        }, 200);
                    }
                });
                $('#carpop-list-modal').parents('.carpop-block').find('.carpop-input').addClass('active');
                $('#carpop-list-modal').show();
            }
            else if (ele_parent.attr('id') == 'carpop-list-modal') {
                $('#carpop-list-year').parents('.carpop-block').find('.carpop-input').addClass('active');
                $('#carpop-list-year').show();
                $('#carpop-car-year input').attr('disabled', false);
                $('#carpop-car-year input').val('');
                $('#carpop-car-year input').focus();
            }
            else if (ele_parent.attr('id') == 'carpop-list-year') {
                $('#carpop-list-city').parents('.carpop-block').find('.carpop-input').addClass('active');
                $('#carpop-list-city').show();
                $('#carpop-car-city input').attr('disabled', false);
                $('#carpop-car-city input').val('');
                $('#carpop-car-city input').focus();
            }
            else if (ele_parent.attr('id') == 'carpop-list-city') {
                //$('#carpop-list-city').slideDown();
            }
        }
    });

    $('#carpop-car-year input').keyup(function () {
        if (parseInt($('#carpop-car-year input').val()) > 1997 && parseInt($('#carpop-car-year input').val()) < 2018) {
            $('#carpop-list-year input[value="' + $('#carpop-car-year input').val() + '"]').attr('checked', true);
            $('#carpop-list-city').slideDown();
            $('#carpop-car-city input').attr('disabled', false);
            $('#carpop-car-city input').val('');
            $('#carpop-car-city input').focus();
        }
    });

    $('input[name=carpop-know-bought]').change(function (evt) {
        if ($('input[name=carpop-know-bought]:checked').val() == "No") {
            $('.carpop-no-bought').show();
        }
        else {
            $('.carpop-no-bought').hide();
        }
    });

    //Car things Section
    $('.things-ttl').click(function () {
        $('.things-description').slideUp();
        $('.things-ttl a').css('transform', 'rotate(0)');
        if ($(this).parents('.things-block').find('.things-description').css('display') == 'none') {
            $(this).parents('.things-block').find('.things-description').slideDown();
            $(this).find('a').css('transform', 'rotate(180deg)');
        }
        else {
            $(this).parents('.things-block').find('.things-description').slideUp();
            $(this).find('a').css('transform', 'rotate(0)');
        }
    });

    //Travel Popup
    $('#travel-request').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#travel-popup'
        },
        callbacks: {
            open: function () {
                var today = new Date(),
                    dd = today.getDate(),
                    mm = today.getMonth() + 1,
                    yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd
                }
                if (mm < 10) {
                    mm = '0' + mm
                }

                threemonth = Number(mm) + (+3);
                if (threemonth < 10) {
                    threemonth = '0' + threemonth
                }

                today = yyyy + '-' + mm + '-' + dd;
                afterthree = yyyy + '-' + threemonth + '-' + dd;
                document.getElementById('travel-start').setAttribute("min", today);
                document.getElementById('travel-start').setAttribute("max", afterthree);
                document.getElementById('travel-end').setAttribute("min", today);
                document.getElementById('travel-end').setAttribute("max", afterthree);
            },
            beforeClose: function () {

            },
            close: function () {
            }
        }
    });

    $('.travel-continue a').click(function () {

        event.preventDefault();
        var clck_invld = 0;
        $('.travel-date-block').removeClass('carpop-input-error');
        $('.travel-trip-block-inner').removeClass('carpop-check-error');
        if ($('#travel-start').val().trim().length < 4) {
            $('#travel-start').parent('.travel-date-block').addClass('carpop-input-error');
            clck_invld = 1;
            $(this).focus();
        }

        if ($('#travel-end').val().trim().length < 4) {
            $('#travel-end').parent('.travel-date-block').addClass('carpop-input-error');
            clck_invld = 1;
            $(this).focus();
        }

        if (new Date($('#travel-start').val()).getTime() > new Date($('#travel-end').val()).getTime()) {
            $('#travel-start').parent('.travel-date-block').addClass('carpop-input-error');
            $('#travel-end').parent('.travel-date-block').addClass('carpop-input-error');
            clck_invld = 1;
            $(this).focus();
        }

        if ($('#travelling-to').val().trim().length < 4) {
            $('#travelling-to').parent('.travel-date-block').addClass('carpop-input-error');
            clck_invld = 1;
            $(this).focus();
        }
        if ($('#travel-people').val().trim().length < 1) {
            $('#travel-people').parent('.travel-date-block').addClass('carpop-input-error');
            clck_invld = 1;
            $(this).focus();
        }
        if (Number($('#travel-people').val()) !== (+Number($('#travel-adult').val()) + +Number($('#travel-senior').val()) + +Number($('#travel-child').val()))) {
            $('#travel-people').parent('.travel-date-block').addClass('carpop-input-error');
            $('#travel-adult').parent('.travel-date-block').addClass('carpop-input-error');
            clck_invld = 1;
            $(this).focus();
        }
        if ($('#travel-people').val().trim().length < 1) {
            $('#travel-people').parent('.travel-date-block').addClass('carpop-input-error');
            clck_invld = 1;
            $(this).focus();
        }
        if ($('input[name=tripfromindia]:checked').length <= 0) {
            $('input[name=tripfromindia]').parents('.travel-trip-block-inner').addClass('carpop-check-error');
            clck_invld = 1;
        }
        if ($('input[name=residentindia]:checked').length <= 0) {
            $('input[name=residentindia]').parents('.travel-trip-block-inner').addClass('carpop-check-error');
            clck_invld = 1;
        }

        if (clck_invld == 1) {
            return false;
        }
        $('.travel-container').hide();
        $('.travel-user-container').show();
    });

    $('#travel-back').click(function () {
        event.preventDefault();
        $('.travel-user-container').hide();
        $('.travel-container').show();
    });

    $('.travel-user-quote button').click(function () {
        event.preventDefault();
        var clck_invld = 0,
            mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            mob_filter = /^[0-9]*$/;
        if ($('#travel-mobile').val().trim().length < 10) {
            $('#travel-mobile').parent('.travel-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#travel-mobile').focus();
        }
        if ($(!mail_filter.test($('#travel-email').val()))) {
            $('#travel-email').parent('.travel-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#travel-email').focus();
        }
        if ($('#travel-lname').val().trim().length < 4) {
            $('#travel-lname').parent('.travel-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#travel-lname').focus();
        }
        if ($('#travel-fname').val().trim().length < 4) {
            $('#travel-fname').parent('.travel-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#travel-fname').focus();
        }

        if (clck_invld == 1) {
            return false;
        }

    });

    //Claim Popup
    $('#claim-popup').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#claim-form'
        },
        callbacks: {
            open: function () {
                
            },
            beforeClose: function () {

            },
            close: function () {
            }
        }
    });

    $('body').on('click', '.claim-pop-submit button', function () {
        var clck_invld = 0,
            mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            mob_filter = /^[0-9]*$/;
        $('.claim-form-input').removeClass('carpop-input-error');
        if ($('#claim-mobile').val().trim().length < 10) {
            $('#claim-mobile').parent('.claim-form-input').addClass('animated shake');
            $('#claim-mobile').parent('.claim-form-input').addClass('carpop-input-error');
            window.setTimeout(function () {
                $('#claim-mobile').parent('.claim-form-input').removeClass('animated shake');
            }, 1000);
            clck_invld = 1;
            $('#claim-mobile').focus();
        }
        if ($('#claim-happened').val().trim().length < 5) {
            $('#claim-happened').parent('.claim-form-input').addClass('animated shake');
            window.setTimeout(function () {
                $('#claim-happened').parent('.claim-form-input').removeClass('animated shake');
            }, 1000);
            $('#claim-happened').parent('.claim-form-input').addClass('carpop-input-error');
            $('#claim-happened').parent('.claim-form-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#claim-happened').focus();
        }
        if ($('#claim-what-is').val().trim().length < 5) {
            $('#claim-what-is').parent('.claim-form-input').addClass('animated shake');
            window.setTimeout(function () {
                $('#claim-what-is').parent('.claim-form-input').removeClass('animated shake');
            }, 1000);
            $('#claim-what-is').parent('.claim-form-input').addClass('carpop-input-error');
            $('#claim-what-is').parent('.claim-form-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#claim-what-is').focus();
        }
        if (clck_invld === 1) {
            return false;
        }

        $('.claim-form-ttl').hide();
        $('.claim-form-container').hide();
        $('.carpop-thank').show();

        var obj = {
            What: $('#claim-what-is').val(),
            Happened: $('#claim-happened').val(),
            Mobile: $('#claim-mobile').val()
        };

        $.ajax({
            url: '/home/postClaim',
            method: 'POST',
            data: obj
        }).
            done(function (data) {
            }).
            fail(function (err) {
                console.log(err);
            });
    });


    $('#claim-call-button').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#claim-call-popup'
        },
        callbacks: {
            open: function () {

            },
            beforeClose: function () {

            },
            close: function () {
            }
        }
    });

    //Elite Popup
    $('#elite-popup').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#elite-form'
        },
        callbacks: {
            open: function () {

            },
            beforeClose: function () {

            },
            close: function () {
            }
        }
    });

    $('body').on('click', '.elite-pop-submit button', function () {
        var clck_invld = 0,
            mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            mob_filter = /^[0-9]*$/;
        $('.elite-form-input').removeClass('carpop-input-error');
        if ($('#elite-form-mobile').val().trim().length < 10) {
            $('#elite-form-mobile').parent('.elite-form-input').addClass('animated shake');
            $('#elite-form-mobile').parent('.elite-form-input').addClass('carpop-input-error');
            window.setTimeout(function () {
                $('#elite-form-mobile').parent('.elite-form-input').removeClass('animated shake');
            }, 1000);
            clck_invld = 1;
            $('#elite-form-mobile').focus();
        }
        if (!mob_filter.test($('#elite-form-mobile').val())) {
            $('#elite-form-mobile').parent('.elite-form-input').addClass('animated shake');
            $('#elite-form-mobile').parent('.elite-form-input').addClass('carpop-input-error');
            window.setTimeout(function () {
                $('#elite-form-mobile').parent('.elite-form-input').removeClass('animated shake');
            }, 1000);
            clck_invld = 1;
            $('#elite-form-mobile').focus();
        }
        if (!mail_filter.test($('#elite-form-email').val())) {
            $('#elite-form-email').parent('.elite-form-input').addClass('animated shake');
            window.setTimeout(function () {
                $('#elite-form-email').parent('.elite-form-input').removeClass('animated shake');
            }, 1000);
            $('#elite-form-email').parent('.elite-form-input').addClass('carpop-input-error');
            $('#elite-form-email').parent('.elite-form-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#elite-form-email').focus();
        }
        if ($('#elite-form-lastname').val().trim().length < 1) {
            $('#elite-form-lastname').parent('.elite-form-input').addClass('animated shake');
            window.setTimeout(function () {
                $('#elite-form-lastname').parent('.elite-form-input').removeClass('animated shake');
            }, 1000);
            $('#elite-form-lastname').parent('.elite-form-input').addClass('carpop-input-error');
            $('#elite-form-lastname').parent('.elite-form-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#elite-form-lastname').focus();
        }
        if ($('#elite-form-firstname').val().trim().length < 1) {
            $('#elite-form-firstname').parent('.elite-form-input').addClass('animated shake');
            window.setTimeout(function () {
                $('#elite-form-firstname').parent('.elite-form-input').removeClass('animated shake');
            }, 1000);
            $('#elite-form-firstname').parent('.elite-form-input').addClass('carpop-input-error');
            $('#elite-form-firstname').parent('.elite-form-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#elite-form-firstname').focus();
        }
        if (clck_invld === 1) {
            return false;
        }

        $('.elite-form-ttl').hide();
        $('.elite-form-subttl').hide();
        $('.elite-form-container').hide();
        $('.carpop-thank span').text('Dear, ' + $('#elite-form-firstname').val().trim());
        $('.carpop-thank').show();

        var obj = {
            FirstName: $('#elite-form-firstname').val(),
            LastName: $('#elite-form-firstname').val(),
            Email: $('#elite-form-email').val(),
            Mobile: $('#elite-form-mobile').val()
        };

        $.ajax({
            url: '/home/postElite',
            method: 'POST',
            data: obj
        }).
            done(function (data) {
                //$('.carpop-user').hide();
                //$('.carpop-bought').hide(); 
                //$('.carpop-thank span').text('Dear, ' + $('#carpop-user-first-name').val().trim());
                //$('#make-model').text($('#carpop-car-type input').val() + ' ' + $('#carpop-car-modal input').val());
                //$('.carpop-thank').show();
                //console.log(data);
            }).
            fail(function (err) {
                console.log(err);
            });
    });

    //gadget Popup
    $('#gadget-request').magnificPopup({
        type: 'inline',
        preloader: false,
        items: {
            src: '#gadgetpop'
        },
        callbacks: {
            open: function () {

            },
            beforeClose: function () {

            },
            close: function () {
            }
        }
    });

    $('#gadgetpop-continue').click(function () {
        event.preventDefault();
        var clck_invld = 0;
        if ($('#gadget-purchase-type').val().trim().length < 10) {
            $('#gadget-purchase-type').parent('.carpop-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#gadget-purchase-type').focus();
        }
        if ($('#gadget-purchase-date').val().trim().length < 10) {
            $('#gadget-purchase-date').parent('.carpop-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#gadget-purchase-date').focus();
        }
        $('#gadgetpop-container').hide();
        $('.gadgetpop-user-container').show();
    });

    $('#gadget-back').click(function () {
        event.preventDefault();
        $('.gadgetpop-user-container').hide();
        $('#gadgetpop-container').show();
    });

    $('.gadget-user-quote button').click(function () {
        event.preventDefault();
        var clck_invld = 0,
            mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            mob_filter = /^[0-9]*$/;
        $('.travel-user-input').removeClass('carpop-input-error');
        if ($('#gadget-mobile').val().trim().length < 10) {
            $('#gadget-mobile').parent('.travel-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#gadget-mobile').focus();
        }
        if ($(!mail_filter.test($('#gadget-email').val()))) {
            $('#gadget-email').parent('.travel-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#gadget-email').focus();
        }
        if ($('#gadget-lname').val().trim().length < 4) {
            $('#gadget-lname').parent('.travel-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#gadget-lname').focus();
        }
        if ($('#gadget-fname').val().trim().length < 4) {
            $('#gadget-fname').parent('.travel-user-input').addClass('carpop-input-error');
            clck_invld = 1;
            $('#gadget-fname').focus();
        }

        if (clck_invld == 1) {
            return false;
        }
    });


    //Contact Submit
    $('.contact-submit button').click(function () {
        var clck_invld = 0,
            mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            mob_filter = /^[0-9]*$/;
        $('.contact-form').removeClass('carpop-input-error');
        if ($('#contact-subject').val().trim().length < 3) {
            $('#contact-subject').parent('.contact-form').addClass('carpop-input-error');
            $('#contact-subject').parent('.contact-form').addClass('carpop-input-error');
            clck_invld = 1;
            $('#contact-subject').focus();
        }
        if ($('#contact-mobile').val().trim().length < 4) {
            $('#contact-mobile').parent('.contact-form').addClass('carpop-input-error');
            $('#contact-mobile').parent('.contact-form').addClass('carpop-input-error');
            clck_invld = 1;
            $('#contact-mobile').focus();
        }
        if (!mail_filter.test($('#contact-email').val())) {
            $('#contact-email').parent('.contact-form').addClass('carpop-input-error');
            $('#contact-email').parent('.contact-form').addClass('carpop-input-error');
            clck_invld = 1;
            $('#contact-email').focus();
        }
        if ($('#contact-name').val().trim().length < 3) {
            $('#contact-name').parent('.contact-form').addClass('carpop-input-error');
            $('#contact-name').parent('.contact-form').addClass('carpop-input-error');
            clck_invld = 1;
            $('#contact-name').focus();
        }

        if (clck_invld) {
            return false;
        }

        $('.contact-thank span').text('Dear ' + $('#contact-name').val() + ',');
        $('.contact-thank').show();

        $.magnificPopup.open({
            type: 'inline',
            preloader: false,
            items: {
                src: '#contactpop'
            },
            callbacks: {
                open: function () {
                },
                beforeClose: function () {

                },
                close: function () {
                }
            }
        });
    });

    //Claims Page text animation

    //var panelInterval,
    //    count = 0,
    //    $divs = $('.claim-bnnr-content li');
    //panelInterval = setInterval(function () {
    //    if (count < $divs.length - 1) {
    //        $divs.eq(count).find('h2').addClass('sliderfadeOutUp');
    //        $divs.eq(count).find('.claim-bnnr-moto').addClass('sliderfadeOutUp');

    //        setTimeout(function () {
    //            $divs.eq(count).hide();
    //            $divs.eq(count).find('.sliderfadeOutUp').removeClass('sliderfadeOutUp');
    //            $('.claim-bnnr-art').removeClass('claim-bnnr-' + count);
    //            $('.claim-bnnr-art:before').css('display', 'none');
    //            count++;
    //            $divs.eq(count).find('h2').addClass('sliderfadeInUp');
    //            $('.claim-bnnr-art:before').css('display', 'block');
    //            $divs.eq(count).find('.claim-bnnr-moto').addClass('sliderfadeInUp');
    //            $('.claim-bnnr-art').addClass('claim-bnnr-' + count);
    //            $divs.eq(count).show();
    //        }, 400);
    //    }
    //    else {
    //        $divs.eq(count).find('h2').addClass('sliderfadeOutUp');
    //        $divs.eq(count).find('.claim-bnnr-moto').addClass('sliderfadeOutUp');
    //        $('.claim-bnnr-art:before').css('animation-name', 'fadeOut');
    //        setTimeout(function () {
    //            $divs.eq(count).hide();
    //            $divs.eq(count).find('.sliderfadeOutUp').removeClass('sliderfadeOutUp');
    //            $('.claim-bnnr-art:before').css('animation-name', 'fadeIn');
    //            $('.claim-bnnr-art').removeClass('claim-bnnr-' + count);
    //            $('.claim-bnnr-art:before').css('display', 'none');

    //            count = 0;
    //            $('.claim-bnnr-art:before').css('display', 'block');
    //            $divs.eq(count).find('h2').addClass('sliderfadeInUp');
    //            $divs.eq(count).find('.claim-bnnr-moto').addClass('sliderfadeInUp');
    //            $('.claim-bnnr-art').addClass('claim-bnnr-' + count);
    //            $divs.eq(count).show();
    //        }, 400);

    //    }
    //}, 3000);


    //var $divs = $('.claim-bnnr-content li').hide(),
    //current = 0;
    //$divs.eq(0).show();

    //function claimslider() {
    //    if (current < $divs.length - 1) {
    //        $divs.eq(current).delay(2000).fadeOut('fast', function () {
    //            current++;
    //            $divs.eq(current).fadeIn('fast');
    //            if (current == $divs.length - 1) {
    //                current = 0;
    //            }
    //            claimslider();
    //        });

    //    }

    //}
    //claimslider();

});