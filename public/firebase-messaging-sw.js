importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = { apiKey: "AIzaSyAeMjhs5xIeC1FN3wnrGgOZbCdbAtqwI2w",
authDomain: "daylogics-1682571798560.firebaseapp.com",
projectId: "daylogics-1682571798560",
storageBucket: "daylogics-1682571798560.appspot.com",
messagingSenderId: "361450632061",
appId: "1:361450632061:web:3f14869d476259e3159214",
measurementId: "G-HZ19K1MD4K"};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
