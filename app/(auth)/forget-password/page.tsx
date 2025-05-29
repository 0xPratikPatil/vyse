"use client";

import { Wrapper } from "@/components/auth/wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from "@/lib/auth/auth-client";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

export default function Component() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      });
      setIsSubmitted(true);
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="px-4 sm:px-6 md:px-8">
        <Card className="rounded-md rounded-t-none max-w-md mx-auto shadow-sm border-t-0">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-xl font-semibold">
              {isSubmitted ? "Check your email" : "Recover Password"}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {isSubmitted 
                ? "We've sent a password reset link to your email." 
                : "Enter your email to receive a reset link"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 pb-2">
            {isSubmitted ? (
              <div className="space-y-4">
                <Alert className="text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    If you don't see the email, check your spam folder.
                  </AlertDescription>
                </Alert>

                <Button 
                  className="w-full mt-6"
                  onClick={() => setIsSubmitted(false)}>
                  Back to reset password
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      type="email"
                      required
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex-col px-6 pb-6 pt-2">
            {!isSubmitted && (
              <div className="w-full mb-4">
                <p className="text-center text-sm text-muted-foreground">
                  We'll send you a link to reset your password.
                </p>
              </div>
            )}
            <div className="w-full">
              <p className="text-center text-sm">
                Remembered your password?
                <Button
                  asChild
                  variant="link"
                  className="px-2 h-auto">
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
