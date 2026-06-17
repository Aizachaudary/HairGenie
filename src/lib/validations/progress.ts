import { z } from "zod";

export const progressLogSchema = z.object({
  hairFallLevel: z.coerce.number().int().min(0).max(10),
  frizzLevel: z.coerce.number().int().min(0).max(10),
});

export type ProgressLogInput = z.infer<typeof progressLogSchema>;
