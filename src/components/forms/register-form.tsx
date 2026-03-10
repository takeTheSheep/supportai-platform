"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { registerSchema } from "@/lib/validation/auth";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: RegisterValues) => {
    setError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setError("Registration failed. Try another email.");
      return;
    }

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    });

    router.push("/dashboard");
  };

  return (
    <div className="surface-card w-full max-w-md p-6">
      <h1 className="text-2xl font-semibold text-heading">Create demo account</h1>
      <p className="mt-1 text-sm text-muted">Provisioned with support agent permissions by default.</p>
      <form className="mt-5 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Full name" {...form.register("name")} />
          {form.formState.errors.name ? (
            <p className="mt-1 text-xs text-rose">{form.formState.errors.name.message}</p>
          ) : null}
        </div>
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
          Create account
        </Button>
      </form>
      <p className="mt-3 text-xs text-muted">
        Already have access?{" "}
        <Link href="/login" className="text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
};

