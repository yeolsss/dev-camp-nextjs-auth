import { UserData } from "@/types/auth.type";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_JSON_SERVER_URL;

export const signUp = async (userData: UserData) => {
  try {
    const { data } = await axios.post("/register", userData);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("회원가입에 실패했습니다. 관리자에게 문의하세요.");
    }
  }
};

export const login = async ({ email, password }: Partial<UserData>) => {
  try {
    const { data } = await axios.post("/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("로그인에 실패했습니다. 로그인정보를 확인해 주세요.");
    }
  }
};
