$(document).ready(function () {
    $(".datepicker").datepicker({
        "dateFormat": 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });

    $('#lgn-submit').click(function () {
        $('.lgn-input').removeClass('lgn-error');

        var clck_invld = 0;
        var mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if ($('input[name=Password]').val().trim().length < 6) {
            $('input[name=Password]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=Password]').focus();
        }
        if (!mail_filter.test($('input[name=UserName]').val())) {
            $('input[name=UserName]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=UserName]').focus();
        }

        if (clck_invld === 1) {
            return false;
        }
    });

    $('#rgstr-submit').click(function () {
        $('.lgn-input').removeClass('lgn-error');

        var clck_invld = 0,
            mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            mob_filter = /^[0-9]*$/;

        if ($('input[name=Password]').val().trim().length < 6) {
            $('input[name=Password]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=Password]').focus();
        }
        if (!mob_filter.test($('input[name=Mobile]').val())) {
            $('input[name=Mobile]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=Mobile]').focus();
        }
        if ($('input[name=Mobile]').val().trim().length < 8) {
            $('input[name=Mobile]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=Mobile]').focus();
        }
        if (!mail_filter.test($('input[name=UserName]').val())) {
            $('input[name=UserName]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=UserName]').focus();
        }
        if ($('input[name=LastName]').val().trim().length < 2) {
            $('input[name=LastName]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=LastName]').focus();
        }
        if ($('input[name=FirstName]').val().trim().length < 2) {
            $('input[name=FirstName]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=FirstName ]').focus();
        }
        if (clck_invld === 1) {
            return false;
        }
    });

    $('#forgot-submit').click(function () {
        $('.lgn-input').removeClass('lgn-error');

        var clck_invld = 0;
        var mail_filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if (!mail_filter.test($('input[name=Email]').val())) {
            $('input[name=Email]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=Email]').focus();
        }

        if (clck_invld === 1) {
            return false;
        }
    });

    $('#reset-submit').click(function () {
        $('.lgn-input').removeClass('lgn-error');

        var clck_invld = 0;
       
        if (!($('input[name=Password]').val().trim() == $('input[name=ConfirmPassword]').val().trim())) {
            $('input[name=ConfirmPassword]').parent('.lgn-input').addClass('lgn-error');
            $('.reset-confirm').show();
            clck_invld = 1;
            $('input[name=ConfirmPassword]').focus();
        }
        if ($('input[name=ConfirmPassword]').val().trim().length < 6) {
            $('input[name=ConfirmPassword]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=ConfirmPassword]').focus();
        }
        if ($('input[name=Password]').val().trim().length < 6) {
            $('input[name=Password]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=Password]').focus();
        }
        if (clck_invld === 1) {
            return false;
        }
    });

    $('#change-submit').click(function () {
        $('.lgn-input').removeClass('lgn-error');

        var clck_invld = 0;

        if (!($('input[name=NewPassword]').val().trim() == $('input[name=ConfirmNewPassword]').val().trim())) {
            $('input[name=ConfirmNewPassword]').parent('.lgn-input').addClass('lgn-error');
            $('.reset-confirm').show();
            clck_invld = 1;
            $('input[name=ConfirmNewPassword]').focus();
        }
        if ($('input[name=ConfirmNewPassword]').val().trim().length < 6) {
            $('input[name=ConfirmNewPassword]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=ConfirmNewPassword]').focus();
        }
        if ($('input[name=NewPassword]').val().trim().length < 6) {
            $('input[name=NewPassword]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=NewPassword]').focus();
        }
        if ($('input[name=OldPassword]').val().trim().length < 6) {
            $('input[name=OldPassword]').parent('.lgn-input').addClass('lgn-error');
            clck_invld = 1;
            $('input[name=OldPassword]').focus();
        }
        if (clck_invld === 1) {
            return false;
        }
    });

    $('.accnt-menu-link-policy,.policy-hdr-link').magnificPopup({
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

    $('.accnt-menu-link-claim,.policy-claim-link').magnificPopup({
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
});