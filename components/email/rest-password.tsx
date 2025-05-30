import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
  Tailwind,
  Section,
} from "@react-email/components";
import * as React from "react";

interface BetterAuthResetPasswordEmailProps {
  username?: string;
  resetLink?: string;
}

export const ResetPasswordEmail = ({
  username,
  resetLink,
}: BetterAuthResetPasswordEmailProps) => {
  const previewText = `Reset your Vyse password`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Reset your <strong className="text-orange-500">Vyse</strong>{" "}
              password
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We received a request to reset your password for your Vyse
              account. If you didn't make this request, you can safely ignore
              this email.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-orange-500 rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={resetLink}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Or copy and paste this URL into your browser:{" "}
              <Link href={resetLink} className="text-orange-500 no-underline">
                {resetLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you didn't request a password reset, please ignore this email
              or contact our support team if you have concerns.
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center mt-4">
              Secured by <span className="text-orange-500">Team Vyse</span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export function reactResetPasswordEmail(
  props: BetterAuthResetPasswordEmailProps,
) {
  return <ResetPasswordEmail {...props} />;
}
