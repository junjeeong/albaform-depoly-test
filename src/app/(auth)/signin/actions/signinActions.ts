"use server";

import { signInSchema } from "@/schema/signin/signinSchema";
import { setCookie } from "../../../../lib/cookie";

export const signinAction = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!data.email || !data.password) {
    return {
      error: "이메일 또는 비밀번호를 입력해주세요.",
    };
  }

  const parsedData = signInSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      error: parsedData.error.flatten(),
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const responseErrorText = result.message;
    console.error("로그인 요청 실패", result.message);
    return {
      status: response.status,
      error: responseErrorText,
    };
  } else {
    const { accessToken, refreshToken, ...rest } = result;

    await setCookie(accessToken, refreshToken, rest.user.role, rest.user.id);

    return {
      status: response.status,
      error: "",
    };
  }
};
