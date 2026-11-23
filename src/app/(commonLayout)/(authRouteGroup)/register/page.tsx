import RegisterForm from "@/components/common/auth/register-form";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create Account | Medium Hub",
  description:
    "Join Medium Hub to discover fresh perspectives, share your knowledge, and publish your stories.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}