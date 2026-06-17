import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OptionCard } from "@/components/onboarding/option-card";
import { SegmentedChoice } from "@/components/onboarding/segmented-choice";
import { HairStrandIcon } from "@/components/onboarding/hair-strand-icon";
import {
  CONCERN_OPTIONS,
  HAIR_CONDITION_OPTIONS,
  HAIR_TYPE_OPTIONS,
  SCALP_CONDITION_OPTIONS,
  SLEEP_QUALITY_OPTIONS,
  STRESS_LEVEL_OPTIONS,
  WATER_TYPE_OPTIONS,
} from "@/lib/constants/onboarding";
import type {
  HairCondition,
  HairConcern,
  HairType,
  ScalpCondition,
  SleepQuality,
  StressLevel,
  WaterType,
} from "@/types/database";

function StepHeader({ title, hint }: { title: string; hint: string }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

export function StepName({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <StepHeader
        title="What should we call you?"
        hint="We'll use this to personalize your routine and dashboard."
      />
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          autoFocus
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Jordan Lee"
        />
      </div>
    </div>
  );
}

export function StepHairType({
  value,
  onChange,
}: {
  value: HairType | null;
  onChange: (value: HairType) => void;
}) {
  return (
    <div className="space-y-5">
      <StepHeader title="What's your hair type?" hint="Pick the closest match." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {HAIR_TYPE_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
            icon={(props) => <HairStrandIcon type={option.value} {...props} />}
          />
        ))}
      </div>
    </div>
  );
}

export function StepHairCondition({
  value,
  onChange,
}: {
  value: HairCondition | null;
  onChange: (value: HairCondition) => void;
}) {
  return (
    <div className="space-y-5">
      <StepHeader title="How does your hair feel day to day?" hint="Choose what fits most often." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {HAIR_CONDITION_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

export function StepScalpCondition({
  value,
  onChange,
}: {
  value: ScalpCondition | null;
  onChange: (value: ScalpCondition) => void;
}) {
  return (
    <div className="space-y-5">
      <StepHeader title="How's your scalp?" hint="This shapes your scalp-care routine." />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SCALP_CONDITION_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

export function StepConcerns({
  value,
  onChange,
}: {
  value: HairConcern[];
  onChange: (value: HairConcern[]) => void;
}) {
  function toggle(concern: HairConcern) {
    onChange(
      value.includes(concern) ? value.filter((item) => item !== concern) : [...value, concern],
    );
  }

  return (
    <div className="space-y-5">
      <StepHeader title="What are your main concerns?" hint="Select as many as apply." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CONCERN_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={value.includes(option.value)}
            onClick={() => toggle(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

export function StepLifestyle({
  sleepQuality,
  stressLevel,
  onSleepChange,
  onStressChange,
}: {
  sleepQuality: SleepQuality | null;
  stressLevel: StressLevel | null;
  onSleepChange: (value: SleepQuality) => void;
  onStressChange: (value: StressLevel) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Tell us about your lifestyle"
        hint="Sleep and stress both show up in your hair."
      />
      <div className="space-y-2">
        <Label>Sleep quality</Label>
        <SegmentedChoice options={SLEEP_QUALITY_OPTIONS} value={sleepQuality} onChange={onSleepChange} />
      </div>
      <div className="space-y-2">
        <Label>Stress level</Label>
        <SegmentedChoice options={STRESS_LEVEL_OPTIONS} value={stressLevel} onChange={onStressChange} />
      </div>
    </div>
  );
}

export function StepLocationWater({
  location,
  waterType,
  onLocationChange,
  onWaterTypeChange,
}: {
  location: string;
  waterType: WaterType | null;
  onLocationChange: (value: string) => void;
  onWaterTypeChange: (value: WaterType) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Last thing — where are you, and what's your water like?"
        hint="Climate and water hardness both affect your hair."
      />
      <div className="space-y-2">
        <Label htmlFor="location">City</Label>
        <Input
          id="location"
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="San Francisco, CA"
        />
      </div>
      <div className="space-y-2">
        <Label>Water type</Label>
        <SegmentedChoice options={WATER_TYPE_OPTIONS} value={waterType} onChange={onWaterTypeChange} />
      </div>
    </div>
  );
}
