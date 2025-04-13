import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import { env } from "@/lib/env/client";
import { IProfile } from "@/utils/types/user";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(
      `/auth/login?callbackUrl=${encodeURIComponent(`${env.NEXT_PUBLIC_BASE_URL}/admin/dashboard`)}`
    );
  }

  if ((session?.user as IProfile)?.role !== "admin") {
    redirect("/");
  }

  const { user } = session;
  return (
    <SidebarProvider>
      <AppSidebar
        type="admin"
        user={
          user as {
            fullName: string;
            email: string;
            avatar: string | null;
          }
        }
      />
      <SidebarInset>
        <DashboardHeader title="Admin Area" />
        {/* Content Dashboard */}
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
