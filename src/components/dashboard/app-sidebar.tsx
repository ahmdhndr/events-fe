"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import {
  CiBookmark,
  CiGrid41,
  CiSettings,
  CiShoppingTag,
  CiViewList,
  CiWallet,
} from "react-icons/ci";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import NavSide from "./nav-side";
import NavUser from "./nav-user";

// This is sample data.
const data = {
  navMember: [
    {
      title: "Dashboard",
      url: "/member/dashboard",
      icon: CiGrid41,
    },
    {
      title: "Transaction",
      url: "/member/transaction",
      icon: CiWallet,
    },
    {
      title: "Setting",
      url: "/member/setting",
      icon: CiSettings,
    },
  ],
  navAdmin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: CiGrid41,
    },
    {
      title: "Event",
      url: "/admin/event",
      icon: CiViewList,
    },
    {
      title: "Category",
      url: "/admin/category",
      icon: CiShoppingTag,
    },
    {
      title: "Banner",
      url: "/admin/banner",
      icon: CiBookmark,
    },
  ],
};

interface AppSidebarProp {
  props?: React.ComponentProps<typeof Sidebar>;
  type: "admin" | "member";
  user: {
    fullName: string;
    email: string;
    avatar: string | null;
  };
}

export function AppSidebar({ type, user, ...props }: AppSidebarProp) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-fit data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src={"/images/general/logo.svg"}
                  alt="Logo"
                  width={100}
                  height={100}
                  quality={70}
                  className="h-full object-cover object-center"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {type === "admin" ? (
          <NavSide items={data.navAdmin} groupTitle="Admin" />
        ) : (
          <NavSide items={data.navMember} groupTitle="Member" />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
