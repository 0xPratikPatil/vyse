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
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Component() {
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  // In a real app, this email would come from your authentication context
  const userEmail = "user@example.com";

  const requestOTP = async () => {
    await authClient.twoFactor.sendOtp();
    // In a real app, this would call your backend API to send the OTP
    setMessage("OTP sent to your email");
    setIsError(false);
    setIsOtpSent(true);
  };
  const router = useRouter();

  const validateOTP = async () => {
    const res = await authClient.twoFactor.verifyOtp({
      code: otp,
    });
    if (res.data) {
      setMessage("OTP validated successfully");
      setIsError(false);
      setIsValidated(true);
      router.push("/");
    } else {
      setIsError(true);
      setMessage("Invalid OTP");
    }
  };

  return (
    <Wrapper>
      <Card className="rounded-md rounded-t-none max-w-md mx-auto shadow-sm border-t-0 px-2 sm:px-0">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-xl font-semibold">
            Two-Factor Authentication
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Verify your identity with a one-time password
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <div className="grid w-full items-center gap-4">
            {!isOtpSent ? (
              <Button
                onClick={requestOTP}
                className="w-full flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Send OTP to Email
              </Button>
            ) : (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="otp" className="text-sm font-medium">
                    One-Time Password
                  </Label>
                  <Label className="py-2 text-sm text-muted-foreground">
                    Check your email at {userEmail} for the OTP
                  </Label>
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="h-10"
                  />
                </div>
                <Button
                  onClick={validateOTP}
                  disabled={otp.length !== 6 || isValidated}
                  className="w-full mt-2"
                >
                  Validate OTP
                </Button>
              </>
            )}
          </div>
          {message && (
            <div
              className={`flex items-center gap-2 mt-4 ${
                isError ? "text-red-500" : "text-primary"
              }`}
            >
              {isError ? (
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              )}
              <p className="text-sm">{message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col px-6 pb-6 pt-2">
          <div className="w-full">
            <Button asChild variant="link" className="w-full p-0 mb-4 h-auto">
              <Link href="/two-factor">Switch to TOTP Verification</Link>
            </Button>
          </div>
          <div className="flex justify-center w-full border-t py-4">
            <p className="text-center text-xs text-neutral-500">
              Secured by <span className="text-orange-400">Team Vyse</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </Wrapper>
  );
}
