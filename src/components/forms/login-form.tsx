"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    <div className="surface-card w-full max-w-md p-6">
      <h1 className="text-2xl font-semibold text-heading">Sign in to SupportAI</h1>
      <p className="mt-1 text-sm text-muted">Use seeded demo credentials or register a new demo user.</p>
      <form className="mt-5 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Input type="email" placeholder="Email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="mt-1 text-xs text-rose">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <Input type="password" placeholder="Password" {...form.register("password")} />
          {form.formState.errors.password ? (
            <p className="mt-1 text-xs text-rose">{form.formState.errors.password.message}</p>
          ) : null}
        </div>
        {error ? <p className="text-xs text-rose">{error}</p> : null}
        <Button type="submit" className="w-full" loading={form.formState.isSubmitting}>
          Sign In
        </Button>
      </form>
      <p className="mt-3 text-xs text-muted">
        No account?{" "}
        <Link href="/register" className="text-primary">
          Create demo account
        </Link>
      </p>
    </div>
  );
};

