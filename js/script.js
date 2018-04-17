// function initPage() {
//     // top bar
//     var selector = '.link-elms a';
//     $(selector).on('click', function () {
//         $(selector).removeClass('active');
//         $(this).addClass('active');
//     });
// }

function homePage() {
    // banks slider
    $("#bank-slide #carousel .slide").clone().appendTo("#bank-slide #carousel");
    $('#bank-slide #next').click(function () {
        shiftSlide(-1, '#bank-slide #carousel')
    })
    $('#bank-slide #prev').click(function () {
        shiftSlide(1, '#bank-slide #carousel')
    })

    // productions slider
    $("#product-slide #carousel .slide").clone().appendTo("#product-slide #carousel");
    $('#product-slide #next').click(function () {
        shiftSlide(-1, '#product-slide #carousel')
    })
    $('#product-slide #prev').click(function () {
        shiftSlide(1, '#product-slide #carousel')
    })

    function shiftSlide(direction, id) {
        var carouselProd = $(`${id}`);
        if (direction === 1) {
            var slideWidth = $(`${id} .slide:last`).width();

            $(document).off('mouseup')
            carouselProd.off('mousemove')
                .addClass('transition')
                .css('transform', 'translateX(' + (slideWidth) + 'px)');
            setTimeout(function () {
                $(`${id} .slide:first`).before($(`${id} .slide:last`));
                carouselProd.removeClass('transition')
                carouselProd.css('transform', 'translateX(0px)');
            }, 700)

        } else if (direction === -1) {
            var slideWidth = $(`${id} .slide:first`).width();

            $(document).off('mouseup')
            carouselProd.off('mousemove')
                .addClass('transition')
                .css('transform', 'translateX(' + (-slideWidth) + 'px)');
            setTimeout(function () {
                $(`${id} .slide:last`).before($(`${id} .slide:first`));
                carouselProd.removeClass('transition')
                carouselProd.css('transform', 'translateX(0px)');
            }, 400)
        }
    }

    autoRunSlide('#product-slide #carousel');
    function autoRunSlide(id) {
        var carouselProd = $(`${id}`);
        setInterval(function () {
            var slideWidth = $(`${id} .slide:first`).width() + $(`${id} .slide:nth-child(2)`).width() + $(`${id} .slide:nth-child(3)`).width();

            $(document).off('mouseup')
            carouselProd.off('mousemove')
                .addClass('transition')
                .css('transform', 'translateX(' + (-slideWidth) + 'px)');
            setTimeout(function () {
                $(`${id} .slide:last`).before($(`${id} .slide:first`));
                $(`${id} .slide:last`).before($(`${id} .slide:first`));
                $(`${id} .slide:last`).before($(`${id} .slide:first`));
                carouselProd.removeClass('transition')
                carouselProd.css('transform', 'translateX(0px)');
            }, 3400)
        }, 3450);
    }

    // fixed bar
    var elmTop = $('#start-production').offset().top;
    var elmBottom = $('#end-production').offset().top - $(window).height() - $('#fix-table').height();

    function fixTable() {
        if ($(this).scrollTop() < elmTop) {
            $('#fix-table').removeClass().addClass('position-top');
            return;
        } else if (($(this).scrollTop() >= elmTop) && ($(this).scrollTop() < elmBottom)) {
            $('#fix-table').removeClass().addClass('position-mid');
            return;
        } else {
            $('#fix-table').removeClass().addClass('position-bottom');
        }
    }

    fixTable();
    $(document).on('scroll', fixTable);
}


function productsPage() {
    // set slider height of products page
    var shortest = 1000;
    $(".carousel-inner .carousel-item").each(function () {
        $this = $(this);
        if ($this.outerHeight() < shortest) {
            shortest = $this.outerHeight();
        }
    });
    $('.carousel-inner').css('height', `${shortest}px`);

    // set slider auto run of products page
    $('.carousel').carousel({
        interval: 3000
    })
}
