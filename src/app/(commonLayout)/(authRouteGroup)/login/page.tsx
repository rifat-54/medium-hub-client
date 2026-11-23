import LoginForm from "@/components/common/auth/login-form";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sign In | Medium Hub",
  description: "Sign in to your Medium Hub account and continue reading stories.",
};

export default function LoginPage() {
  return <LoginForm />;
}