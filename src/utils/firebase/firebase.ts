import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyDj9lznEgSWzCthq5oh_NmabCv0JLUcAZc",
	authDomain: "peer-tutoring-ab9a2.firebaseapp.com",
	projectId: "peer-tutoring-ab9a2",
	storageBucket: "peer-tutoring-ab9a2.firebasestorage.app",
	messagingSenderId: "407932221734",
	appId: "1:407932221734:web:9084b67c81adbb9443a9e7",
	measurementId: "G-TVJZ9GZG93",
};

export const app =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const messaging = async () => {
	const supported = await isSupported();
	return supported ? getMessaging(app) : null;
};

export const getFcmToken = async (): Promise<string | null> => {
	try {
		const fcmMessaging = await messaging();

		if (fcmMessaging) {
			const token = await getToken(fcmMessaging, {
				vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY!,
			});
			return token;
		}
		return null;
	} catch (err) {
		console.log("getFcmRToken function error: ", err);
		return null;
	}
};
