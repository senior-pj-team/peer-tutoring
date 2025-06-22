export async function uploadStudentIdImage(idPhoto: string, user_id: string, supabase: TSupabaseClient): Promise<string | null> {
    const base64Data = idPhoto.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = `student-id-photos/${user_id}-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
        .from('session-images')
        .upload(filePath, buffer, {
            contentType: 'image/jpeg',
        });

    if (uploadError) {
        console.log(uploadError);
        return null;
    };

    const { data: publicUrlData } = supabase.storage
        .from('tutor-uploads')
        .getPublicUrl(filePath);

    const photoUrl = publicUrlData.publicUrl;
    return photoUrl ?? null
}