/**
 * Expand or close the sidebar in mobile screens.
<<<<<<< HEAD
 * v2.0
 * https://github.com/cotes2020/jekyll-theme-chirpy
 * © 2018-2019 Cotes Chung
 * MIT License
=======
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
 */

$(function() {

<<<<<<< HEAD
  var sidebarUtil = (function() {
    const ATTR_DISPLAY = "sidebar-display";
    var isExpanded = false;
    var body = $("body");
=======
  const sidebarUtil = (function () {
    const ATTR_DISPLAY = "sidebar-display";
    let isExpanded = false;
    const body = $("body");
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413

    return {
      toggle() {
        if (isExpanded === false) {
          body.attr(ATTR_DISPLAY, "");
        } else {
          body.removeAttr(ATTR_DISPLAY);
        }

        isExpanded = !isExpanded;
      }
    };

  }());

  $("#sidebar-trigger").click(sidebarUtil.toggle);

  $("#mask").click(sidebarUtil.toggle);

});
