"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@launchstack/ui";
import { signUpAction } from "../../app/(auth)/auth/actions";
import { signUpSchema, type SignUpInput } from "../../lib/auth-schemas";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await signUpAction(values);
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
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Start building your AI SaaS product with LaunchStack.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <Input id="name" {...form.register("name")} />
          </div>
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
            {isPending ? "Creating account..." : "Create Account"}
          </Button>
          <p className="text-sm text-gray-500">
            Already have an account? <Link href="/auth/signin" className="text-primary">Sign in</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
