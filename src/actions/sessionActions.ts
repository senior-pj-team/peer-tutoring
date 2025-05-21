'use server'

import { getDateWithTime } from "@/utils/sessionsUtils";
import { SessionSchemaT } from "@/schema/sessionSchema";
import { deleteImage, insertSession, updateSession, uploadImage } from "@/data/sessions";

import { UserSession } from "@/types/userSession";
import { getUserSession } from "@/utils/getUserSession";

import { ResponseType } from "@/types/responseType";


export const createSession = async (values: SessionSchemaT): Promise<ResponseType<any>> => {

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
    return {
        success: false,
        error: { message: "User access denied" },
      };
  }

  const tutor_id= user.user_id;

  let uploadedUrl: string | null = null;
  if (values.image) {
    uploadedUrl = await uploadImage(values.image);
    if (!uploadedUrl) {
      return {
        success: false,
        error: { message: "Failed to upload image" },
      };
    }
  }

  const { data, error } = await insertSession(
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
}

export const editSession = async (
  sessionId: string,
  values: SessionSchemaT,
  imageString: string,
  previewUrl: string | null
): Promise<ResponseType<any>> => {
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
  let isDelete

  let uploadedUrl: string | null =  null;
  if (values.image) {

    uploadedUrl = await uploadImage(values.image);
    if (!uploadedUrl) {
      return {
        success: false,
        error: { message: "Failed to upload image" },
      };
    }
    isDelete = await deleteImage(imageString)
  }else{
    if(!previewUrl){
        isDelete = await deleteImage(imageString);
    }
  }
  

  const { data, error } = await updateSession(
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
