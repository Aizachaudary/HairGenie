import type { WaterType } from "@/types/database";

const DAILY_TIPS: string[] = [
  "Towel-dry by blotting, not rubbing — friction is a leading cause of frizz and breakage.",
  "Switch to a silk or satin pillowcase to cut down on overnight friction.",
  "Trim every 8-12 weeks, even if you're growing your hair out — it stops split ends from traveling up the shaft.",
  "Brush from the ends up, not the roots down, to detangle with less breakage.",
  "Skip the daily wash if you can — overwashing strips the natural oils that protect your strands.",
  "Apply heat protectant every time you use hot tools, not just on special occasions.",
  "A cold water rinse after conditioning can help seal the cuticle for extra shine.",
  "A wide-tooth comb on wet hair causes far less breakage than a brush.",
  "A microfiber towel (or an old t-shirt) dries hair faster with less frizz than terry cloth.",
  "A few minutes of scalp massage a day can support healthier hair growth over time.",
  "Tight hairstyles worn every day can stress your hairline — give it a break when you can.",
  "UV exposure fades color and weakens strands — a hat or UV spray helps on sunny days.",
  "Protein and biotin-rich meals support hair strength from the inside out.",
  "Letting hair air-dry most of the way before styling cuts down on heat damage.",
];

const HARD_WATER_TIPS: string[] = [
  "Hard water leaves mineral buildup that dulls shine — a weekly clarifying shampoo helps strip it away.",
  "A chelating treatment once a month can remove the mineral film hard water leaves behind.",
  "A shower filter reduces mineral exposure, so color and moisture last longer.",
];

const SOFT_WATER_TIPS: string[] = [
  "Soft water rinses out product easily, so a little conditioner goes a long way.",
  "Lather builds quickly in soft water — a smaller amount of shampoo is usually enough.",
  "Soft water is gentle on color-treated hair, so your color should hold longer between touch-ups.",
];

function dayOfYear(date: Date): number {
  return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86_400_000);
}

export function getDailyTip(date: Date = new Date()): string {
  return DAILY_TIPS[dayOfYear(date) % DAILY_TIPS.length];
}

export function getClimateTip(waterType: WaterType | null, date: Date = new Date()): string {
  const pool = waterType === "hard" ? HARD_WATER_TIPS : SOFT_WATER_TIPS;
  return pool[dayOfYear(date) % pool.length];
}
