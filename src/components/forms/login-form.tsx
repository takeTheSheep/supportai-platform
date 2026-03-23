"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { loginSchema } from "@/lib/validation/auth";

type LoginValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@supportai.dev",
      password: "DemoPass123!"
    }
  });

  const onSubmit = async (values: LoginValues) => {
    setError(null);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    const nextPath =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("next")
        : null;
    router.push(nextPath ?? "/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition duration-200 hover:text-heading"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <div className="card-elevated rounded-[1.75rem] border border-border/70 p-8 sm:p-9">
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-cta text-sm font-bold text-white shadow-soft">
            S
          </span>
          <span className="text-lg font-semibold tracking-tight text-heading">
            Support<span className="text-gradient-blue">AI</span>
          </span>
        </div>

        <h1 className="text-3xl font-semibold text-heading">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to manage conversations, knowledge, and escalations from one workspace.
        </p>

        <div className="mt-6 rounded-2xl border border-primary/10 bg-primarySoft/75 px-4 py-3 text-xs text-body">
          Demo access: <span className="font-semibold text-heading">admin@supportai.dev</span> /{" "}
          <span className="font-semibold text-heading">DemoPass123!</span>
        </div>

        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <div className="relative">
              <Mail
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <Input
                type="email"
                placeholder="Email address"
                className="h-12 border-border/80 bg-white/80 pl-11 pr-4"
                {...form.register("email")}
              />
            </div>
            {form.formState.errors.email ? (
              <p className="mt-1.5 text-xs text-rose">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <div className="relative">
              <Lock
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="h-12 border-border/80 bg-white/80 pl-11 pr-11"
                {...form.register("password")}
              />
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted transition duration-200 hover:text-heading"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.formState.errors.password ? (
              <p className="mt-1.5 text-xs text-rose">{form.formState.errors.password.message}</p>
            ) : null}
          </div>

          {error ? (
            <p className="rounded-xl bg-roseSoft px-3 py-2 text-sm text-rose">{error}</p>
          ) : null}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={form.formState.isSubmitting}
            loadingLabel="Signing in..."
          >
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted">
          No account?{" "}
          <Link href="/register" className="font-medium text-primary transition duration-200 hover:text-primaryDeep">
            Create demo account
          </Link>
        </p>
      </div>
    </div>
  );
};

