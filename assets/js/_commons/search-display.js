/*
* This script make #search-result-wrapper switch to unloaded or shown automatically.
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
  var btnSbTrigger = $("#sidebar-trigger");
  var btnSearchTrigger = $("#search-trigger");
  var btnCancel = $("#search-cancel");
  var btnClear = $("#search-cleaner");

  var main = $("#main");
  var topbarTitle = $("#topbar-title");
  var searchWrapper = $("#search-wrapper");
  var resultWrapper = $("#search-result-wrapper");
  var results = $("#search-results");
  var input = $("#search-input");
  var hints = $("#search-hints");


  /*--- Actions in small screens (Sidebar unloaded) ---*/

  var scrollBlocker = (function() {
    var offset = 0;
    return {
      block() {
        offset = $(window).scrollTop();
=======
  const btnSbTrigger = $("#sidebar-trigger");
  const btnSearchTrigger = $("#search-trigger");
  const btnCancel = $("#search-cancel");
  const btnClear = $("#search-cleaner");

  const main = $("#main");
  const topbarTitle = $("#topbar-title");
  const searchWrapper = $("#search-wrapper");
  const resultWrapper = $("#search-result-wrapper");
  const results = $("#search-results");
  const input = $("#search-input");
  const hints = $("#search-hints");

  const scrollBlocker = (function () {
    let offset = 0;
    return {
      block() {
        offset = window.scrollY;
        $("html,body").scrollTop(0);
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
      },
      release() {
        $("html,body").scrollTop(offset);
      },
      getOffset() {
        return offset;
      }
    };
  }());

<<<<<<< HEAD
  var mobileSearchBar = (function() {
=======

  /*--- Actions in small screens (Sidebar unloaded) ---*/

  const mobileSearchBar = (function () {
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
    return {
      on() {
        btnSbTrigger.addClass("unloaded");
        topbarTitle.addClass("unloaded");
        btnSearchTrigger.addClass("unloaded");
        searchWrapper.addClass("d-flex");
        btnCancel.addClass("loaded");
      },
      off() {
        btnCancel.removeClass("loaded");
        searchWrapper.removeClass("d-flex");
        btnSbTrigger.removeClass("unloaded");
        topbarTitle.removeClass("unloaded");
        btnSearchTrigger.removeClass("unloaded");
      }
    };
  }());

<<<<<<< HEAD
  var resultSwitch = (function() {
    var visable = false;

    return {
      on() {
        if (!visable) {
          resultWrapper.removeClass("unloaded");
          main.addClass("hidden");

          visable = true;
          scrollBlocker.block();
        }
      },
      off() {
        if (visable) {
=======
  const resultSwitch = (function () {
    let visible = false;

    return {
      on() {
        if (!visible) {
          // the block method must be called before $(#main) unloaded.
          scrollBlocker.block();
          resultWrapper.removeClass("unloaded");
          main.addClass("unloaded");
          visible = true;
        }
      },
      off() {
        if (visible) {
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
          results.empty();
          if (hints.hasClass("unloaded")) {
            hints.removeClass("unloaded");
          }
          resultWrapper.addClass("unloaded");
<<<<<<< HEAD
          btnClear.removeClass("visable");
          main.removeClass("hidden");

          input.val("");
          visable = false;

          scrollBlocker.release();
        }
      },
      isVisable() {
        return visable;
=======
          btnClear.removeClass("visible");
          main.removeClass("unloaded");

          // now the release method must be called after $(#main) display
          scrollBlocker.release();

          input.val("");
          visible = false;
        }
      },
      isVisible() {
        return visible;
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
      }
    };

  }());


  function isMobileView() {
    return btnCancel.hasClass("loaded");
  }

  btnSearchTrigger.click(function() {
    mobileSearchBar.on();
    resultSwitch.on();
    input.focus();
  });

  btnCancel.click(function() {
    mobileSearchBar.off();
    resultSwitch.off();
  });

  input.focus(function() {
    searchWrapper.addClass("input-focus");
  });

  input.focusout(function() {
    searchWrapper.removeClass("input-focus");
  });

  input.on("keyup", function(e) {
    if (e.keyCode === 8 && input.val() === "") {
      if (!isMobileView()) {
        resultSwitch.off();
      } else {
        hints.removeClass("unloaded");
      }
    } else {
      if (input.val() !== "") {
        resultSwitch.on();

        if (!btnClear.hasClass("visible")) {
<<<<<<< HEAD
          btnClear.addClass("visable");
=======
          btnClear.addClass("visible");
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
        }

        if (isMobileView()) {
          hints.addClass("unloaded");
        }
      }
    }
  });

  btnClear.on("click", function() {
    input.val("");
    if (isMobileView()) {
      hints.removeClass("unloaded");
      results.empty();
    } else {
      resultSwitch.off();
    }
    input.focus();
<<<<<<< HEAD
    btnClear.removeClass("visable");
=======
    btnClear.removeClass("visible");
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
  });

});
