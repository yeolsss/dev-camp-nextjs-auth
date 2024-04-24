"use client";

import { FormSchema } from "@/validators/signUp/sign.validator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SIGN_UP_EMAIL,
  SIGN_UP_NAME,
  SIGN_UP_PASSWORD,
  SIGN_UP_PASSWORD_CONFIRM,
  SIGN_UP_PHONE,
  SIGN_UP_ROLE,
} from "@/constants/user.constants";
import useSignupStepStore from "@/zustand/stores/signupStepStore";
import { useCallback, useEffect } from "react";
import { AUTH_FORM_TOTAL_STEP } from "@/constants/authSignupForm.constants";
import { toast } from "@/components/ui/use-toast";

const useSignUpForm = () => {
  const currentStep = useSignupStepStore.use.step();
  const setCurrentStep = useSignupStepStore.use.setCurrentStep();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      [SIGN_UP_NAME.id]: "",
      [SIGN_UP_EMAIL.id]: "",
      [SIGN_UP_PHONE.id]: "",
      [SIGN_UP_ROLE.id]: "",
      [SIGN_UP_PASSWORD.id]: "",
      [SIGN_UP_PASSWORD_CONFIRM.id]: "",
    },
  });

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let fieldsToValidate = [] as string[];

      switch (currentStep) {
        case 0:
          fieldsToValidate = [
            SIGN_UP_NAME.id,
            SIGN_UP_EMAIL.id,
            SIGN_UP_PHONE.id,
            SIGN_UP_ROLE.id,
          ];
          break;
        case 1:
          fieldsToValidate = [SIGN_UP_PASSWORD.id, SIGN_UP_PASSWORD_CONFIRM.id];
          break;
      }

      const result = await form.trigger(fieldsToValidate);

      if (result) {
        if (currentStep < AUTH_FORM_TOTAL_STEP - 1) {
          console.log("currentstep", currentStep);
          setCurrentStep(currentStep + 1);
        } else {
          await form.handleSubmit((data: z.infer<typeof FormSchema>) => {
            if (
              data[SIGN_UP_PASSWORD.id] !== data[SIGN_UP_PASSWORD_CONFIRM.id]
            ) {
              toast({
                title: "비밀번호가 일치하지 않습니다.",
                variant: "destructive",
                duration: 1000,
              });
              return;
            }
            alert(JSON.stringify(data, null, 4));

            form.reset({
              [SIGN_UP_NAME.id]: "",
              [SIGN_UP_EMAIL.id]: "",
              [SIGN_UP_PHONE.id]: "",
              [SIGN_UP_ROLE.id]: "",
              [SIGN_UP_PASSWORD.id]: "",
              [SIGN_UP_PASSWORD_CONFIRM.id]: "",
            });
            setCurrentStep(0);
          })();
        }
      }
    },
    [currentStep, setCurrentStep, form],
  );
  useEffect(() => {
    return () => {
      setCurrentStep(0);
    };
  }, []);

  return { form, handleOnSubmit };
};

export default useSignUpForm;
