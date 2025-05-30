export const deleteImage = async (imageUrl: string, supabase: TSupabaseClient): Promise<boolean> => {
    if (!imageUrl) return false;

    try {
        const urlParts = imageUrl.split("/");
        const fileName = urlParts[urlParts.length - 1];

        console.log("to delete: ", fileName);

        const { error } = await supabase.storage
            .from("session-images")
            .remove([fileName]);

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