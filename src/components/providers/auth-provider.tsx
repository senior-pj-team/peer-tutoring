"use client";

import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import {
	ReactNode,
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
} from "react";

import { UserSession, MyJwtPayload } from "@/types/userSession";

type AuthContextType = {
	user: UserSession | null;
	setUser: React.Dispatch<React.SetStateAction<UserSession | null>>;
	loading: boolean;
	supabase: SupabaseClient;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

	const supabase = useMemo(() => createClient(), []);
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
	}, []);
	return (
		<AuthContext.Provider value={{ user, setUser, loading, supabase }}>
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

