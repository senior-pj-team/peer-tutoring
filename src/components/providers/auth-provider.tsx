// src/context/AuthContext.tsx
"use client"; // ← this entire file must be a client component

import { createClient } from "@/utils/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";
import {
	ReactNode,
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
} from "react";

type AuthContextType = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	loading: boolean;
	supabase: SupabaseClient;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const supabase = useMemo(() => createClient(), []);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user ?? null);
			setLoading(false);
		})();
	}, [supabase]);

	console.log(user);
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
