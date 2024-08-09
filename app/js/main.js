function slowScroll(id) {
    $("html, body").animate({
        scrollTop: $(id).offset().top
    }, 0);
    return false;
} // Функция плавного скролла до нужный секции на сайте при нажатии на ссылке в шапке/футере

$(".header-top .menu").on("click", () => {
    if($("header .mobile-menu").is(":visible"))
        $(".header-top .menu").html('<i class="fa-solid fa-bars"></i>');
    else 
        $(".header-top .menu").html('<i class="fa-solid fa-xmark"></i>');

    $("header .mobile-menu").slideToggle();
});

$("#subscribe").on("click", () => {
    let email = $("#email").val();
    email = email.trim();
    if(email.split("@").length != 2 || email.split(".").length < 2) {
        $("#sub_form label").text("You have entered an incorrect email address.");
        $("#sub_form label").fadeIn();
    } // Проверка на верность введения email в input поле

    setTimeout(() => {
        $("#sub_form label").fadeOut();
    }, 1500); // Функция, скрывающая ошибку через 1,5 секунды при неправильном вводе email 
}); // Функция, проверяющая правильность введения данных в email поле

$('.video-play, #modal-video .close-button').on('click', function() {
    $("#modal-video").toggle();
    $("body").toggleClass("overflow-hidden");
    resizeVideo();
}); // Функция, полказывающая и скрывающая видео при нажатии на кнопку плей
// и адаптация размеров всплывающего видео под размеры экрана

$(window).on('resize', function() {
    resizeVideo();
}).resize(); // При изменении размеров экрана будет вызываться функция resizeVideo,
// которая подстраивается под размеры экрана

function resizeVideo() {
    $("iframe").each(function() {
        let width = $(this).width();
        $(this).css("height", width / 1.77 + "px");
    });
} // Функция, подстраивающая высоту экрана под текущую ширину экрана, чтобы были
// наиболее качественные пропорции для просмотра видео