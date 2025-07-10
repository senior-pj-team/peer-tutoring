export const uploadImage = async (
  image: File | string,
  supabase: TSupabaseClient,
  { path = "" }: { path?: string } = {}
): Promise<string | null> => {
  const timestamp = Date.now();
  let filePath = "";
  let uploadData: File | Buffer;

  // Handle base64 string
  if (typeof image === "string" && image.startsWith("data:image/")) {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
	uploadData = Buffer.from(base64Data, "base64");
    filePath = `${path}${timestamp}.jpg`;
  } 
  // Handle File object
  else if (image instanceof File) {
    const extension = image.name.split(".").pop() ?? "jpg";
    filePath = `${path}${timestamp}.${extension}`;
    uploadData = image;
  } 
  else {
    console.error("Invalid image type: must be File or base64 string");
    return null;
  }

  const { error: uploadError } = await supabase.storage
    .from("session-images")
    .upload(filePath, uploadData, {
      contentType: "image/jpeg",
    });

  if (uploadError) {
    console.error("Upload error:", uploadError.message);
    return null;
  }
  
  const { data } = supabase.storage
    .from("session-images")
    .getPublicUrl(filePath);

  return data?.publicUrl ?? null;
};
