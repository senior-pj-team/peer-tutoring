export const deleteImage = async (
	supabase: TSupabaseClient,
	{
		imageUrl,
		path,
	}: {
		imageUrl: string;
		path: string;
	},
): Promise<boolean> => {
	if (!imageUrl) return false;

	try {
		const pathStart = imageUrl.indexOf(`${path}/`) + path.length + 1;
		const fullPath = imageUrl.slice(pathStart);
		const relPath = fullPath.split("session-images/")[1].trim();

		console.log("to delete: ", relPath);

		const { error } = await supabase.storage
			.from("session-images")
			.remove([relPath]);

		if (error) {
			console.error("Delete error:", error.message);
			return false;
		}

		return true;
	} catch (err) {
		console.error("Unexpected delete error:", err);
		return false;
	}
};
