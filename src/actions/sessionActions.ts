"use server";

import { getDateWithTime, parseTimeRange } from "@/utils/sessionsUtils";
import { SessionSchemaT } from "@/schema/sessionSchema";
import {
  deleteImage,
  insertSession,
  selectSessionCardData,
  updateSession,
  uploadImage,
} from "@/data/sessions";

import { UserSession } from "@/types/userSession";
import { getUserSession } from "@/utils/getUserSession";

import { ResponseType } from "@/types/responseType";
import { Sessions } from "@/types/sessions";

export const createSession = async (
  values: SessionSchemaT
): Promise<ResponseType<any>> => {
  const start = getDateWithTime(values.date, values.startTime);
  const end = getDateWithTime(values.date, values.endTime);

  const user: UserSession | null = await getUserSession();

  if (!user) {
    return {
      success: false,
      error: { message: "User not found" },
    };
  }
  if (user.user_role != "tutor") {
    return {
      success: false,
      error: { message: "User access denied" },
    };
  }

  const tutor_id = user.user_id;

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
};

export const editSession = async (
  sessionId: string,
  values: SessionSchemaT,
  imageString: string,
  previewUrl: string | null
): Promise<ResponseType<any>> => {
  const start = getDateWithTime(values.date, values.startTime);
  const end = getDateWithTime(values.date, values.endTime);

  const user: UserSession | null = await getUserSession();

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
  let isDelete;

  let uploadedUrl: string | null = null;
  if (values.image) {
    uploadedUrl = await uploadImage(values.image);
    if (!uploadedUrl) {
      return {
        success: false,
        error: { message: "Failed to upload image" },
      };
    }
    isDelete = await deleteImage(imageString);
  } else {
    if (!previewUrl) {
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

export const getSessions = async (status: string[]) => {
  const { data: rawData, error } = await selectSessionCardData(status);

  if (error) {
    console.log(error.message);
    return {
      success: false,
      error: { message: error.message },
    };
  }
  console.log(rawData);
  

  const sessions: Sessions = rawData.map((session) => {
    const {date, start_time, end_time}= parseTimeRange(session.start_time, session.end_time)
    return {
      session_id: session.session_id as string,
      image: session.image as string,
      session_name: session.session_name as string,
      course_code: session.course_code as string,
      course_name: session.course_name as string,
      date: date as Date,
      start_time: start_time as string,
      end_time: end_time as string,
      tutor_name: session.tutor_name as string,
      tutor_rating: parseInt(session.tutor_rating) as number,
      status: session.student_session_status as string,
    };
  });

  return {
    success: true,
    data: sessions,
  };
};
