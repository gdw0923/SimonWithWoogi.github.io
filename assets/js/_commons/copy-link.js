/*
 * Copy current page url to clipboard.
<<<<<<< HEAD
 * v2.1
 * https://github.com/cotes2020/jekyll-theme-chirpy
 * © 2020 Cotes Chung
 * MIT License
=======
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
 */

function copyLink(url) {
  if (!url || 0 === url.length) {
<<<<<<< HEAD
    return;
  }

  url = window.location.href;
  var $temp = $("<input>");

=======
    url = window.location.href;
  }

  const $temp = $("<input>");
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
  $("body").append($temp);
  $temp.val(url).select();
  document.execCommand("copy");
  $temp.remove();

  alert("Link copied successfully!");

<<<<<<< HEAD
}
=======
}
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
