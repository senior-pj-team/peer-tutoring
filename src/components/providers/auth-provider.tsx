"use client";
"use client";

import { useSupabase } from "@/hooks/use-supabase";
import { jwtDecode } from "jwt-decode";
import {
	ReactNode,
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
} from "react";

type AuthContextType = {
	user: UserSession | null;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const supabase = useSupabase();
	const [user, setUser] = useState<UserSession | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(() => {
			supabase.auth.onAuthStateChange(async (event, session) => {
				if (session) {
					const jwt = jwtDecode<MyJwtPayload>(session.access_token);
					setUser({
						user_id: jwt.app_user_id,
						email: jwt.email,
						full_name: jwt.user_metadata.full_name,
						profile_url: jwt.profile_image,
						user_role: jwt.user_role,
					});
				}
				setLoading(false);
			});
		})();
		const {
			data: { subscription: authListener },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (session) {
				const jwt = jwtDecode<MyJwtPayload>(session.access_token);
				setUser({
					user_id: jwt.app_user_id,
					email: jwt.email,
					full_name: jwt.user_metadata.full_name,
					profile_url: jwt.profile_image,
					user_role: jwt.user_role,
				});
			}
			setLoading(false);
		});
		return () => authListener.unsubscribe();
	}, []);
	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("useAuth must be used inside an <AuthProvider>");
	return context;
}
