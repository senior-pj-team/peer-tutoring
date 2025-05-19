import { SupabaseClient } from "@supabase/supabase-js";

export const getDateWithTime = (date: Date, time: string): Date => {
		const [hours, minutes] = time.split(":").map(Number);
		const dateTime = new Date(date);
		dateTime.setHours(hours, minutes, 0, 0);
		return dateTime;
};

export const uploadImage = async (image: File, supabase: SupabaseClient): Promise<string | null> => {
		const fileExt = image.name.split(".").pop();
		const filePath = `${Date.now()}.${fileExt}`;

		const { error } = await supabase.storage
			.from("session-images")
			.upload(filePath, image);

		if (error) {
			console.error("Upload error:", error.message);
			return null;
		}

		const { data } = supabase.storage
			.from("session-images")
			.getPublicUrl(filePath);

		return data?.publicUrl ?? null;
};