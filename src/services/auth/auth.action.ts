"use server";

import { cookieUtils } from "@/lib/utils/cookieUtils";

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    access_token?: string;
    refresh_token?: string;
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

    if (result.data?.access_token) {
      await cookieUtils.setCookie("access_token",result.data.access_token)
    }

    if (result.data?.refresh_token) {
     await cookieUtils.setCookie("refresh_token",result.data.refresh_token)
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