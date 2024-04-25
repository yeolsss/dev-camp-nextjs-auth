import { AuthHeaderTitle } from "@/components/header/title";
import LoginForm from "@/app/(provider)/(layout)/login/_components/loginForm";

function LoginPage() {
  return (
    <div>
      <AuthHeaderTitle titleName={"로그인"} />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
