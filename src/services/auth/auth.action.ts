"use server";

import { cookieUtils } from "@/lib/utils/cookieUtils";

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    token?:string;
    user?: {
      id: string;
      email: string;
      name: string;
    };
  };
}

export async function loginAction(payload: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result: LoginResponse = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    // Set authentication cookies

    if (result.data?.token) {
     await cookieUtils.setCookie("better-auth.session_token",result.data.token)
    }

    if (result.data?.accessToken) {
      await cookieUtils.setCookie("accessToken",result.data.accessToken)
    }

    if (result.data?.refreshToken) {
     await cookieUtils.setCookie("refreshToken",result.data.refreshToken)
    }

    return {
      success: true,
      message: result.message || "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}