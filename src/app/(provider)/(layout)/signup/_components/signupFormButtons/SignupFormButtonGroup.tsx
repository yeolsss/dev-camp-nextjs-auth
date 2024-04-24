"use client";

import useSignupStepStore from "@/zustand/stores/signupStepStore";
import { Button } from "@/components/ui/button";

function SignupFormButtonGroup() {
  const currentStep = useSignupStepStore.use.step();
  const setCurrentStep = useSignupStepStore.use.setCurrentStep();
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
