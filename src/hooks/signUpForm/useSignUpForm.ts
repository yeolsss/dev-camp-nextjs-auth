"use client";

import { SignupFormSchema } from "@/validators/auth/auth.validator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import {
  AUTH_EMAIL,
  AUTH_NAME,
  AUTH_PASSWORD,
  AUTH_PASSWORD_CONFIRM,
  AUTH_PHONE,
  AUTH_ROLE,
} from "@/constants/user.constants";
import { useCallback, useEffect } from "react";
import { AUTH_FORM_TOTAL_STEP } from "@/constants/authSignupForm.constants";
import { UserData } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSignupStep } from "@/context/signupContext";

const useSignUpForm = () => {
  const { toast } = useToast();

  const mutation = useMutation({ mutationFn: signUp });
  const router = useRouter();

  const { step: currentStep, setCurrentStep } = useSignupStep();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      [AUTH_NAME.id]: "",
      [AUTH_EMAIL.id]: "",
      [AUTH_PHONE.id]: "",
      [AUTH_ROLE.id]: "",
      [AUTH_PASSWORD.id]: "",
      [AUTH_PASSWORD_CONFIRM.id]: "",
    },
  });

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let fieldsToValidate = [] as string[];

      switch (currentStep) {
        case 0:
          fieldsToValidate = [
            AUTH_NAME.id,
            AUTH_EMAIL.id,
            AUTH_PHONE.id,
            AUTH_ROLE.id,
          ];
          break;
        case 1:
          fieldsToValidate = [AUTH_PASSWORD.id, AUTH_PASSWORD_CONFIRM.id];
          break;
      }

      const result = await form.trigger(fieldsToValidate);

      if (result) {
        if (currentStep < AUTH_FORM_TOTAL_STEP - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          await form.handleSubmit((data: z.infer<typeof SignupFormSchema>) => {
            if (data[AUTH_PASSWORD.id] !== data[AUTH_PASSWORD_CONFIRM.id]) {
              toast({
                title: "비밀번호가 일치하지 않습니다.",
                variant: "destructive",
                duration: 1000,
              });
              return;
            }

            const newUser: UserData = {
              id: uuidv4(),
              name: data[AUTH_NAME.id],
              email: data[AUTH_EMAIL.id],
              phone: data[AUTH_PHONE.id],
              password: data[AUTH_PASSWORD.id],
              role: data[AUTH_ROLE.id],
            };

            mutation.mutate(newUser, {
              onSuccess: () => {
                form.reset({
                  [AUTH_NAME.id]: "",
                  [AUTH_EMAIL.id]: "",
                  [AUTH_PHONE.id]: "",
                  [AUTH_ROLE.id]: "",
                  [AUTH_PASSWORD.id]: "",
                  [AUTH_PASSWORD_CONFIRM.id]: "",
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
    [currentStep, form, setCurrentStep, mutation, toast, router],
  );
  useEffect(() => {
    return () => {
      setCurrentStep(0);
    };
  }, [setCurrentStep]);

  return { form, handleOnSubmit };
};

export default useSignUpForm;
