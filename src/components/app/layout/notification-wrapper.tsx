"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { upsertFcmToken } from "@/data/mutations/fcm-token/upsert-fcm-token";
import { getFcmToken, messaging } from "@/utils/firebase/firebase";
import { useEffect, useRef, useState } from "react";
import { useSupabase } from "../../../hooks/use-supabase";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EyeIcon } from "lucide-react";

async function getNotificationPermissionAndToken() {
	if (!("Notification" in window)) {
		console.info("This browser does not support desktop notification");
		return null;
	}

	if (Notification.permission === "granted") {
		return await getFcmToken();
	}

	if (Notification.permission !== "denied") {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			return await getFcmToken();
		}
	}

	console.info("Notification permission is denied");
	return null;
}

export function NotificationWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useAuth();
	const retryLoadToken = useRef<number>(0);
	const isLoading = useRef<boolean>(false);
	const [token, setToken] = useState<string | null>(null);
	const supabase = useSupabase();
	const router = useRouter();

	const loadToken = async () => {
		if (isLoading.current) return;
		isLoading.current = true;
		const token = await getNotificationPermissionAndToken();
		if (Notification.permission === "denied") {
			console.info("%cNotification permission is denied");
			isLoading.current = false;
			return;
		}

		if (!token) {
			if (retryLoadToken.current >= 3) {
				alert(
					"Unable to configure for pushing notification. Please refresh the page",
				);
				console.info(
					"Unable to load token for pushing notification after 3 retries",
				);
				isLoading.current = false;
				return;
			}
			retryLoadToken.current += 1;
			console.info(
				"Unable to load token for pushing notification. Retrying loading token",
			);
			isLoading.current = false;
			await loadToken();
			return;
		}
		return token;
	};

	useEffect(() => {
		if (!user) {
			return;
		}
		const insertFCMTokenToUser = async () => {
			const fcmToken = await loadToken();
			if (!fcmToken || !user?.user_id) {
				return;
			}
			const upsertResult = await upsertFcmToken(supabase, {
				user_id: user.user_id,
				fcm_token: fcmToken,
			});
			if (!upsertResult) {
				alert(
					"Unable to configure for pushing notification. Please refresh the page",
				);
			}
			setToken(fcmToken);
		};
		insertFCMTokenToUser();
	}, [user, supabase]);

	useEffect(() => {
		console.log(token);
		const setupListener = async () => {
			if (!token) return;
			console.log("Foreground message registered with token: ", token);
			const message = await messaging();

			if (!message) return;

			const unsubscribe = onMessage(message, (payload) => {
				console.log("Foreground message received: ", payload);

				window.dispatchEvent(
					new CustomEvent("notification-received", { detail: payload }),
				);

				toast.info(`New notification ${payload.notification?.title}`, {
					action: {
						label: (
							<div className="flex gap-1 items-center cursor-pointer ">
								<EyeIcon size={12} />
								Check
							</div>
						),
						onClick: () => {
							router.push("/notification");
						},
					},
				});
			});
			return unsubscribe;
		};
		let unsubscribe: Unsubscribe | null = null;
		setupListener().then((unsub) => {
			if (unsub) {
				unsubscribe = unsub;
			}
		});
		return () => unsubscribe?.();
	}, [token, router, toast]);

	return <>{children}</>;
}
