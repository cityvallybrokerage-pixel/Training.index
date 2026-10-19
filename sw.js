var C="tlog-v1",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!="GET")return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(m){
var f=fetch(r).then(function(n){if(n&&(n.ok||n.type=="opaque")){var cl=n.clone();caches.open(C).then(function(c){c.put(r,cl)})}return n}).catch(function(){return m||caches.match("index.html")});
return m||f}))});
