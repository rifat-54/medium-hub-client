"use server";

import { cookieUtils } from "@/lib/utils/cookieUtils";

interface RegisterResponse {
  success: boolean;
  message: string;

  data?: {
    access_token?: string;
    refresh_token?: string;
    token?:string;

    user?: {
      id: string;
      name: string;
      email: string;
    };
  };
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function registerAction(payload: RegisterPayload) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result: RegisterResponse = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }

    // Set authentication cookies if backend returns tokens

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
      message: result.message || "Account created successfully",
    };
  } catch (error) {
    console.error("Register action error:", error);

    return {
      success: false,
      message: "Unable to connect to the server. Please try again.",
    };
  }
}