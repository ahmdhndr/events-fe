"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconType } from "react-icons/lib";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface PropTypes {
  items: {
    title: string;
    url: string;
    icon?: IconType;
  }[];
  groupTitle: string;
}

export default function NavSide({ items, groupTitle }: PropTypes) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupTitle}</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="text-sm font-normal hover:bg-primary hover:text-white data-[active=true]:bg-primary data-[active=true]:text-white"
                tooltip={item.title}
                asChild
                isActive={pathname === item.url}
              >
                <Link href={item.url} onClick={() => setOpenMobile(false)}>
                  {item.icon && <item.icon size={50} />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
