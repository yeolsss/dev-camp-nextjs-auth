"use client";

import { SignupStepProvider } from "@/context/signupContext/SignupStepContext";
import SignupPage from "@/app/(providers)/(root)/(auth)/signup/_components/signupPage";

function SignUp() {
  return (
    <SignupStepProvider>
      <SignupPage />
    </SignupStepProvider>
  );
}

export default SignUp;
