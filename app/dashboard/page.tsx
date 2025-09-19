"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  VolunteerDataTable,
  Volunteer,
} from "@/components/volunteer-data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [users, setUsers] = React.useState<Volunteer[]>([]);

  async function getUsers(page = 1, limit = 20) {
    // The API endpoint is not implemented yet, so we are using mock data
    // const res = await fetch(`/api/users?page=${page}&limit=${limit}`);
    // const data = await res.json();
    fetch("/api/users?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data || []);
      });

    // setUsers(data);
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
              <Button onClick={() => getUsers()}>获取用户</Button>
              {/*<SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>*/}
              <VolunteerDataTable data={users} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
