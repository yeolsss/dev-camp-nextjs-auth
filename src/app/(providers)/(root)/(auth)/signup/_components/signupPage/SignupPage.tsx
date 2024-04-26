"use client";

import { Progress } from "@/components/ui/progress";
import { AuthHeaderTitle } from "@/components/header/title";
import { AnimatePresence, motion } from "framer-motion";
import SignupForm from "@/app/(providers)/(root)/(auth)/signup/_components/signupForm";
import useSignUpForm from "@/hooks/signUpForm";
import { useSignupStep } from "@/context/signupContext";

function SignupPage() {
  const { form, handleOnSubmit } = useSignUpForm();
  const { step: currentStep } = useSignupStep();

  return (
    <div className="h-[30rem] flex flex-col justify-between relative">
      <div className="flex flex-col gap-5">
        <Progress value={(currentStep + 1) * 50} />
        <AuthHeaderTitle>회원가입</AuthHeaderTitle>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          key={`step-${currentStep}`}
          initial={{
            opacity: 0,
            translateX: `${currentStep === 0 && "-"}100%`,
          }}
          animate={{ opacity: 1, translateX: "0%" }}
          exit={{ opacity: 0, translateX: `${currentStep === 0 && "-"}100%` }}
          transition={{ duration: 0.5 }}
          className="absolute top-16 w-full"
        >
          <SignupForm
            key={`step-${currentStep}`}
            form={form}
            handleSubmit={handleOnSubmit}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SignupPage;
