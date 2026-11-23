"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";


import { registerAction } from "@/services/auth/register.action";
import { registerSchema } from "@/lib/validations/auth.validation";


export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPending, setIsPending] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  async function handleRegister(
    e: React.SubmitEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setErrors({});

    const formData = new FormData(e.currentTarget);

    const values = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // Zod validation
    const validation = registerSchema.safeParse(values);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });

      return;
    }

    try {
      setIsPending(true);

      const result = await registerAction({
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);

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

          {/* Background Decoration */}

          <div className="absolute -right-32 -top-32 size-96 rounded-full border border-white/10" />

          <div className="absolute -right-20 -top-20 size-72 rounded-full border border-white/10" />

          <div className="absolute -bottom-32 -left-32 size-96 rounded-full border border-white/10" />

          {/* Brand */}

          <Link
            href="/"
            className="relative z-10 flex items-center gap-3"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-white text-[#315C50]">
              <BookOpen size={25} />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              MediumHub
            </span>
          </Link>

          {/* Main Content */}

          <div className="relative z-10 my-12 max-w-lg">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
              <Sparkles size={16} />

              A place for curious minds
            </div>

            <h1 className="text-4xl font-bold leading-[1.2] tracking-tight xl:text-6xl">
              Your voice
              <span className="mt-2 block text-[#E6B66F]">
                deserves to be heard.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-white/75 xl:text-lg">
              Join a community of curious thinkers and passionate writers.
              Share your ideas, tell your stories, and inspire others.
            </p>

            {/* Editorial Card */}

            <div className="mt-12 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">

              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-full bg-[#E6B66F] text-[#315C50]">
                  <BookOpen size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Start something meaningful
                  </p>

                  <p className="text-xs text-white/60">
                    Your story matters.
                  </p>
                </div>

              </div>

              <p className="mt-5 text-lg font-medium leading-7">
                Every great writer started with a single word. Make yours
                count.
              </p>

            </div>

          </div>

          {/* Footer */}

          <div className="relative z-10 flex items-center justify-between text-xs text-white/60">

            <p>© {new Date().getFullYear()} Medium Hub</p>

            <p>Read. Write. Inspire.</p>

          </div>

        </section>

        {/* Right Section - Register Form */}

        <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-12 xl:px-20">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-2 lg:hidden"
            >

              <div className="flex size-10 items-center justify-center rounded-lg bg-[#315C50] text-white dark:bg-[#79B5A0] dark:text-[#171A19]">
                <BookOpen size={22} />
              </div>

              <span className="text-xl font-bold text-[#202522] dark:text-[#F2F3EF]">
                Medium
                <span className="text-[#315C50] dark:text-[#79B5A0]">
                  Hub
                </span>
              </span>

            </Link>

            {/* Heading */}

            <div className="mb-8">

              <p className="mb-3 text-sm font-semibold tracking-wide text-[#315C50] dark:text-[#79B5A0]">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#202522] dark:text-[#F2F3EF] sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#747B75] dark:text-[#A4ACA6]">
                Join Medium Hub and start sharing your stories with the
                world.
              </p>

            </div>

            {/* Register Form */}

            <form onSubmit={handleRegister} className="space-y-4">

              {/* Name */}

              <div className="space-y-2">

                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#202522] dark:text-[#F2F3EF]"
                >
                  Full name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929991]"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={isPending}
                    className="h-12 w-full rounded-xl border border-[#E3E2DB] bg-white pl-12 pr-4 text-sm text-[#202522] outline-none transition-all placeholder:text-[#A4AAA4] focus:border-[#315C50] focus:ring-2 focus:ring-[#315C50]/10 disabled:opacity-60 dark:border-[#303633] dark:bg-[#171A19] dark:text-[#F2F3EF] dark:focus:border-[#79B5A0]"
                  />

                </div>

                {errors.name && (
                  <p className="text-xs text-red-500">
                    {errors.name}
                  </p>
                )}

              </div>

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
                    disabled={isPending}
                    className="h-12 w-full rounded-xl border border-[#E3E2DB] bg-white pl-12 pr-4 text-sm text-[#202522] outline-none transition-all placeholder:text-[#A4AAA4] focus:border-[#315C50] focus:ring-2 focus:ring-[#315C50]/10 disabled:opacity-60 dark:border-[#303633] dark:bg-[#171A19] dark:text-[#F2F3EF] dark:focus:border-[#79B5A0]"
                  />

                </div>

                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* Password */}

              <div className="space-y-2">

                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#202522] dark:text-[#F2F3EF]"
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929991]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={isPending}
                    className="h-12 w-full rounded-xl border border-[#E3E2DB] bg-white pl-12 pr-12 text-sm text-[#202522] outline-none transition-all placeholder:text-[#A4AAA4] focus:border-[#315C50] focus:ring-2 focus:ring-[#315C50]/10 disabled:opacity-60 dark:border-[#303633] dark:bg-[#171A19] dark:text-[#F2F3EF] dark:focus:border-[#79B5A0]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isPending}
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
                  <p className="text-xs text-red-500">
                    {errors.password}
                  </p>
                )}

              </div>

              {/* Confirm Password */}

              <div className="space-y-2">

                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-[#202522] dark:text-[#F2F3EF]"
                >
                  Confirm password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929991]"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={isPending}
                    className="h-12 w-full rounded-xl border border-[#E3E2DB] bg-white pl-12 pr-12 text-sm text-[#202522] outline-none transition-all placeholder:text-[#A4AAA4] focus:border-[#315C50] focus:ring-2 focus:ring-[#315C50]/10 disabled:opacity-60 dark:border-[#303633] dark:bg-[#171A19] dark:text-[#F2F3EF] dark:focus:border-[#79B5A0]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isPending}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#929991] hover:text-[#315C50] dark:hover:text-[#79B5A0]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}

              </div>

              {/* Submit Button */}

              <button
                type="submit"
                disabled={isPending}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#315C50] text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#25483E] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#79B5A0] dark:text-[#171A19] dark:hover:bg-[#91C5B1]"
              >

                {isPending ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </form>

            {/* Login Link */}

            <p className="mt-8 text-center text-sm text-[#747B75] dark:text-[#A4ACA6]">
              Already have an account?{" "}

              <Link
                href="/login"
                className="font-semibold text-[#315C50] transition-colors hover:underline dark:text-[#79B5A0]"
              >
                Sign in
              </Link>
            </p>

            {/* Footer */}

            <p className="mt-8 text-center text-xs leading-5 text-[#929991]">
              By creating an account, you agree to our{" "}

              <Link
                href="/terms"
                className="underline hover:text-[#315C50] dark:hover:text-[#79B5A0]"
              >
                Terms
              </Link>

              {" "}and{" "}

              <Link
                href="/privacy"
                className="underline hover:text-[#315C50] dark:hover:text-[#79B5A0]"
              >
                Privacy Policy
              </Link>.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}