"use client";

import { useMemo, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, CircleAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StepProgress } from "@/components/onboarding/step-progress";
import {
  StepConcerns,
  StepHairCondition,
  StepHairType,
  StepLifestyle,
  StepLocationWater,
  StepName,
  StepScalpCondition,
} from "@/components/onboarding/onboarding-steps";
import { completeOnboardingAction } from "@/lib/actions/onboarding";
import { ONBOARDING_STEP_COUNT, type OnboardingInput } from "@/lib/validations/onboarding";
import type {
  HairCondition,
  HairConcern,
  HairType,
  ScalpCondition,
  SleepQuality,
  StressLevel,
  WaterType,
} from "@/types/database";

type WizardState = {
  fullName: string;
  hairType: HairType | null;
  hairCondition: HairCondition | null;
  scalpCondition: ScalpCondition | null;
  concerns: HairConcern[];
  sleepQuality: SleepQuality | null;
  stressLevel: StressLevel | null;
  location: string;
  waterType: WaterType | null;
};

function isStepValid(step: number, state: WizardState): boolean {
  switch (step) {
    case 1:
      return state.fullName.trim().length >= 2;
    case 2:
      return state.hairType !== null;
    case 3:
      return state.hairCondition !== null;
    case 4:
      return state.scalpCondition !== null;
    case 5:
      return state.concerns.length >= 1;
    case 6:
      return state.sleepQuality !== null && state.stressLevel !== null;
    case 7:
      return state.location.trim().length >= 2 && state.waterType !== null;
    default:
      return false;
  }
}

export function OnboardingWizard({ initialFullName }: { initialFullName: string }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<WizardState>({
    fullName: initialFullName,
    hairType: null,
    hairCondition: null,
    scalpCondition: null,
    concerns: [],
    sleepQuality: null,
    stressLevel: null,
    location: "",
    waterType: null,
  });

  const canAdvance = useMemo(() => isStepValid(step, state), [step, state]);

  function patch(partial: Partial<WizardState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  function handleNext() {
    if (!canAdvance) return;
    setError(null);
    if (step < ONBOARDING_STEP_COUNT) {
      setStep((s) => s + 1);
      return;
    }

    const payload: OnboardingInput = {
      fullName: state.fullName,
      hairType: state.hairType!,
      hairCondition: state.hairCondition!,
      scalpCondition: state.scalpCondition!,
      concerns: state.concerns,
      sleepQuality: state.sleepQuality!,
      stressLevel: state.stressLevel!,
      location: state.location,
      waterType: state.waterType!,
    };

    startTransition(async () => {
      const result = await completeOnboardingAction(payload);
      if (result && "error" in result) {
        setError(result.error);
      }
    });
  }

  function handleBack() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <div className="w-full max-w-lg">
      <StepProgress step={step} total={ONBOARDING_STEP_COUNT} />

      <div className="shadow-soft mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
        {error && (
          <Alert variant="destructive" className="mb-5">
            <CircleAlert className="size-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 1 && <StepName value={state.fullName} onChange={(v) => patch({ fullName: v })} />}
        {step === 2 && (
          <StepHairType value={state.hairType} onChange={(v) => patch({ hairType: v })} />
        )}
        {step === 3 && (
          <StepHairCondition
            value={state.hairCondition}
            onChange={(v) => patch({ hairCondition: v })}
          />
        )}
        {step === 4 && (
          <StepScalpCondition
            value={state.scalpCondition}
            onChange={(v) => patch({ scalpCondition: v })}
          />
        )}
        {step === 5 && (
          <StepConcerns value={state.concerns} onChange={(v) => patch({ concerns: v })} />
        )}
        {step === 6 && (
          <StepLifestyle
            sleepQuality={state.sleepQuality}
            stressLevel={state.stressLevel}
            onSleepChange={(v) => patch({ sleepQuality: v })}
            onStressChange={(v) => patch({ stressLevel: v })}
          />
        )}
        {step === 7 && (
          <StepLocationWater
            location={state.location}
            waterType={state.waterType}
            onLocationChange={(v) => patch({ location: v })}
            onWaterTypeChange={(v) => patch({ waterType: v })}
          />
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1 || isPending}
            className="gap-1.5"
          >
            <ArrowLeft className="size-4" /> Back
          </Button>
          <Button type="button" onClick={handleNext} disabled={!canAdvance || isPending} className="gap-1.5">
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : step === ONBOARDING_STEP_COUNT ? (
              "Finish"
            ) : (
              <>
                Next <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
