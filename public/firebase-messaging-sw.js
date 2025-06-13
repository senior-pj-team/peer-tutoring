importScripts(
	"https://www.gstatic.com/firebasejs/11.9.0/firebase-app-compat.js",
);
importScripts(
	"https://www.gstatic.com/firebasejs/11.9.0/firebase-messaging-compat.js",
);
const firebaseConfig = {
	apiKey: "AIzaSyDj9lznEgSWzCthq5oh_NmabCv0JLUcAZc",
	authDomain: "peer-tutoring-ab9a2.firebaseapp.com",
	projectId: "peer-tutoring-ab9a2",
	storageBucket: "peer-tutoring-ab9a2.firebasestorage.app",
	messagingSenderId: "407932221734",
	appId: "1:407932221734:web:9084b67c81adbb9443a9e7",
	measurementId: "G-TVJZ9GZG93",
};
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => clients.claim());
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	const link = payload.fcmOptions?.link || payload.data?.link;
	console.log(link);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		data: { url: link },
		vibrate: [100, 50, 100],
	};
	self.registration.showNotification(notificationTitle, notificationOptions);
});
