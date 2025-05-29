"use client";

import { Wrapper } from "@/components/auth/wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Component() {
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
      setError("TOTP code must be 6 digits");
      return;
    }
    authClient.twoFactor
      .verifyTotp({
        code: totpCode,
      })
      .then((res) => {
        if (res.data && "token" in res.data) {
          setSuccess(true);
          setTimeout(() => {
            router.push("/chat");
          }, 3000);
          setError("");
        } else {
          setError("Invalid TOTP code");
        }
      });
  };

  return (
    <Wrapper>
      <div className="px-4 sm:px-6 md:px-8">
        <Card className="rounded-md rounded-t-none max-w-md mx-auto shadow-sm border-t-0">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-xl font-semibold">
              Two-Factor Authentication
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter your 6-digit TOTP code to authenticate
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 pb-2">
            {!success ? (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="totp" className="text-sm font-medium">
                      TOTP Code
                    </Label>
                    <Input
                      id="totp"
                      type="text"
                      inputMode="numeric"
                      pattern="\d{6}"
                      maxLength={6}
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      required
                      className="h-10"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button className="w-full mt-2" type="submit">
                    Verify
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <p className="text-lg font-semibold text-center">
                  Verification Successful
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  Redirecting to dashboard...
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col px-6 pb-6 pt-2">
            <div className="w-full">
              <p className="text-center text-sm">
                Need a different method?
                <Button asChild variant="link" className="px-2 h-auto">
                  <Link href="/two-factor/otp">
                    Switch to Email Verification
                  </Link>
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
