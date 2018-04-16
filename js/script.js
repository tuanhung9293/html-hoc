$(document).ready(function () {

    // top bar
    var selector = '.link-elms a';
    $(selector).on('click', function () {
        $(selector).removeClass('active');
        $(this).addClass('active');
    });
    
    // banks slider
    var carousel = $('#carousel');
    $("#carousel .slide").clone().appendTo("#carousel");
    
    $('#next').click(function () { shiftSlide(-1) })
    $('#prev').click(function () { shiftSlide(1) })

    function shiftSlide(direction) {
        if (direction === 1) {
            var slideWidth = $('#carousel .slide:last').width();

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
            var slideWidth = $('#carousel .slide:first').width();

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

    // productions slider
    var carouselProd = $('#carousel-prod');
    $("#carousel-prod .slide-prod").clone().appendTo("#carousel-prod");
    
    $('#next-prod').click(function () { shiftSlideProd(-1) })
    $('#prev-prod').click(function () { shiftSlideProd(1) })

    function shiftSlideProd(direction) {
        if (direction === 1) {
            var slideWidth = $('#carousel-prod .slide-prod:last').width();

            $(document).off('mouseup')
            carouselProd.off('mousemove')
                .addClass('transition')
                .css('transform', 'translateX(' + (slideWidth) + 'px)');
            setTimeout(function () {
                $('.slide-prod:first').before($('.slide-prod:last'));
                carouselProd.removeClass('transition')
                carouselProd.css('transform', 'translateX(0px)');
            }, 700)

        } else if (direction === -1) {
            var slideWidth = $('#carousel-prod .slide-prod:first').width();

            $(document).off('mouseup')
            carouselProd.off('mousemove')
                .addClass('transition')
                .css('transform', 'translateX(' + (-slideWidth) + 'px)');
            setTimeout(function () {
                $('.slide-prod:last').after($('.slide-prod:first'));
                carouselProd.removeClass('transition')
                carouselProd.css('transform', 'translateX(0px)');
            }, 700)
        }
    }

    // fixed bar
    var elmTop = $('#start-production').offset().top;
    var elmBottom = $('#end-production').offset().top - $(window).height() - $('#fix-table').height();

    function fixTable() {
        if ($(this).scrollTop()<elmTop) {
            $('#fix-table').removeClass().addClass('position-top');
            return;
        } else if (($(this).scrollTop()>=elmTop) && ($(this).scrollTop()<elmBottom)) {
            $('#fix-table').removeClass().addClass('position-mid');
            return;
        } else {
            $('#fix-table').removeClass().addClass('position-bottom');
        }
    }

    fixTable();
    $(document).on('scroll', fixTable);
   
    
});
