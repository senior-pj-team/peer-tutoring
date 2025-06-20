export const uploadImage = async (
	image: File,
	supabase: TSupabaseClient,
): Promise<string | null> => {
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

	return data.publicUrl ?? null;
};
