"use client";

import { Wrapper } from "@/components/auth/wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth/auth-client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    if (!token) {
      setError("Invalid URL");
      setIsSubmitting(false);
      return;
    }
    const res = await authClient.resetPassword({
      newPassword: password,
      token: token,
    });
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    setIsSubmitting(false);
    router.push("/login");
  }

  return (
    <Wrapper>
      <div className="px-4 sm:px-6 md:px-8">
        <Card className="rounded-md rounded-t-none max-w-md mx-auto shadow-sm border-t-0">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-xl font-semibold">
              Reset Password
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter a new password for your account
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 pb-2">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    New Password
                  </Label>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className="h-10"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <PasswordInput
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(e.target.value)
                    }
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    className="h-10"
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="py-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  className="w-full mt-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col px-6 pb-6 pt-2">
            <div className="w-full">
              <p className="text-center text-sm">
                Remember your password?
                <Button asChild variant="link" className="px-2 h-auto">
                  <Link href="/login">Log in</Link>
                </Button>
              </p>
            </div>
            <div className="flex justify-center w-full border-t py-4 mt-4">
              <p className="text-center text-xs text-neutral-500">
                Secured by <span className="text-orange-400">Team Vyse</span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Wrapper>
  );
}
