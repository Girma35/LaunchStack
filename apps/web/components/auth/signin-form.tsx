"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@launchstack/ui";
import { signInAction } from "../../app/(auth)/auth/actions";
import { signInSchema, type SignInInput } from "../../lib/auth-schemas";

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await signInAction(values);
      if (result.error) {
        form.setError("root", { message: result.error });
        return;
      }
      router.push("/dashboard");
    });
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to continue to your organization workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          {form.formState.errors.root?.message ? (
            <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
          ) : null}
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-sm text-gray-500">
            No account? <Link href="/auth/signup" className="text-primary">Create one</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
