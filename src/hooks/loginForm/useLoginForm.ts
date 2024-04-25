"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFields, LoginFormSchema } from "@/validators/auth/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SIGN_UP_EMAIL, SIGN_UP_PASSWORD } from "@/constants/user.constants";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

const useLoginForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldsToValidate = loginFields.map((field) => field.id);
    const result = await form.trigger(fieldsToValidate);

    if (result) {
      await form.handleSubmit((data: z.infer<typeof LoginFormSchema>) => {
        const email = data[SIGN_UP_EMAIL.id];
        const password = data[SIGN_UP_PASSWORD.id];

        signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/",
        });
      })();
    }
  };

  return { form, handleOnSubmit };
};

export default useLoginForm;
