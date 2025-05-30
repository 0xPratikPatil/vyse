"use client";

import Link from "next/link";
import Logo from "@/components/logo.png";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Wrapper(props: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isLoginIn = pathName === "/login";

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex justify-center">
      <div className="absolute pointer-events-none inset-0 md:flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] hidden"></div>
      <div className="bg-white dark:bg-black border-b py-2 flex justify-between items-center border-border absolute z-50 w-full lg:w-8/12 px-4 md:px-1">
        <Link href="/">
          <div className="flex gap-2 cursor-pointer items-center">
            <Image src={Logo} alt="Vyse" className="w-12" />
            <p className="dark:text-white text-black">Vyse</p>
          </div>
        </Link>
        <div className="z-50 flex items-center gap-3">
          <Button asChild>
            <Link href={isLoginIn ? "/register" : "/login"}>
              {isLoginIn ? "Register" : "Login"}
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-24 2xl:mt-40 lg:w-7/12 w-full">{props.children}</div>
    </div>
  );
}
