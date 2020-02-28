//  service worker 
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log("Service Worker work!");
  }).catch((e) => {
    console.log("Service Worker work failed \n", e);
  });
}