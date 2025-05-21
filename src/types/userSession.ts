export type UserSession = {
	email: string;
	full_name: string;
	profile_url: string;
	user_role: string;
	user_id: string
};

export type MyJwtPayload = {
  email: string;
  app_user_id: string;
  user_metadata: {
    full_name: string;
  };
  profile_image: string;
  user_role: string;
  [key: string]: any;
};