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
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      portfolio_lessons: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string
          title: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          title: string
          video_url?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          title?: string
          video_url?: string
        }
        Relationships: []
      }
      portfolio_registrations: {
        Row: {
          created_at: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_registrations_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "portfolio_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      travel_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      travel_items: {
        Row: {
          category_id: string
          country: string
          created_at: string
          description: string
          id: string
          image_url: string
          location: string
          price: number
          title: string
        }
        Insert: {
          category_id: string
          country?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          location?: string
          price?: number
          title: string
        }
        Update: {
          category_id?: string
          country?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          location?: string
          price?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "travel_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      travel_bookings: {
        Row: {
          created_at: string
          date_from: string
          date_to: string
          id: string
          status: string
          travel_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_from: string
          date_to: string
          id?: string
          status?: string
          travel_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_from?: string
          date_to?: string
          id?: string
          status?: string
          travel_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_bookings_travel_id_fkey"
            columns: ["travel_id"]
            isOneToOne: false
            referencedRelation: "travel_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travel_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      travel_banners: {
        Row: {
          created_at: string
          id: string
          image_url: string
          text: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string
          text?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          text?: string
        }
        Relationships: []
      }
      yoga_courses: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string
          price: number
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          price?: number
          title: string
          type?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          price?: number
          title?: string
          type?: string
        }
        Relationships: []
      }
      yoga_bookings: {
        Row: {
          course_id: string
          created_at: string
          id: string
          schedule: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          schedule: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          schedule?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "yoga_bookings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "yoga_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yoga_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
