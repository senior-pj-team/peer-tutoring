export type ResponseType<T> = 
    { success: true; data: T }
    | 
    { success: false; error: { message: string } };