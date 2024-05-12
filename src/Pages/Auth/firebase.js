import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = { apiKey: "AIzaSyAeMjhs5xIeC1FN3wnrGgOZbCdbAtqwI2w",
authDomain: "daylogics-1682571798560.firebaseapp.com",
projectId: "daylogics-1682571798560",
storageBucket: "daylogics-1682571798560.appspot.com",
messagingSenderId: "361450632061",
appId: "1:361450632061:web:3f14869d476259e3159214",
measurementId: "G-HZ19K1MD4K"};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
