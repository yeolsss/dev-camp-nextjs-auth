"use client";

import { SignupFormSchema } from "@/validators/auth/auth.validator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
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
import { UserData } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const useSignUpForm = () => {
  const { toast } = useToast();

  const mutation = useMutation({ mutationFn: signUp });
  const router = useRouter();

  const currentStep = useSignupStepStore.use.step();
  const setCurrentStep = useSignupStepStore.use.setCurrentStep();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
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
          setCurrentStep(currentStep + 1);
        } else {
          await form.handleSubmit((data: z.infer<typeof SignupFormSchema>) => {
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

            const newUser: UserData = {
              id: uuidv4(),
              name: data[SIGN_UP_NAME.id],
              email: data[SIGN_UP_EMAIL.id],
              phone: data[SIGN_UP_PHONE.id],
              password: data[SIGN_UP_PASSWORD.id],
              role: data[SIGN_UP_ROLE.id],
            };

            mutation.mutate(newUser, {
              onSuccess: () => {
                form.reset({
                  [SIGN_UP_NAME.id]: "",
                  [SIGN_UP_EMAIL.id]: "",
                  [SIGN_UP_PHONE.id]: "",
                  [SIGN_UP_ROLE.id]: "",
                  [SIGN_UP_PASSWORD.id]: "",
                  [SIGN_UP_PASSWORD_CONFIRM.id]: "",
                });
                toast({
                  title: "회원가입이 완료되었습니다.",
                  variant: "default",
                  duration: 2000,
                });
                router.push("/", { scroll: false });
              },
              onError: (error) => {
                toast({
                  title: error.message,
                  variant: "destructive",
                  duration: 1000,
                });
              },
            });
          })();
        }
      }
    },
    [currentStep, form, setCurrentStep, mutation],
  );
  useEffect(() => {
    return () => {
      setCurrentStep(0);
    };
  }, []);

  return { form, handleOnSubmit };
};

export default useSignUpForm;
