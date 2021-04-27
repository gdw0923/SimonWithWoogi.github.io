/*
Reference: https://bootsnipp.com/snippets/featured/link-to-top-page
*/
<<<<<<< HEAD
$(window).scroll(function() {
  if ($(this).scrollTop() > 50
      && $("#sidebar-trigger").css("display") === "none") {
    $("#back-to-top").fadeIn();
  } else {
    $("#back-to-top").fadeOut();
  }
});

$(function() {
  $("#back-to-top").click(function() {
    $("body,html").animate({scrollTop: 0}, 800);
    return false;
  });
});
=======
$(function() {
  $(window).scroll(() => {
    if ($(this).scrollTop() > 50 &&
      $("#sidebar-trigger").css("display") === "none") {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
    }
  });

  $("#back-to-top").click(() => {
    $("body,html").animate({
      scrollTop: 0
    }, 800);
    return false;
  });
});
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
