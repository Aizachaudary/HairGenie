import type { HairCondition, HairConcern, HairType, Profile, ScalpCondition } from "@/types/database";

type RoutineProfile = Pick<Profile, "hair_type" | "hair_condition" | "scalp_condition" | "concerns">;

function cleanseTask(condition: HairCondition | null): string {
  switch (condition) {
    case "oily":
      return "Cleanse with a clarifying, sulfate-free shampoo";
    case "dry":
    case "damaged":
      return "Gentle cleanse with a moisturizing, sulfate-free shampoo";
    default:
      return "Cleanse with a sulfate-free shampoo";
  }
}

function scalpTask(scalpCondition: ScalpCondition | null, concerns: HairConcern[]): string {
  if (scalpCondition === "dandruff") {
    return "Use an anti-dandruff scalp treatment and massage for 2 minutes";
  }
  if (scalpCondition === "itchy") {
    return "Apply a soothing scalp oil and massage gently for 3 minutes";
  }
  if (concerns.includes("hair_fall") || concerns.includes("thinning")) {
    return "Scalp massage with a strengthening oil to support circulation";
  }
  return "Light scalp massage to maintain a healthy scalp";
}

function conditionTask(hairType: HairType | null, condition: HairCondition | null): string {
  if (hairType === "curly" || hairType === "coily") {
    return "Apply a rich leave-in conditioner on damp hair, then detangle";
  }
  if (condition === "dry" || condition === "damaged") {
    return "Apply a hydrating leave-in conditioner from mid-length to ends";
  }
  return "Apply a lightweight conditioner, focusing on the ends";
}

function midweekTask(condition: HairCondition | null): string {
  if (condition === "oily") {
    return cleanseTask(condition);
  }
  return "Refresh with a dry shampoo at the roots and a light mist of leave-in on the ends";
}

function styleTask(hairType: HairType | null, concerns: HairConcern[]): string {
  if (concerns.includes("frizz")) {
    return "Smooth a frizz-control serum onto damp hair before styling";
  }
  if (hairType === "curly" || hairType === "coily") {
    return "Diffuse on low heat with a curl-defining cream";
  }
  return "Air-dry or use a heat protectant before any styling";
}

function maskTask(hairType: HairType | null, condition: HairCondition | null): string {
  if (condition === "damaged" || condition === "dry" || hairType === "curly" || hairType === "coily") {
    return "Deep-condition with a nourishing hair mask for 15-20 minutes";
  }
  return "Light weekly hair mask to maintain moisture balance";
}

function restTask(concerns: HairConcern[]): string {
  if (concerns.includes("split_ends")) {
    return "Gentle detangle and check your ends — book a trim if you're overdue";
  }
  return "Rest day — gentle detangle and low manipulation, protective style if needed";
}

/** One task per day, Monday through Sunday, tailored to the given hair profile. */
export function generateWeeklyRoutine(
  profile: RoutineProfile,
): { day_of_week: number; task: string }[] {
  const { hair_type, hair_condition, scalp_condition, concerns } = profile;

  const tasks = [
    cleanseTask(hair_condition),
    scalpTask(scalp_condition, concerns),
    conditionTask(hair_type, hair_condition),
    midweekTask(hair_condition),
    styleTask(hair_type, concerns),
    maskTask(hair_type, hair_condition),
    restTask(concerns),
  ];

  return tasks.map((task, day_of_week) => ({ day_of_week, task }));
}
