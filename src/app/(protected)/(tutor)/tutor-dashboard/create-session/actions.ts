'use server'

import { getDateWithTime, uploadImage } from "@/utils/sessionsUtils";
import { SessionSchemaT } from "@/schema/sessionSchema";
import { createClient } from "@/utils/supabase/server";
import { insertSession, updateSession } from "@/data/sessionsRepo";
import { UserSession } from "@/types/userSession";
import { getUserSession } from "@/utils/getUserSession";

type ResponseType<T> = 
    { success: true; data: T }
    | 
    { success: false; error: { message: string } };

export const createSession = async (values: SessionSchemaT): Promise<ResponseType<any>> => {
  const supabase = await createClient();
  const start = getDateWithTime(values.date, values.startTime);
  const end = getDateWithTime(values.date, values.endTime);

  const user: UserSession | null= await getUserSession();
  
  if(!user){
     return {
        success: false,
        error: { message: "User not found" },
      };
  }
  if(user.user_role != "tutor"){
    console.log(user.user_role);
    return {
        success: false,
        error: { message: "User not authorized" },
      };
  }
  const tutor_id= user.user_id;
  

  let uploadedUrl: string | null = null;
  if (values.image) {
    uploadedUrl = await uploadImage(values.image, supabase);
    if (!uploadedUrl) {
      return {
        success: false,
        error: { message: "Failed to upload image" },
      };
    }
  }

  const { data, error } = await insertSession(
    supabase,
    values,
    uploadedUrl,
    start,
    end,
    tutor_id
  );

  if (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }

  return {
    success: true,
    data,
  };
};

export const editSession = async (
  sessionId: string,
  values: SessionSchemaT,
): Promise<ResponseType<any>> => {
  const supabase = await createClient();
  const start = getDateWithTime(values.date, values.startTime);
  const end = getDateWithTime(values.date, values.endTime);

  const user: UserSession | null= await getUserSession();

  if (!user) {
    return {
      success: false,
      error: { message: "User not found" },
    };
  }

  if (user.user_role !== "tutor") {
    return {
      success: false,
      error: { message: "User not authorized" },
    };
  }

  const tutor_id = user.user_id;

  let uploadedUrl: string | null =  null;
  if (values.image) {
    uploadedUrl = await uploadImage(values.image, supabase);
    if (!uploadedUrl) {
      return {
        success: false,
        error: { message: "Failed to upload image" },
      };
    }
  }

  const { data, error } = await updateSession(
    supabase,
    sessionId,
    values,
    uploadedUrl,
    start,
    end,
    tutor_id
  );

  if (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }

  return {
    success: true,
    data,
  };
};
