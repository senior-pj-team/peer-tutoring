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
      rating_and_review: {
        Row: {
          created_at: string
          id: number
          rating: number | null
          review: string | null
          session_id: number | null
          student_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          rating?: number | null
          review?: string | null
          session_id?: number | null
          student_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          rating?: number | null
          review?: string | null
          session_id?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rating_and_review_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_tutor_mat_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "rating_and_review_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_and_review_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "student_session_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "rating_and_review_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "user"
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
          id: number
          image: string | null
          location: string
          major: string | null
          max_students: number
          paid_session: boolean | null
          payment_evidence: string | null
          price: number
          refunded_amount: number | null
          requirement: string | null
          school: string | null
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
          id?: number
          image?: string | null
          location: string
          major?: string | null
          max_students: number
          paid_session?: boolean | null
          payment_evidence?: string | null
          price: number
          refunded_amount?: number | null
          requirement?: string | null
          school?: string | null
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
          id?: number
          image?: string | null
          location?: string
          major?: string | null
          max_students?: number
          paid_session?: boolean | null
          payment_evidence?: string | null
          price?: number
          refunded_amount?: number | null
          requirement?: string | null
          school?: string | null
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
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      student_session: {
        Row: {
          amount_from_student: number
          amount_to_tutor: number | null
          created_at: string
          held_untill: string | null
          id: number
          refunded_amount: number | null
          service_fees: number | null
          session_id: number
          status: Database["public"]["Enums"]["student_session_status"]
          student_id: string
        }
        Insert: {
          amount_from_student: number
          amount_to_tutor?: number | null
          created_at?: string
          held_untill?: string | null
          id?: number
          refunded_amount?: number | null
          service_fees?: number | null
          session_id: number
          status: Database["public"]["Enums"]["student_session_status"]
          student_id: string
        }
        Update: {
          amount_from_student?: number
          amount_to_tutor?: number | null
          created_at?: string
          held_untill?: string | null
          id?: number
          refunded_amount?: number | null
          service_fees?: number | null
          session_id?: number
          status?: Database["public"]["Enums"]["student_session_status"]
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
            foreignKeyName: "student_session_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "student_session_view"
            referencedColumns: ["session_id"]
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
          tutor_rating?: number | null
          tutor_status?: Database["public"]["Enums"]["tutor_status"] | null
          username?: string | null
          year?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      session_tutor_mat_view: {
        Row: {
          course_code: string | null
          course_name: string | null
          description: string | null
          document: unknown | null
          end_time: string | null
          image: string | null
          major: string | null
          paid_session: boolean | null
          price: number | null
          school: string | null
          session_category: string | null
          session_id: number | null
          session_name: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["session_status"] | null
          tutor: Json | null
        }
        Relationships: []
      }
      student_session_view: {
        Row: {
          course_code: string | null
          course_name: string | null
          description: string | null
          end_time: string | null
          image: string | null
          location: string | null
          major: string | null
          max_students: number | null
          price: number | null
          refunded_amount: number | null
          requirement: string | null
          school: string | null
          session_id: number | null
          session_name: string | null
          session_status: Database["public"]["Enums"]["session_status"] | null
          ss: Json | null
          start_time: string | null
          student_id: string | null
          tutor: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "student_session_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      pgmq_dequeue: {
        Args: { queue_name: string }
        Returns: Json
      }
      pgmq_enqueue: {
        Args: { queue_name: string; message: Json; delay_seconds?: number }
        Returns: undefined
      }
      process_refresh_mat_view_jobs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      select_session_tutor_mat_view: {
        Args: {
          search_text: string
          min_price?: number
          max_price?: number
          tutor_rating?: number
          category?: string[]
          free_only?: boolean
          paid_only?: boolean
          limit_count?: number
          offset_count?: number
        }
        Returns: unknown[]
      }
      update_session_status: {
        Args: { session_id: number; new_status: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "student" | "tutor" | "admin"
      session_status: "open" | "closed" | "completed" | "archived"
      student_session_status:
        | "enrolled"
        | "pending_refund"
        | "refunded"
        | "completed"
        | "paid"
      tutor_status: "pending" | "verified" | "rejected"
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
      session_status: ["open", "closed", "completed", "archived"],
      student_session_status: [
        "enrolled",
        "pending_refund",
        "refunded",
        "completed",
        "paid",
      ],
      tutor_status: ["pending", "verified", "rejected"],
    },
  },
} as const
