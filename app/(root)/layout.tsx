import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import FileUploader from "@/components/FileUploader";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  let currentUser;
  let ownerId;
  let accountId;
  try {
    currentUser = await getCurrentUser();
    if (!currentUser) return redirect("/sign-in");

    ({ $id: ownerId, accountId } = currentUser);
  } catch (error) {
    console.error("Error fetching current user:", error);
    return redirect("/sign-in");
  }

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />

      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header />
        <div className="main-content">{children}</div>

        <FileUploader
          ownerId={ownerId}
          accountId={accountId}
          className="hidden w-full"
        />
      </section>
      <Toaster />
    </main>
  );
};
export default Layout;
