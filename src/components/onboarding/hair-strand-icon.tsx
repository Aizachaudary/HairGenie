import type { HairType } from "@/types/database";

const STRAND_PATHS: Record<HairType, string> = {
  straight: "M12 2 V22",
  wavy: "M12 2 C 17 6, 7 8, 12 12 C 17 16, 7 18, 12 22",
  curly: "M12 2 C 19 4, 5 6, 12 8 C 19 10, 5 12, 12 14 C 19 16, 5 18, 12 20 C 16 21, 9 22, 12 22",
  coily:
    "M12 2 C 21 3, 3 4, 12 5 C 21 6, 3 7, 12 8 C 21 9, 3 10, 12 11 C 21 12, 3 13, 12 14 C 21 15, 3 16, 12 17 C 21 18, 3 19, 12 20 C 17 21, 7 21, 12 22",
};

export function HairStrandIcon({
  type,
  className,
}: {
  type: HairType;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d={STRAND_PATHS[type]}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
