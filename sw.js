---
layout: compress
<<<<<<< HEAD

# Chirpy v2.2
# https://github.com/cotes2020/jekyll-theme-chirpy
# © 2020 Cotes Chung
# MIT Licensed
=======
# PWA service worker
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
---

self.importScripts('{{ "/assets/js/data/cache-list.js" | relative_url }}');

var cacheName = 'chirpy-{{ "now" | date: "%Y%m%d.%H%M" }}';

<<<<<<< HEAD

function isExcluded(url) {
  for (const rule of exclude) {
    if (url.indexOf(rule) != -1) {
=======
function isExcluded(url) {
  const regex = /(^http(s)?|^\/)/; /* the regex for CORS url or relative url */
  for (const rule of exclude) {
    if (!regex.test(url) ||
      url.indexOf(rule) != -1) {
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
      return true;
    }
  }
  return false;
}

<<<<<<< HEAD

=======
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(include);
    })
  );
});

<<<<<<< HEAD

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      /* console.log('[Service Worker] Fetching resource: ' + e.request.url); */
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          if (!isExcluded(e.request.url)) {
            /* console.log('[Service Worker] Caching new resource: ' + e.request.url); */
            cache.put(e.request, response.clone());
          }
          return response;
        });
=======
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      /* console.log(`[sw] method: ${e.request.method}, fetching: ${e.request.url}`); */
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          if (!isExcluded(e.request.url)) {
            if (e.request.method === "GET") {
              /* console.log('[sw] Caching new resource: ' + e.request.url); */
              cache.put(e.request, response.clone());
            }
          }
          return response;
        });

>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
      });
    })
  );
});

<<<<<<< HEAD

=======
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});
