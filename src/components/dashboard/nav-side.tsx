"use client";

import { IconType } from "react-icons/lib";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupTitle}</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon size={50} />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
