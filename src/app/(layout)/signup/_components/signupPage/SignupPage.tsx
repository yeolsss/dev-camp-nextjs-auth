"use client";

import { AuthHeaderTitle } from "@/components/header/title";
import SignForm from "@/app/(layout)/signup/_components/signForm";
import { AnimatePresence, motion } from "framer-motion";
import useSignupStepStore from "@/zustand/stores/signupStepStore";
import { Progress } from "@/components/ui/progress";
import {
  SIGN_UP_EMAIL,
  SIGN_UP_NAME,
  SIGN_UP_PASSWORD,
  SIGN_UP_PASSWORD_CONFIRM,
  SIGN_UP_PHONE,
  SIGN_UP_ROLE,
  SignUpInputConstants,
} from "@/constants/user.constants";
import useSignUpForm from "@/hooks/signUpForm";
import SignupFormButtonGroup from "../signupFormButtons";

function SignupPage() {
  const { form, handleOnSubmit } = useSignUpForm();

  const currentStep = useSignupStepStore.use.step();

  const stepFields: SignUpInputConstants[][] = [
    [SIGN_UP_NAME, SIGN_UP_EMAIL, SIGN_UP_PHONE, SIGN_UP_ROLE],
    [SIGN_UP_PASSWORD, SIGN_UP_PASSWORD_CONFIRM],
  ];

  return (
    <div className="h-[30rem] flex flex-col justify-between relative">
      <div className="flex flex-col gap-5">
        <Progress value={(currentStep + 1) * 50} />
        <AuthHeaderTitle titleName={"회원가입"} />
      </div>
      <AnimatePresence initial={false}>
        {currentStep === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, translateX: "-100%" }}
            animate={{ opacity: 1, translateX: "0%" }}
            exit={{ opacity: 0, translateX: "-100%" }}
            transition={{ duration: 0.5 }}
            className="absolute top-16 w-full"
          >
            <SignForm
              key="step-0"
              fields={stepFields[0]}
              form={form}
              handleOnSubmit={handleOnSubmit}
            >
              <SignupFormButtonGroup />
            </SignForm>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, translateX: "100%" }}
            animate={{ opacity: 1, translateX: "0%" }}
            exit={{ opacity: 0, translateX: "100%" }}
            transition={{ duration: 0.5 }}
            className="absolute top-16 w-full"
          >
            <SignForm
              key="step-1"
              fields={stepFields[1]}
              form={form}
              handleOnSubmit={handleOnSubmit}
            >
              <SignupFormButtonGroup />
            </SignForm>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SignupPage;
