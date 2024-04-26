import { AuthHeaderTitle } from "@/components/header/title";
import LoginForm from "@/app/(providers)/(root)/(auth)/login/_components/loginForm";

function LoginPage() {
  return (
    <div>
      <AuthHeaderTitle>로그인</AuthHeaderTitle>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
