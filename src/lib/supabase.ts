export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      base: {
        Row: {
          description: string
          id: number
          name: string
          obtain_at: string | null
          owners: string[]
          relations: string[] | null
        }
        Insert: {
          description: string
          id?: number
          name: string
          obtain_at?: string | null
          owners: string[]
          relations?: string[] | null
        }
        Update: {
          description?: string
          id?: number
          name?: string
          obtain_at?: string | null
          owners?: string[]
          relations?: string[] | null
        }
        Relationships: []
      }
      factions: {
        Row: {
          description_en: string | null
          id: number
          name_en: string
        }
        Insert: {
          description_en?: string | null
          id?: number
          name_en: string
        }
        Update: {
          description_en?: string | null
          id?: number
          name_en?: string
        }
        Relationships: []
      }
      operator_base: {
        Row: {
          base_id: number
          operator_id: number
        }
        Insert: {
          base_id: number
          operator_id: number
        }
        Update: {
          base_id?: number
          operator_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "operator_base_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "base"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operator_base_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      operator_factions: {
        Row: {
          faction_id: number
          operator_id: number
        }
        Insert: {
          faction_id: number
          operator_id: number
        }
        Update: {
          faction_id?: number
          operator_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "operator_factions_faction_id_fkey"
            columns: ["faction_id"]
            isOneToOne: false
            referencedRelation: "factions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operator_factions_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      operators: {
        Row: {
          base_op: string | null
          branch_en: string
          class_en: string
          code: number
          created_at: string
          gender: string
          id: number
          is_alter: boolean
          name_en: string
          obtain: string[]
          pathname: string
          position_en: string
          race_en: string[]
          rarity: number
          updated_at: string | null
        }
        Insert: {
          base_op?: string | null
          branch_en: string
          class_en: string
          code: number
          created_at?: string
          gender: string
          id?: number
          is_alter: boolean
          name_en: string
          obtain: string[]
          pathname: string
          position_en: string
          race_en: string[]
          rarity: number
          updated_at?: string | null
        }
        Update: {
          base_op?: string | null
          branch_en?: string
          class_en?: string
          code?: number
          created_at?: string
          gender?: string
          id?: number
          is_alter?: boolean
          name_en?: string
          obtain?: string[]
          pathname?: string
          position_en?: string
          race_en?: string[]
          rarity?: number
          updated_at?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
