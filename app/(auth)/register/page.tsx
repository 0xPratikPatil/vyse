import { RegisterCard } from "@/components/auth/register-card";
import { Wrapper } from "@/components/auth/wrapper";
import React from "react";

const RegisterPage = () => {
  return (
    <Wrapper>
      <div className="w-full">
        <div className="flex items-center flex-col justify-center w-full md:py-10">
          <div className="w-[400px]">
            <RegisterCard />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
