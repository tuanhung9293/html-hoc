$(document).ready(function () {
    var selector = '.link-elms a';

    $(selector).on('click', function () {
        $(selector).removeClass('active');
        $(this).addClass('active');
    });

    var carousel = $('#carousel');
    $("#carousel .slide").clone().appendTo("#carousel");
    
    $('#next').click(function () { shiftSlide(-1) })
    $('#prev').click(function () { shiftSlide(1) })

    function shiftSlide(direction) {
        if (direction === 1) {
            var slideWidth = $('.slide:last').width();

            $(document).off('mouseup')
            carousel.off('mousemove')
                .addClass('transition')
                .css('transform', 'translateX(' + (slideWidth) + 'px)');
            setTimeout(function () {
                $('.slide:first').before($('.slide:last'));
                carousel.removeClass('transition')
                carousel.css('transform', 'translateX(0px)');
            }, 700)

        } else if (direction === -1) {
            var slideWidth = $('.slide:first').width();

            $(document).off('mouseup')
            carousel.off('mousemove')
                .addClass('transition')
                .css('transform', 'translateX(' + (-slideWidth) + 'px)');
            setTimeout(function () {
                $('.slide:last').after($('.slide:first'));
                carousel.removeClass('transition')
                carousel.css('transform', 'translateX(0px)');
            }, 700)
        }
    }
});
