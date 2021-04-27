/*
<<<<<<< HEAD
 * Topbar title auto change while scrolling in mobile screens.
 * v2.0
 * https://github.com/cotes2020/jekyll-theme-chirpy
 * © 2018-2019 Cotes Chung
 * MIT License
=======
 * Top bar title auto change while scrolling in mobile screens.
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
*/

$(function() {

<<<<<<< HEAD
  var DEFAULT = $("#topbar-title").text().trim();
  var title = ($("div.post>h1").length > 0) ?
          $("div.post>h1").text().trim() : $("h1").text().trim();
=======
  const topbarTitle = $("#topbar-title");
  const postTitle = $("div.post>h1");

  const DEFAULT = topbarTitle.text().trim();

  let title = (postTitle.length > 0) ?
    postTitle.text().trim() : $("h1").text().trim();
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413

  if ($("#page-category").length || $("#page-tag").length) {
    /* The title in Category or Tag page will be "<title> <count_of_posts>" */
    if (/\s/.test(title)) {
      title = title.replace(/[0-9]/g, "").trim();
    }
  }

  /* Replace topbar title while scroll screens. */
  $(window).scroll(function () {
    if ($("#post-list").length /* in Home page */
<<<<<<< HEAD
      || $("div.post>h1").is(":hidden") /* is tab pages */
      || $("#topbar-title").is(":hidden") /* not mobile screens */
=======
      || postTitle.is(":hidden") /* is tab pages */
      || topbarTitle.is(":hidden") /* not mobile screens */
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
      || $("#sidebar.sidebar-expand").length) { /* when the sidebar trigger is clicked */
      return false;
    }

    if ($(this).scrollTop() >= 95) {
<<<<<<< HEAD
      if ($("#topbar-title").text() !== title) {
        $("#topbar-title").text(title);
      }
    } else {
      if ($("#topbar-title").text() !== DEFAULT) {
        $("#topbar-title").text(DEFAULT);
=======
      if (topbarTitle.text() !== title) {
        topbarTitle.text(title);
      }
    } else {
      if (topbarTitle.text() !== DEFAULT) {
        topbarTitle.text(DEFAULT);
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
      }
    }
  });

  /* Click title remove hover effect. */
<<<<<<< HEAD
  $("#topbar-title").click(function() {
    $("body,html").animate({scrollTop: 0}, 800);
  });

});
=======
  topbarTitle.click(function() {
    $("body,html").animate({scrollTop: 0}, 800);
  });

});
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
