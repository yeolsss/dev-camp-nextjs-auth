"use client";

import { Button } from "@/components/ui/button";
import { useSignupStep } from "@/context/signupContext/SignupStepContext";

function SignupFormButtonGroup() {
  const { step: currentStep, setCurrentStep } = useSignupStep();
  return (
    <section className="flex gap-5">
      {currentStep === 0 ? (
        <Button type="submit">다음</Button>
      ) : (
        <>
          <Button type="submit">완료하기</Button>
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            이전으로
          </Button>
        </>
      )}
    </section>
  );
}

export default SignupFormButtonGroup;
