import { getSession } from "@/components/auth/get-session";
import SettingsAccountPage from "@/components/settings/account-page";
import { redirect } from "next/navigation";
import React from "react";

const AccountPage = async () => {
  const session = await getSession();
  if (!session) redirect("/login");
  return <SettingsAccountPage session={session} />;
};

export default AccountPage;
