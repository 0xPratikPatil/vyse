import { getSession } from "@/components/auth/get-session";
import SettingsProfilePage from "@/components/settings/profile-page";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
  const session = await getSession();
  if (!session) redirect("/login");
  return <SettingsProfilePage session={session} />;
};

export default ProfilePage;
