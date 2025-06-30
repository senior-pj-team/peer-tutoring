export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bank_info: {
        Row: {
          account_name: string | null
          account_number: string | null
          account_type: Database["public"]["Enums"]["bank_account_type"]
          bank_name: string | null
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          account_type?: Database["public"]["Enums"]["bank_account_type"]
          bank_name?: string | null
          created_at?: string
          id?: number
          user_id?: string
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          account_type?: Database["public"]["Enums"]["bank_account_type"]
          bank_name?: string | null
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "bank_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["tutor_id"]
          },
          {
            foreignKeyName: "bank_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      chat: {
        Row: {
          created_at: string | null
          id: string
          one_to_one_key: string | null
          session_id: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          one_to_one_key?: string | null
          session_id?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          one_to_one_key?: string | null
          session_id?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_tutor_mat_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "chat_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      fcm_token: {
        Row: {
          created_at: string
          fcm_token: string | null
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          fcm_token?: string | null
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          fcm_token?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fcm_token_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "fcm_token_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["tutor_id"]
          },
          {
            foreignKeyName: "fcm_token_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      message: {
        Row: {
          chat_id: string | null
          id: string
          isRead: boolean | null
          message: string
          sender_id: string | null
          sent_at: string | null
        }
        Insert: {
          chat_id?: string | null
          id?: string
          isRead?: boolean | null
          message: string
          sender_id?: string | null
          sent_at?: string | null
        }
        Update: {
          chat_id?: string | null
          id?: string
          isRead?: boolean | null
          message?: string
          sender_id?: string | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "message_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["tutor_id"]
          },
          {
            foreignKeyName: "message_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      notification: {
        Row: {
          body: string | null
          created_at: string
          id: number
          status: Database["public"]["Enums"]["notification_status"]
          title: string | null
          type: Database["public"]["Enums"]["notification_type"] | null
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: number
          status?: Database["public"]["Enums"]["notification_status"]
          title?: string | null
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: number
          status?: Database["public"]["Enums"]["notification_status"]
          title?: string | null
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["tutor_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      rating_and_review: {
        Row: {
          created_at: string
          id: number
          rating: number | null
          review: string | null
          ss_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          rating?: number | null
          review?: string | null
          ss_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          rating?: number | null
          review?: string | null
          ss_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rating_and_review_ss_id_fkey"
            columns: ["ss_id"]
            isOneToOne: false
            referencedRelation: "student_session"
            referencedColumns: ["id"]
          },
        ]
      }
      refund_report: {
        Row: {
          created_at: string
          description: string | null
          id: number
          processed_at: string | null
          reason: string | null
          receipt: string | null
          ss_id: number
          status: Database["public"]["Enums"]["refund_status"] | null
          type: Database["public"]["Enums"]["refund_type"] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          processed_at?: string | null
          reason?: string | null
          receipt?: string | null
          ss_id: number
          status?: Database["public"]["Enums"]["refund_status"] | null
          type?: Database["public"]["Enums"]["refund_type"] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          processed_at?: string | null
          reason?: string | null
          receipt?: string | null
          ss_id?: number
          status?: Database["public"]["Enums"]["refund_status"] | null
          type?: Database["public"]["Enums"]["refund_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "refund_report_ss_id_fkey"
            columns: ["ss_id"]
            isOneToOne: false
            referencedRelation: "student_session"
            referencedColumns: ["id"]
          },
        ]
      }
      session_category: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          category_id: number
          course_code: string | null
          course_name: string | null
          created_at: string
          description: string
          end_time: string
          held_until: string | null
          id: number
          image: string | null
          location: string
          major: string | null
          max_students: number
          paid_out_at: string | null
          payment_evidence: string | null
          price: number
          refunded_amount: number | null
          requirement: string | null
          school: string | null
          service_fee: number | null
          session_name: string
          start_time: string
          status: Database["public"]["Enums"]["session_status"]
          transferred_amount: number | null
          tutor_id: string
        }
        Insert: {
          category_id: number
          course_code?: string | null
          course_name?: string | null
          created_at?: string
          description: string
          end_time: string
          held_until?: string | null
          id?: number
          image?: string | null
          location: string
          major?: string | null
          max_students: number
          paid_out_at?: string | null
          payment_evidence?: string | null
          price: number
          refunded_amount?: number | null
          requirement?: string | null
          school?: string | null
          service_fee?: number | null
          session_name: string
          start_time: string
          status?: Database["public"]["Enums"]["session_status"]
          transferred_amount?: number | null
          tutor_id: string
        }
        Update: {
          category_id?: number
          course_code?: string | null
          course_name?: string | null
          created_at?: string
          description?: string
          end_time?: string
          held_until?: string | null
          id?: number
          image?: string | null
          location?: string
          major?: string | null
          max_students?: number
          paid_out_at?: string | null
          payment_evidence?: string | null
          price?: number
          refunded_amount?: number | null
          requirement?: string | null
          school?: string | null
          service_fee?: number | null
          session_name?: string
          start_time?: string
          status?: Database["public"]["Enums"]["session_status"]
          transferred_amount?: number | null
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "session_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["tutor_id"]
          },
          {
            foreignKeyName: "sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      student_session: {
        Row: {
          amount_from_stripe: number | null
          amount_from_student: number | null
          amount_to_tutor: number | null
          created_at: string
          id: number
          refunded_amount: number | null
          service_fees: number | null
          session_id: number
          status: Database["public"]["Enums"]["student_session_status"]
          stripe_client_secrete: string | null
          stripe_payment_intent_id: string | null
          student_id: string
        }
        Insert: {
          amount_from_stripe?: number | null
          amount_from_student?: number | null
          amount_to_tutor?: number | null
          created_at?: string
          id?: number
          refunded_amount?: number | null
          service_fees?: number | null
          session_id: number
          status: Database["public"]["Enums"]["student_session_status"]
          stripe_client_secrete?: string | null
          stripe_payment_intent_id?: string | null
          student_id: string
        }
        Update: {
          amount_from_stripe?: number | null
          amount_from_student?: number | null
          amount_to_tutor?: number | null
          created_at?: string
          id?: number
          refunded_amount?: number | null
          service_fees?: number | null
          session_id?: number
          status?: Database["public"]["Enums"]["student_session_status"]
          stripe_client_secrete?: string | null
          stripe_payment_intent_id?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_session_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_tutor_mat_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "student_session_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_session_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "student_session_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "rating_and_review_view"
            referencedColumns: ["tutor_id"]
          },
          {
            foreignKeyName: "student_session_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          auth_user_id: string | null
          bio_highlight: string | null
          biography: string | null
          created_at: string
          email: string
          id: string
          major: string | null
          phone_number: string | null
          profile_url: string | null
          registered_tutor_at: string | null
          role: Database["public"]["Enums"]["app_role"]
          school: string | null
          social_links: Json | null
          studentId_photo: string | null
          tutor_rating: number | null
          tutor_status: Database["public"]["Enums"]["tutor_status"] | null
          username: string | null
          year: string | null
        }
        Insert: {
          auth_user_id?: string | null
          bio_highlight?: string | null
          biography?: string | null
          created_at?: string
          email: string
          id?: string
          major?: string | null
          phone_number?: string | null
          profile_url?: string | null
          registered_tutor_at?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          school?: string | null
          social_links?: Json | null
          studentId_photo?: string | null
          tutor_rating?: number | null
          tutor_status?: Database["public"]["Enums"]["tutor_status"] | null
          username?: string | null
          year?: string | null
        }
        Update: {
          auth_user_id?: string | null
          bio_highlight?: string | null
          biography?: string | null
          created_at?: string
          email?: string
          id?: string
          major?: string | null
          phone_number?: string | null
          profile_url?: string | null
          registered_tutor_at?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          school?: string | null
          social_links?: Json | null
          studentId_photo?: string | null
          tutor_rating?: number | null
          tutor_status?: Database["public"]["Enums"]["tutor_status"] | null
          username?: string | null
          year?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      rating_and_review_view: {
        Row: {
          created_ago: number | null
          created_at: string | null
          rar_id: number | null
          rating: number | null
          review: string | null
          search_vector: unknown | null
          session_id: number | null
          session_name: string | null
          ss_id: number | null
          student_id: string | null
          student_image: string | null
          student_name: string | null
          tutor_id: string | null
          tutor_image: string | null
          tutor_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rating_and_review_ss_id_fkey"
            columns: ["ss_id"]
            isOneToOne: false
            referencedRelation: "student_session"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_session_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_tutor_mat_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "student_session_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_tutor_mat_view: {
        Row: {
          course_code: string | null
          course_name: string | null
          description: string | null
          document: unknown | null
          end_time: string | null
          held_until: string | null
          image: string | null
          location: string | null
          major: string | null
          max_students: number | null
          price: number | null
          requirement: string | null
          school: string | null
          service_fee: number | null
          session_category: string | null
          session_id: number | null
          session_name: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["session_status"] | null
          tutor: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      get_amount_summaries: {
        Args: {
          p_session_id?: number
          p_start_date?: string
          p_end_date?: string
          p_last_days?: number
        }
        Returns: {
          sum_earned: number
          sum_refunded: number
          sum_holding_amount_to_tutor: number
        }[]
      }
      get_chat_list: {
        Args: { user_id: string }
        Returns: {
          chat_uuid: string
          chat_name: string
          chat_profile_url: string
          last_message: string
          last_sent_at: string
        }[]
      }
      get_monthly_tutor_amounts_paid: {
        Args: { p_tutor_id: string }
        Returns: {
          month: string
          total: number
        }[]
      }
      get_or_create_chat: {
        Args: { user1_id: string; user2_id: string }
        Returns: string
      }
      get_other_participant: {
        Args: { p_chat_id: string; p_user_id: string }
        Returns: {
          auth_user_id: string | null
          bio_highlight: string | null
          biography: string | null
          created_at: string
          email: string
          id: string
          major: string | null
          phone_number: string | null
          profile_url: string | null
          registered_tutor_at: string | null
          role: Database["public"]["Enums"]["app_role"]
          school: string | null
          social_links: Json | null
          studentId_photo: string | null
          tutor_rating: number | null
          tutor_status: Database["public"]["Enums"]["tutor_status"] | null
          username: string | null
          year: string | null
        }
      }
      get_rating_stats: {
        Args: { tid: string }
        Returns: {
          rating: number
          count: number
        }[]
      }
      get_tutor_session_stats: {
        Args: { p_tutor_id: string }
        Returns: {
          upcoming_sessions: number
          completed_sessions: number
          archived_sessions: number
          all_sessions: number
          enrollments_for_upcoming_sessions: number
          churned_for_upcoming_sessions: number
          enrollments_for_completed_sessions: number
          churned_for_completed_sessions: number
          enrollments_for_archived_sessions: number
          churned_for_archived_sessions: number
          enrollments_for_all_sessions: number
          churned_for_all_sessions: number
        }[]
      }
      get_tutors_with_stats: {
        Args: { p_filter_tutor_id?: string; p_min_rating?: number }
        Returns: {
          tutor_id: string
          profile_url: string
          username: string
          email: string
          tutor_rating: number
          school: string
          major: string
          year: string
          registered_tutor_at: string
          bio_highlight: string
          social_links: Json
          biography: string
          phone_number: string
          bank_name: string
          account_name: string
          account_number: string
          account_type: Database["public"]["Enums"]["bank_account_type"]
          total_session_count: number
          total_student_count: number
          total_review_count: number
        }[]
      }
      get_unread_message_count: {
        Args: { p_user_id: string }
        Returns: number
      }
      pgmq_dequeue: {
        Args: { queue_name: string }
        Returns: Json
      }
      pgmq_enqueue: {
        Args: { queue_name: string; message: Json; delay_seconds?: number }
        Returns: undefined
      }
      process_expire_payment_jobs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      process_refresh_mat_view_jobs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      select_session_tutor_mat_view: {
        Args: {
          search_text?: string
          tutor_id?: string
          tutor_rating?: number
          categories?: string[]
          free_only?: boolean
          paid_only?: boolean
          min_price?: number
          max_price?: number
          s_status?: string[]
          p_start_today?: boolean
          limit_count?: number
          offset_count?: number
        }
        Returns: Database["public"]["CompositeTypes"]["session_tutor_mat_view_result"]
      }
      sum_tutor_amounts_by_status: {
        Args: { p_session_id?: number; p_tutor_id?: string }
        Returns: {
          holding: number
          refunded: number
          paid: number
        }[]
      }
      update_session_status: {
        Args: { session_id: number; new_status: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "student" | "tutor" | "admin"
      bank_account_type: "student_refund" | "tutor_transfer" | "refund_transfer"
      notification_status: "new" | "read"
      notification_type:
        | "student"
        | "tutor"
        | "tutor_reminder"
        | "tutor_warning"
        | "chat"
      refund_status: "pending" | "approved" | "rejected"
      refund_type: "refund" | "report" | "refund and report"
      session_status: "open" | "closed" | "completed" | "archived" | "cancelled"
      student_session_status:
        | "pending_enroll"
        | "enrolled"
        | "pending_payment"
        | "expired_payment"
        | "failed_payment"
        | "pending_refund"
        | "refunded"
        | "completed"
        | "paid"
      tutor_status: "pending" | "verified" | "rejected" | "suspended"
    }
    CompositeTypes: {
      session_tutor_mat_view_result: {
        rows: unknown[] | null
        total: number | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "tutor", "admin"],
      bank_account_type: [
        "student_refund",
        "tutor_transfer",
        "refund_transfer",
      ],
      notification_status: ["new", "read"],
      notification_type: [
        "student",
        "tutor",
        "tutor_reminder",
        "tutor_warning",
        "chat",
      ],
      refund_status: ["pending", "approved", "rejected"],
      refund_type: ["refund", "report", "refund and report"],
      session_status: ["open", "closed", "completed", "archived", "cancelled"],
      student_session_status: [
        "pending_enroll",
        "enrolled",
        "pending_payment",
        "expired_payment",
        "failed_payment",
        "pending_refund",
        "refunded",
        "completed",
        "paid",
      ],
      tutor_status: ["pending", "verified", "rejected", "suspended"],
    },
  },
} as const
