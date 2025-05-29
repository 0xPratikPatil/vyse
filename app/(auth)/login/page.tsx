import LoginCard from "@/components/auth/login-card";
import { Wrapper } from "@/components/auth/wrapper";
import React from "react";

const LoginPage = () => {
  return (
    <Wrapper>
      <div className="w-full">
        <div className="flex items-center flex-col justify-center w-full md:py-10">
          <div className="w-[400px]">
            <LoginCard />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
