import { AuthPage } from "@/components/page";
import SignupPage from "@/app/(provider)/(layout)/signup/_components/signupPage/SignupPage";

function SignUp() {
  return (
    <AuthPage>
      <SignupPage />
    </AuthPage>
  );
}

export default SignUp;