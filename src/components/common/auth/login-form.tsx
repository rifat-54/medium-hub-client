"use client";

import Link from "next/link";
import { useState } from "react";


import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";
import { loginAction } from "@/services/auth/auth.action";
import { loginSchema } from "@/lib/validations/auth.validation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

const [isPending, setIsPending] = useState(false);

const [errors, setErrors] = useState<{
  email?: string;
  password?: string;
}>({});

async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setErrors({});

  const formData = new FormData(e.currentTarget);

  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("login value: ",values)

  // Zod validation
  const validation = loginSchema.safeParse(values);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;

    setErrors({
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    });

    return;
  }

  try {
    setIsPending(true);

    const result = await loginAction(validation.data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.replace("/");
    router.refresh();
  } catch {
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsPending(false);
  }
}


  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F8F7F2] dark:bg-[#111413]">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-1 lg:grid-cols-2">

        {/* Left Section - Branding */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#315C50] p-10 text-white lg:flex xl:p-16">

          <div className="absolute -right-32 -top-32 size-96 rounded-full border border-white/10" />
          <div className="absolute -right-20 -top-20 size-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-32 size-96 rounded-full border border-white/10" />

          <Link href="/" className="relative z-10 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-white text-[#315C50]">
              <BookOpen size={25} />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              MediumHub
            </span>
          </Link>

          <div className="relative z-10 my-12 max-w-lg">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
              <Sparkles size={16} />
              A place for curious minds
            </div>

            <h1 className="text-4xl font-bold leading-[1.2] tracking-tight xl:text-6xl">
              Every story has a
              <span className="mt-2 block text-[#E6B66F]">
                place here.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-white/75 xl:text-lg">
              Discover fresh perspectives, share your knowledge, and connect
              with people through stories that matter.
            </p>

            <div className="mt-12 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#E6B66F] text-[#315C50]">
                  <BookOpen size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Your next chapter</p>
                  <p className="text-xs text-white/60">
                    Starts with a single story.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-lg font-medium leading-7">
                &quot;The more that you read, the more things you will know. The
                more that you learn, the more places you&apos;ll go.&quot;
              </p>

              <p className="mt-3 text-sm text-white/60">
                — Dr. Seuss
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-white/60">
            <p>© {new Date().getFullYear()} Medium Hub</p>
            <p>Read. Write. Inspire.</p>
          </div>
        </section>

        {/* Right Section - Login Form */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-12 xl:px-20">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-12 flex items-center justify-center gap-2 lg:hidden"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#315C50] text-white dark:bg-[#79B5A0] dark:text-[#171A19]">
                <BookOpen size={22} />
              </div>

              <span className="text-xl font-bold text-[#202522] dark:text-[#F2F3EF]">
                Medium<span className="text-[#315C50] dark:text-[#79B5A0]">Hub</span>
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-9">
              <p className="mb-3 text-sm font-semibold tracking-wide text-[#315C50] dark:text-[#79B5A0]">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#202522] dark:text-[#F2F3EF] sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#747B75] dark:text-[#A4ACA6]">
                Welcome back! Please enter your details to continue reading
                and sharing stories.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#202522] dark:text-[#F2F3EF]"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929991]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-12 w-full rounded-xl border border-[#E3E2DB] bg-white pl-12 pr-4 text-sm text-[#202522] outline-none transition-all placeholder:text-[#A4AAA4] focus:border-[#315C50] focus:ring-2 focus:ring-[#315C50]/10 dark:border-[#303633] dark:bg-[#171A19] dark:text-[#F2F3EF] dark:focus:border-[#79B5A0] dark:focus:ring-[#79B5A0]/10"
                  />
                </div>
                {errors.email && (
  <p className="text-sm text-red-500">{errors.email}</p>
)}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#202522] dark:text-[#F2F3EF]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#315C50] hover:text-[#25483E] dark:text-[#79B5A0] dark:hover:text-[#91C5B1]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929991]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-12 w-full rounded-xl border border-[#E3E2DB] bg-white pl-12 pr-12 text-sm text-[#202522] outline-none transition-all placeholder:text-[#A4AAA4] focus:border-[#315C50] focus:ring-2 focus:ring-[#315C50]/10 dark:border-[#303633] dark:bg-[#171A19] dark:text-[#F2F3EF] dark:focus:border-[#79B5A0] dark:focus:ring-[#79B5A0]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#929991] hover:text-[#315C50] dark:hover:text-[#79B5A0]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
                {errors.password && (
  <p className="text-sm text-red-500">{errors.password}</p>
)}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="size-4 cursor-pointer accent-[#315C50]"
                />

                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-[#747B75] dark:text-[#A4ACA6]"
                >
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
  type="submit"
  disabled={isPending}
  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#315C50] text-sm font-semibold text-white transition-all hover:bg-[#25483E] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#79B5A0] dark:text-[#171A19]"
>
  {isPending ? "Signing in..." : "Sign in"}
</button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E3E2DB] dark:border-[#303633]" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-[#F8F7F2] px-4 text-xs text-[#929991] dark:bg-[#111413]">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            {/* Google Login UI */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E3E2DB] bg-white text-sm font-semibold text-[#202522] transition-colors hover:bg-[#F3F2EC] dark:border-[#303633] dark:bg-[#171A19] dark:text-[#F2F3EF] dark:hover:bg-[#252B28]"
            >
              <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.73 7.18l7.28 5.65c4.25-3.93 7.49-9.72 7.49-17.3Z" />
                <path fill="#FBBC05" d="M10.54 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.49-5.79l-7.28-5.65c-2.02 1.35-4.6 2.14-8.21 2.14-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
              </svg>

              Continue with Google
            </button>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-[#747B75] dark:text-[#A4ACA6]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#315C50] hover:underline dark:text-[#79B5A0]"
              >
                Create an account
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-10 text-center text-xs text-[#929991]">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-[#315C50] dark:hover:text-[#79B5A0]">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-[#315C50] dark:hover:text-[#79B5A0]">
                Privacy Policy
              </Link>.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}