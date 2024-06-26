import { z } from "zod";
import {
  AUTH_EMAIL,
  AUTH_NAME,
  AUTH_PASSWORD,
  AUTH_PASSWORD_CONFIRM,
  AUTH_PHONE,
  AUTH_ROLE,
  SignUpInputConstants,
} from "@/constants/user.constants";

const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const PHONE_REGEX = /^010\d{8}$/;

export const SignupFormSchema = z.object({
  [AUTH_NAME.id]: z
    .string()
    .min(2, { message: "이름은 2글자 이상이어야 합니다." })
    .max(100, { message: "이름은 100글자 이하이어야 합니다." }),
  [AUTH_EMAIL.id]: z
    .string()
    .email({ message: "올바른 이메일을 입력해주세요." }),
  [AUTH_PHONE.id]: z
    .string()
    .min(11, "연락처는 11자리여야 합니다.")
    .max(11, "연락처는 11자리여야 합니다.")
    .refine(
      (value) => PHONE_REGEX.test(value),
      "010으로 시작하는 11자리 숫자를 입력해주세요",
    ),
  [AUTH_ROLE.id]: z.string().min(1, {
    message: "역할을 선택해주세요.",
  }),
  [AUTH_PASSWORD.id]: z
    .string()
    .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
    .max(100, "비밀번호는 100자리 이하이어야 합니다.")
    .refine(
      (value) => PASSWORD_REGEX.test(value),
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.",
    ),
  [AUTH_PASSWORD_CONFIRM.id]: z
    .string()
    .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
    .max(100, "비밀번호는 100자리 이하이어야 합니다.")
    .refine(
      (value) => PASSWORD_REGEX.test(value),
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.",
    ),
});

export const LoginFormSchema = z.object({
  [AUTH_EMAIL.id]: z
    .string()
    .email({ message: "올바른 이메일을 입력해주세요." }),
  [AUTH_PASSWORD.id]: z
    .string()
    .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
    .max(100, "비밀번호는 100자리 이하이어야 합니다.")
    .refine(
      (value) => PASSWORD_REGEX.test(value),
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.",
    ),
});

export const signupStepFields: SignUpInputConstants[][] = [
  [AUTH_NAME, AUTH_EMAIL, AUTH_PHONE, AUTH_ROLE],
  [AUTH_PASSWORD, AUTH_PASSWORD_CONFIRM],
];

export const loginFields: SignUpInputConstants[] = [AUTH_EMAIL, AUTH_PASSWORD];
