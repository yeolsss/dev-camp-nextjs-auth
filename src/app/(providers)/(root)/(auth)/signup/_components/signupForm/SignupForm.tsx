import { signupStepFields } from "@/validators/auth/auth.validator";
import AuthForm from "@/components/authForm";
import { UseFormReturn } from "react-hook-form";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useSignupStep } from "@/context/signupContext/SignupStepContext";

interface Props {
  form: UseFormReturn<{ [p: string]: string }, any, undefined>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function SignupForm({ form, handleSubmit }: Props) {
  const { step: currentStep, setCurrentStep } = useSignupStep();

  return (
    <AuthForm
      key="step-0"
      fields={signupStepFields[currentStep]}
      form={form}
      handleOnSubmit={handleSubmit}
    >
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
    </AuthForm>
  );
}

export default SignupForm;
