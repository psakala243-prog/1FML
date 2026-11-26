importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:"AIzaSyAyCHCH1DqRVt_kDpAdJ9XsaNfT6xuenAs",authDomain:"fml-165ea.firebaseapp.com",databaseURL:"https://fml-165ea-default-rtdb.firebaseio.com",projectId:"fml-165ea",storageBucket:"fml-165ea.firebasestorage.app",messagingSenderId:"173373069427",appId:"1:173373069427:web:c23aed3df3fe881819f206"});
var messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload){
  var title = (payload.notification && payload.notification.title) || '📞 1FML Call';
  var body = (payload.notification && payload.notification.body) || 'Someone is calling you - tap to answer';
  self.registration.showNotification(title, {body: body, icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png', vibrate: [500,300,500,300,500], tag: '1fml-call', renotify: true, requireInteraction: true, data: payload.data || {}});
});
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  event.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
    if(list.length) return list[0].focus();
    return clients.openWindow('./');
  }));
});
self.addEventListener('push', function(event){
  var data = {};
  try{ data = event.data.json(); }catch(e){}
  var title = (data.notification && data.notification.title) || '📞 1FML Call';
  var body = (data.notification && data.notification.body) || 'Tap to answer';
  event.waitUntil(self.registration.showNotification(title, {body: body, icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png', vibrate: [500,300,500], tag: '1fml-call', requireInteraction: true}));
});
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('fetch',function(e){});
