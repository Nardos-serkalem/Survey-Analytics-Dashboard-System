"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "Haleta Tech",
      logo: AudioWaveform,
      plan: "Startup",
    }
  ],
  navMain: [
    {
      title: "Reports",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Download PDF",
          url: "#",
        },
        {
          title: "Export CSV",
          url: "#",
        },
      ]
    },
  ]
}

export function AppSidebar({user, ...props }: React.ComponentProps<typeof Sidebar> & {user: any}) {

  return (
    <Sidebar collapsible="icon" {...props} variant="floating">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
