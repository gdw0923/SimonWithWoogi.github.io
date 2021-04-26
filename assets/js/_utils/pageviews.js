<<<<<<< HEAD
/**
 * Count pageviews form GA or local cache file.
 *
 * Dependences:
 *   - jQuery
 *   - countUp.js <https://github.com/inorganik/countUp.js>
 *
 * v2.0
 * https://github.com/cotes2020/jekyll-theme-chirpy
 * © 2018-2019 Cotes Chung
 * MIT License
 */

var getInitStatus = (function () {
  var hasInit = false;
=======
/*
 * Count page views form GA or local cache file.
 *
 * Dependencies:
 *   - jQuery
 *   - countUp.js <https://github.com/inorganik/countUp.js>
 */

const getInitStatus = (function () {
  let hasInit = false;
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
  return () => {
    let ret = hasInit;
    if (!hasInit) {
      hasInit = true;
    }
    return ret;
  };
}());

<<<<<<< HEAD

var PvCache = (function () {
  const KEY_PV = "pv";
  const KEY_CREATION = "pv_created_date";
  const KEY_PV_SRC = "pv_source";

  var Source = {
    ORIGIN: "origin",
    PROXY: "proxy"
  };
=======
const PvOpts = (function () {
  function hasContent(selector) {
    let content = $(selector).attr("content");
    return (typeof content !== "undefined" && content !== false);
  }

  return {
    getProxyEndpoint() {
      return $("meta[name=pv-proxy-endpoint]").attr("content");
    },
    getLocalData() {
      return $("meta[name=pv-cache-path]").attr("content");
    },
    hasProxyEndpoint() {
      return hasContent("meta[name=pv-proxy-endpoint]");
    },
    hasLocalData() {
      return hasContent("meta[name=pv-cache-path]");
    }
  }
}());

const PvStorage = (function () {
  const KEY_PV = "pv";
  const KEY_CREATION = "pv_created_date";
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413

  function get(key) {
    return localStorage.getItem(key);
  }

  function set(key, val) {
    localStorage.setItem(key, val);
  }

  return {
<<<<<<< HEAD
    getData() {
      return JSON.parse(localStorage.getItem(KEY_PV) );
    },
    saveOriginCache(pv) {
      set(KEY_PV, pv);
      set(KEY_PV_SRC, Source.ORIGIN );
      set(KEY_CREATION, new Date().toJSON() );
    },
    saveProxyCache(pv) {
      set(KEY_PV, pv);
      set(KEY_PV_SRC, Source.PROXY );
      set(KEY_CREATION, new Date().toJSON() );
    },
    isFromOrigin() {
      return get(KEY_PV_SRC) === Source.ORIGIN;
    },
    isFromProxy() {
      return get(KEY_PV_SRC) === Source.PROXY;
    },
    isExpired() {
      if (PvCache.isFromOrigin() ) {
        let date = new Date(get(KEY_CREATION));
        date.setDate(date.getDate() + 1); /* update origin records every day */
        return Date.now() >= date.getTime();

      } else if (PvCache.isFromProxy() ) {
        let date = new Date(get(KEY_CREATION) );
        date.setHours(date.getHours() + 1); /* update proxy records per hour */
        return Date.now() >= date.getTime();
      }
      return false;
    },
    getAllPagevies() {
      return PvCache.getData().totalsForAllResults["ga:pageviews"];
    },
    newerThan(pv) {
      return PvCache.getAllPagevies() > pv.totalsForAllResults["ga:pageviews"];
    },
    inspectKeys() {
      if (localStorage.getItem(KEY_PV) === null
        || localStorage.getItem(KEY_PV_SRC) === null
        || localStorage.getItem(KEY_CREATION) === null) {
        localStorage.clear();
      }
    }
  };

}()); /* PvCache */

function countUp(min, max, destId) {
  if (min < max) {
    var numAnim = new CountUp(destId, min, max);
=======
    hasCache() {
      return (localStorage.getItem(KEY_PV) !== null);
    },
    getCache() {
      // get data from browser cache
      return JSON.parse(localStorage.getItem(KEY_PV));
    },
    saveCache(pv) {
      set(KEY_PV, pv);
      set(KEY_CREATION, new Date().toJSON());
    },
    isExpired() {
      let date = new Date(get(KEY_CREATION));
      date.setHours(date.getHours() + 1); // per hour
      return Date.now() >= date.getTime();
    },
    getAllPageviews() {
      return PvStorage.getCache().totalsForAllResults["ga:pageviews"];
    },
    newerThan(pv) {
      return PvStorage.getAllPageviews() > pv.totalsForAllResults["ga:pageviews"];
    },
    inspectKeys() {
      for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        switch (key) {
          case KEY_PV:
          case KEY_CREATION:
            break;
          default:
            localStorage.clear();
            return;
        }
      }
    }
  };
}()); /* PvStorage */

function countUp(min, max, destId) {
  if (min < max) {
    let numAnim = new CountUp(destId, min, max);
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
    if (!numAnim.error) {
      numAnim.start();
    } else {
      console.error(numAnim.error);
    }
  }
}

<<<<<<< HEAD

function countPV(path, rows) {
  var count = 0;

  if (typeof rows !== "undefined" ) {
    for (var i = 0; i < rows.length; ++i) {
      var gaPath = rows[parseInt(i, 10)][0];
=======
function countPV(path, rows) {
  let count = 0;

  if (typeof rows !== "undefined" ) {
    for (let i = 0; i < rows.length; ++i) {
      const gaPath = rows[parseInt(i, 10)][0];
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
      if (gaPath === path) { /* path format see: site.permalink */
        count += parseInt(rows[parseInt(i, 10)][1], 10);
        break;
      }
    }
  }

  return count;
}

<<<<<<< HEAD

function tacklePV(rows, path, elem, hasInit) {
  var count = countPV(path, rows);
=======
function tacklePV(rows, path, elem, hasInit) {
  let count = countPV(path, rows);
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
  count = (count === 0 ? 1 : count);

  if (!hasInit) {
    elem.text(new Intl.NumberFormat().format(count));
  } else {
<<<<<<< HEAD
    var initCount = parseInt(elem.text().replace(/,/g, ""), 10);
=======
    const initCount = parseInt(elem.text().replace(/,/g, ""), 10);
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
    if (count > initCount) {
      countUp(initCount, count, elem.attr("id"));
    }
  }
}

<<<<<<< HEAD

=======
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
function displayPageviews(data) {
  if (typeof data === "undefined") {
    return;
  }

<<<<<<< HEAD
  var hasInit = getInitStatus();
  var rows = data.rows; /* could be undefined */

  if ($("#post-list").length > 0) { /* the Home page */
    $(".post-preview").each(function() {
      var path = $(this).children("div").children("h1").children("a").attr("href");
=======
  let hasInit = getInitStatus();
  const rows = data.rows; /* could be undefined */

  if ($("#post-list").length > 0) { /* the Home page */
    $(".post-preview").each(function() {
      const path = $(this).find("a").attr("href");
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
      tacklePV(rows, path, $(this).find(".pageviews"), hasInit);
    });

  } else if ($(".post").length > 0) { /* the post */
<<<<<<< HEAD
    var path = window.location.pathname;
=======
    const path = window.location.pathname;
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
    tacklePV(rows, path, $("#pv"), hasInit);
  }
}

<<<<<<< HEAD

function fetchProxyPageviews() {
  $.ajax({
    type: "GET",
    url: proxyEndpoint, /* see: /assets/js/_pv-config.js */
    dataType: "jsonp",
    jsonpCallback: "displayPageviews",
    success: (data, textStatus, jqXHR) => {
      PvCache.saveProxyCache(JSON.stringify(data));
    },
    error: (jqXHR, textStatus, errorThrown) => {
      console.log("Failed to load pageviews from proxy server: " + errorThrown);
    }
  });
}


function fetchPageviews(fetchOrigin = true, filterOrigin = false) {
  /* pvCacheEnabled › see: /assets/js/_pv-config.js */
  if (pvCacheEnabled && fetchOrigin) {
    fetch("/assets/js/data/pageviews.json")
      .then((response) => response.json())
      .then((data) => {
        if (filterOrigin) {
          if (PvCache.newerThan(data)) {
            return;
          }
        }
        displayPageviews(data);
        PvCache.saveOriginCache(JSON.stringify(data));
      })
      .then(() => fetchProxyPageviews());
=======
function fetchProxyPageviews() {
  if (PvOpts.hasProxyEndpoint()) {
    $.ajax({
      type: "GET",
      url: PvOpts.getProxyEndpoint(),
      dataType: "jsonp",
      jsonpCallback: "displayPageviews",
      success: (data, textStatus, jqXHR) => {
        PvStorage.saveCache(JSON.stringify(data));
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("Failed to load pageviews from proxy server: " + errorThrown);
      }
    });
  }
}

function loadPageviews(hasCache = false) {
  if (PvOpts.hasLocalData()) {
    fetch(PvOpts.getLocalData())
      .then((response) => response.json())
      .then((data) => {
        // The cache from the proxy will sometimes be more recent than the local one
        if (hasCache && PvStorage.newerThan(data)) {
          return;
        }
        displayPageviews(data);
        PvStorage.saveCache(JSON.stringify(data));
      })
      .then(() => {
        fetchProxyPageviews();
      });
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413

  } else {
    fetchProxyPageviews();
  }

}

<<<<<<< HEAD

$(function() {

  if ($(".pageviews").length > 0) {

    PvCache.inspectKeys();
    let cache = PvCache.getData();

    if (cache) {
      displayPageviews(cache);

      if (PvCache.isExpired()) {
        fetchPageviews(true, PvCache.isFromProxy());

      } else {

        if (PvCache.isFromOrigin()) {
          fetchPageviews(false);
        }

      }

    } else {
      fetchPageviews();
    }

  }

=======
$(function() {
  if ($(".pageviews").length <= 0) {
    return;
  }

  PvStorage.inspectKeys();

  if (PvStorage.hasCache()) {
    displayPageviews(PvStorage.getCache());
    if (!PvStorage.isExpired()) {
      return;
    }
  }

  loadPageviews(PvStorage.hasCache());

>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
});
