"use client";

import { loginFields } from "@/validators/auth/auth.validator";
import AuthForm from "../../../../../../components/authForm";
import LoginButton from "@/app/(provider)/(layout)/login/_components/loginButton";
import useLoginForm from "@/hooks/loginForm";

function LoginForm() {
  const { form, handleOnSubmit } = useLoginForm();

  return (
    <section className="m-auto">
      <AuthForm
        fields={loginFields}
        form={form}
        handleOnSubmit={handleOnSubmit}
        gap={"gap-16"}
        justifyContent={"justify-center"}
      >
        <LoginButton />
      </AuthForm>
    </section>
  );
}

export default LoginForm;
