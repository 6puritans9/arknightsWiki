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
          can_overlap: boolean | null
          description: string
          effects: string[]
          facility: string
          id: number
          name: string
          obtain_at_30: string[] | null
          obtain_at_e1: string[] | null
          obtain_at_e2: string[] | null
          owners: string[]
          pathname: string
          related_effects: string[] | null
          related_facilities: string[] | null
          related_faction: string | null
          related_ops: string[] | null
          related_race: string | null
          replace_skill: string | null
        }
        Insert: {
          can_overlap?: boolean | null
          description: string
          effects: string[]
          facility: string
          id?: never
          name: string
          obtain_at_30?: string[] | null
          obtain_at_e1?: string[] | null
          obtain_at_e2?: string[] | null
          owners: string[]
          pathname: string
          related_effects?: string[] | null
          related_facilities?: string[] | null
          related_faction?: string | null
          related_ops?: string[] | null
          related_race?: string | null
          replace_skill?: string | null
        }
        Update: {
          can_overlap?: boolean | null
          description?: string
          effects?: string[]
          facility?: string
          id?: never
          name?: string
          obtain_at_30?: string[] | null
          obtain_at_e1?: string[] | null
          obtain_at_e2?: string[] | null
          owners?: string[]
          pathname?: string
          related_effects?: string[] | null
          related_facilities?: string[] | null
          related_faction?: string | null
          related_ops?: string[] | null
          related_race?: string | null
          replace_skill?: string | null
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
      operators: {
        Row: {
          alter_op: string | null
          branch: string
          class: string
          code: number
          created_at: string
          faction: string | null
          gender: string
          has_alter: boolean
          has_promotion: boolean | null
          id: number
          is_cn: boolean | null
          name: string
          nickname: string | null
          obtain: string[]
          pathname: string
          position: string
          promotion_op: string[] | null
          races: string[] | null
          rarity: number
          sub_factions: string[] | null
          updated_at: string | null
        }
        Insert: {
          alter_op?: string | null
          branch: string
          class: string
          code: number
          created_at?: string
          faction?: string | null
          gender: string
          has_alter?: boolean
          has_promotion?: boolean | null
          id?: number
          is_cn?: boolean | null
          name: string
          nickname?: string | null
          obtain: string[]
          pathname: string
          position: string
          promotion_op?: string[] | null
          races?: string[] | null
          rarity: number
          sub_factions?: string[] | null
          updated_at?: string | null
        }
        Update: {
          alter_op?: string | null
          branch?: string
          class?: string
          code?: number
          created_at?: string
          faction?: string | null
          gender?: string
          has_alter?: boolean
          has_promotion?: boolean | null
          id?: number
          is_cn?: boolean | null
          name?: string
          nickname?: string | null
          obtain?: string[]
          pathname?: string
          position?: string
          promotion_op?: string[] | null
          races?: string[] | null
          rarity?: number
          sub_factions?: string[] | null
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
