import {
  Annoyed,
  CircleMinus,
  Droplets,
  Flame,
  Leaf,
  Scissors,
  Snowflake,
  Sparkles,
  Sun,
  TrendingDown,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type {
  HairCondition,
  HairConcern,
  HairType,
  ScalpCondition,
  SleepQuality,
  StressLevel,
  WaterType,
} from "@/types/database";

export type OptionMeta<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export type IconOptionMeta<T extends string> = OptionMeta<T> & {
  icon: LucideIcon;
};

export const HAIR_TYPE_OPTIONS: OptionMeta<HairType>[] = [
  { value: "straight", label: "Straight", description: "Falls flat with little to no bend" },
  { value: "wavy", label: "Wavy", description: "Loose S-shaped waves" },
  { value: "curly", label: "Curly", description: "Defined spirals or ringlets" },
  { value: "coily", label: "Coily", description: "Tight coils or zig-zag pattern" },
];

export const HAIR_CONDITION_OPTIONS: IconOptionMeta<HairCondition>[] = [
  { value: "dry", label: "Dry", description: "Feels rough, lacks shine", icon: Sun },
  { value: "oily", label: "Oily", description: "Greasy roots within a day", icon: Droplets },
  { value: "normal", label: "Normal", description: "Balanced, low maintenance", icon: Sparkles },
  { value: "damaged", label: "Damaged", description: "Breakage, heat or color damage", icon: Flame },
];

export const SCALP_CONDITION_OPTIONS: IconOptionMeta<ScalpCondition>[] = [
  { value: "dandruff", label: "Dandruff", description: "Visible flaking", icon: Snowflake },
  { value: "itchy", label: "Itchy", description: "Irritated or sensitive scalp", icon: Annoyed },
  { value: "healthy", label: "Healthy", description: "No flaking or irritation", icon: Leaf },
];

export const CONCERN_OPTIONS: IconOptionMeta<HairConcern>[] = [
  { value: "hair_fall", label: "Hair fall", description: "Excess shedding or loss", icon: TrendingDown },
  { value: "frizz", label: "Frizz", description: "Flyaways, hard to tame", icon: Wind },
  { value: "thinning", label: "Thinning", description: "Reduced density or volume", icon: CircleMinus },
  { value: "split_ends", label: "Split ends", description: "Dry, fraying tips", icon: Scissors },
];

export const SLEEP_QUALITY_OPTIONS: OptionMeta<SleepQuality>[] = [
  { value: "poor", label: "Poor", description: "Under 5 hours, often disrupted" },
  { value: "fair", label: "Fair", description: "5-6 hours, somewhat restless" },
  { value: "good", label: "Good", description: "7-8 hours, mostly restful" },
  { value: "excellent", label: "Excellent", description: "8+ hours, consistently restful" },
];

export const STRESS_LEVEL_OPTIONS: OptionMeta<StressLevel>[] = [
  { value: "low", label: "Low", description: "Rarely feel overwhelmed" },
  { value: "moderate", label: "Moderate", description: "Some stressful days" },
  { value: "high", label: "High", description: "Frequently stressed" },
  { value: "severe", label: "Severe", description: "Constantly under pressure" },
];

export const WATER_TYPE_OPTIONS: OptionMeta<WaterType>[] = [
  { value: "soft", label: "Soft water", description: "Lathers easily, low mineral content" },
  { value: "hard", label: "Hard water", description: "Leaves residue, high mineral content" },
];
