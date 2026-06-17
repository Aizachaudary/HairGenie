export type HairType = "straight" | "wavy" | "curly" | "coily";
export type HairCondition = "dry" | "oily" | "normal" | "damaged";
export type ScalpCondition = "dandruff" | "itchy" | "healthy";
export type HairConcern = "hair_fall" | "frizz" | "thinning" | "split_ends";
export type SleepQuality = "poor" | "fair" | "good" | "excellent";
export type StressLevel = "low" | "moderate" | "high" | "severe";
export type WaterType = "hard" | "soft";
export type PhotoType = "before" | "after" | "progress";

// These are `type` aliases (not `interface`s) on purpose: TypeScript only
// grants object type aliases an implicit string index signature, which the
// Supabase client's `Record<string, unknown>` table-row constraint relies on.
// An `interface` here would make every query resolve to `never`.
export type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  hair_type: HairType | null;
  hair_condition: HairCondition | null;
  scalp_condition: ScalpCondition | null;
  concerns: HairConcern[];
  sleep_quality: SleepQuality | null;
  stress_level: StressLevel | null;
  location: string | null;
  water_type: WaterType | null;
  onboarding_completed: boolean;
  reminders_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type Routine = {
  id: string;
  user_id: string;
  day_of_week: number; // 0 = Monday ... 6 = Sunday
  task: string;
  completed: boolean;
  week_start_date: string;
  created_at: string;
};

export type ProgressLog = {
  id: string;
  user_id: string;
  hair_fall_level: number;
  frizz_level: number;
  logged_at: string;
};

export type HairPhoto = {
  id: string;
  user_id: string;
  image_url: string;
  photo_type: PhotoType;
  notes: string | null;
  taken_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Omit<Profile, "id" | "created_at" | "updated_at">> & {
          user_id: string;
        };
        Update: Partial<Omit<Profile, "id" | "user_id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      routines: {
        Row: Routine;
        Insert: Partial<Omit<Routine, "id" | "created_at">> & {
          user_id: string;
          day_of_week: number;
          task: string;
          week_start_date: string;
        };
        Update: Partial<Omit<Routine, "id" | "user_id" | "created_at">>;
        Relationships: [];
      };
      progress_logs: {
        Row: ProgressLog;
        Insert: Partial<Omit<ProgressLog, "id">> & {
          user_id: string;
          hair_fall_level: number;
          frizz_level: number;
        };
        Update: Partial<Omit<ProgressLog, "id" | "user_id">>;
        Relationships: [];
      };
      hair_photos: {
        Row: HairPhoto;
        Insert: Partial<Omit<HairPhoto, "id">> & {
          user_id: string;
          image_url: string;
          photo_type: PhotoType;
        };
        Update: Partial<Omit<HairPhoto, "id" | "user_id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
