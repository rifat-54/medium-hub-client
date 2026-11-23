import { cookies } from "next/headers";

const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
};

const getCookie = async (name: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value;
};

const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();

  cookieStore.delete(name);
};

export const cookieUtils = {
  setCookie,
  getCookie,
  deleteCookie,
};