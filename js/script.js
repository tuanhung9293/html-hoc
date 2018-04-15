$(document).ready(function () {
    var selector = '.link-elms a';

    $(selector).on('click', function () {
        $(selector).removeClass('active');
        $(this).addClass('active');
    });
});
