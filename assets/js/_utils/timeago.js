/*
<<<<<<< HEAD
 * Caculate the Timeago
 * v2.0
 * https://github.com/cotes2020/jekyll-theme-chirpy
 * © 2019 Cotes Chung
 * MIT Licensed
=======
 * Calculate the Timeago
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
 */

$(function() {

<<<<<<< HEAD
  var toRefresh = $(".timeago").length;

  var intervalId = void 0;

  function timeago(iso, isLastmod) {
    let now = new Date();
    let past = new Date(iso);

    if (past.getFullYear() !== now.getFullYear()) {
      toRefresh -= 1;
      return past.toLocaleString("en-US", {
=======
  const timeagoElem = $(".timeago");

  let toRefresh = timeagoElem.length;

  let intervalId = void 0;

  function timeago(iso, preposition) {
    let now = new Date();
    let past = new Date(iso);
    let prep = (typeof preposition !== "undefined" ? `${preposition} ` : "");

    if (past.getFullYear() !== now.getFullYear()) {
      toRefresh -= 1;
      return prep + past.toLocaleString("en-US", {
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }

    if (past.getMonth() !== now.getMonth()) {
      toRefresh -= 1;
<<<<<<< HEAD
      return past.toLocaleString("en-US", {
=======
      return prep + past.toLocaleString("en-US", {
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
        month: "short",
        day: "numeric"
      });
    }

    let seconds = Math.floor((now - past) / 1000);

    let day = Math.floor(seconds / 86400);
    if (day >= 1) {
      toRefresh -= 1;
      return day + " day" + (day > 1 ? "s" : "") + " ago";
    }

    let hour = Math.floor(seconds / 3600);
    if (hour >= 1) {
      return hour + " hour" + (hour > 1 ? "s" : "") + " ago";
    }

    let minute = Math.floor(seconds / 60);
    if (minute >= 1) {
      return minute + " minute" + (minute > 1 ? "s" : "") + " ago";
    }

<<<<<<< HEAD
    return (isLastmod ? "just" : "Just") + " now";
=======
    return "just now";
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
  }

  function updateTimeago() {
    $(".timeago").each(function() {
      if ($(this).children("i").length > 0) {
<<<<<<< HEAD
        var basic = $(this).text();
        var isLastmod = $(this).hasClass("lastmod");
        var node = $(this).children("i");
        var date = node.text(); /* ISO Date: "YYYY-MM-DDTHH:MM:SSZ" */
        $(this).text(timeago(date, isLastmod));
=======
        let node = $(this).children("i");
        let date = node.text(); /* ISO Date: "YYYY-MM-DDTHH:MM:SSZ" */
        $(this).text(timeago(date, $(this).attr("prep")));
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
        $(this).append(node);
      }
    });

    if (toRefresh === 0 && typeof intervalId !== "undefined") {
      clearInterval(intervalId); /* stop interval */
    }
    return toRefresh;
  }

  if (toRefresh === 0) {
    return;
  }

  if (updateTimeago() > 0) { /* run immediately */
    intervalId = setInterval(updateTimeago, 60000); /* run every minute */
  }

});
