'use server';

import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { getUserSession } from '@/utils/get-user-session';
import { tutorFormSchema, tutorFormSchemaT } from '@/schema/tutor-form-schema';
import { uploadStudentIdImage } from '@/data/mutations/user/upload-student-id-images';
import { updateUser } from '@/data/mutations/user/update-user';
import { upsertBankInfo } from '@/data/mutations/bank-info/upsert-bank-info';

export async function submitTutorRegistration(formData: tutorFormSchemaT): Promise<ActionResponseType<string>> {

    const supabase = await createClient();
    const user = await getUserSession();

    if (!user?.user_id) {
        return {
            success: false,
            error: { message: "Something went wrong" }
        }
    };

    const photoUrl = await uploadStudentIdImage(formData.studentIdPhoto, user.user_id, supabase)
    if (!photoUrl) {
        return {
            success: false,
            error: { message: "Something went wrong" }
        }
    }

    const updateResult = await updateUser(supabase, { tutorData: formData, uploadedUrl: photoUrl, user_id: user.user_id })
    console.log("updatResult: ", updateResult);
    if (!updateResult) {
        return {
            success: false,
            error: { message: "Something went wrong" }
        }
    }

    // Step 3: Save or insert bank info
    const upsertResult = await upsertBankInfo(supabase, {
            user_id: user.user_id, 
            bankData: {
                bank_name: formData.bankName,
                account_name: formData.accountName,
                account_number: formData.accountNumber,
                other_bank: ""
            }, 
            account_type: "tutor_transfer", 
            onConflict: 'account_name,account_number,user_id'
    })

    if (!upsertResult) {
        return {
            success: false,
            error: { message: "Something went wrong" }
        }
    };

    return { success: true };
}
