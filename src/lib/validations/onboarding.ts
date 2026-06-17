import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(100),
  hairType: z.enum(["straight", "wavy", "curly", "coily"], {
    error: "Choose your hair type",
  }),
  hairCondition: z.enum(["dry", "oily", "normal", "damaged"], {
    error: "Choose your hair condition",
  }),
  scalpCondition: z.enum(["dandruff", "itchy", "healthy"], {
    error: "Choose your scalp condition",
  }),
  concerns: z
    .array(z.enum(["hair_fall", "frizz", "thinning", "split_ends"]))
    .min(1, "Pick at least one concern"),
  sleepQuality: z.enum(["poor", "fair", "good", "excellent"], {
    error: "Choose your sleep quality",
  }),
  stressLevel: z.enum(["low", "moderate", "high", "severe"], {
    error: "Choose your stress level",
  }),
  location: z.string().trim().min(2, "Enter your city").max(100),
  waterType: z.enum(["hard", "soft"], {
    error: "Choose your water type",
  }),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

export const ONBOARDING_STEP_COUNT = 7;
