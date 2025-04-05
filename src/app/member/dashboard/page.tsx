import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import { env } from "@/lib/env/client";

export const metadata: Metadata = {
  title: "Dashboard Member",
};

export default async function MemberDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(
      `/auth/login?callbackUrl=${encodeURIComponent(`${env.NEXT_PUBLIC_BASE_URL}/member/dashboard`)}`
    );
  }

  const { user } = session;

  return (
    <SidebarProvider>
      <AppSidebar
        type="member"
        user={
          user as {
            fullName: string;
            email: string;
            avatar: string | null;
          }
        }
      />
      <SidebarInset>
        <DashboardHeader title="Dashboard Member" />
        {/* Content Dashboard */}
        <div className="flex flex-1 flex-col gap-4 p-4">Member Dashboard</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
