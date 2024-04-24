import { cache } from "react";
import { UserData } from "@/types/auth.type";
import axios from "axios";

export const signUp = cache(async (userData: UserData) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/register`,
      userData,
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("회원가입에 실패했습니다. 관리자에게 문의하세요.");
    }
  }
});
