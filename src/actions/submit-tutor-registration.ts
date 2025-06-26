"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { getUserSession } from "@/utils/get-user-session";
import { tutorFormSchema, tutorFormSchemaT } from "@/schema/tutor-form-schema";
import { uploadStudentIdImage } from "@/data/mutations/user/upload-student-id-images";
import { updateUser } from "@/data/mutations/user/update-user";
import { upsertBankInfo } from "@/data/mutations/bank-info/upsert-bank-info";
import { updateBankInfo } from "@/data/mutations/bank-info/update-bank-info";
import { insertBankInfo } from "@/data/mutations/bank-info/insert-bank-info";

export async function submitTutorRegistration(
  formData: tutorFormSchemaT
): Promise<ActionResponseType<string>> {
  const supabase = await createClient();
  const user = await getUserSession();

  if (!user?.user_id) {
    return {
      success: false,
      error: { message: "Something went wrong" },
    };
  }
  
  const parsed = tutorFormSchema.safeParse({
    school: formData.school,
    major: formData.major,
    year: formData.year,
    phone_number: formData.phone_number,
    type: formData.type,
    bankName: formData.bankName,
    accountName: formData.accountName,
    accountNumber: formData.accountNumber,
    studentIdPhoto: formData.studentIdPhoto,
    isChecked: formData.isChecked,
    bankId: formData.bankId
  });
  console.log(parsed.error?.message)
  if (!parsed.success) {
    return {
      success: false,
      error: { message: "Invalid input ❌" },
    };
  }
  
  const {
    school,
    major,
    year,
    phone_number,
    type,
    bankName,
    accountName,
    accountNumber,
    studentIdPhoto,
    bankId,
  } = parsed.data;

  const photoUrl = await uploadStudentIdImage(
    studentIdPhoto,
    user.user_id,
    supabase
  );
  if (!photoUrl) {
    return {
      success: false,
      error: { message: "Something went wrong" },
    };
  }

  const updateResult = await updateUser(supabase, {
    tutorData: {
      school: school,
      major: major,
      year: year,
      phone_number: phone_number,
      studentId_photo: photoUrl,
    },
    uploadedUrl: photoUrl,
    user_id: user.user_id,
  });

  if (!updateResult) {
    return {
      success: false,
      error: { message: "Something went wrong" },
    };
  }

  if (type == "refund_transfer" && bankId) {
    const updateResult = await updateBankInfo(
      supabase,
      Number(bankId),
      user.user_id,
      { account_type: type }
    );
    if(!updateResult){
      return{
        success: false,
        error: {message: "Something went wrong"}
      }
    }
  } else if (type == "tutor_transfer") {
    const insertResult = await insertBankInfo(supabase, {
      bank_name: bankName,
      account_name: accountName,
      account_number: accountNumber,
      account_type: type,
    });
    if(insertResult){
      return {
        success: false,
        error: {message: "Something went wrong"}
      }
    }
  }else{
    return {
      success: false,
      error: {message: "Something went wrong"}
    }
  }

  return { success: true };
}
