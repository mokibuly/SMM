import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  ChevronDown,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ServiceCatalog from "@/components/ServiceCatalog";
import OrderHistory from "@/components/OrderHistory";
import AdminPanel from "@/components/AdminPanel";

interface DashboardProps {
  userRole?: "user" | "admin";
  userName?: string;
}

const Dashboard = ({
  userRole = "user",
  userName = "John Doe",
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("services");
  const isAdmin = userRole === "admin";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-primary">Studio-Promote</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Button
                variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === "services" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("services")}
              >
                <Package className="mr-2 h-4 w-4" />
                Services
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === "orders" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Home className="mr-2 h-4 w-4" />
                Orders
              </Button>
            </li>
            {isAdmin && (
              <li>
                <Button
                  variant={activeTab === "admin" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("admin")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Panel
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card p-4 flex justify-between items-center">
          <div className="md:hidden">
            <h2 className="text-xl font-bold text-primary">Studio-Promote</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                      alt={userName}
                    />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">{userName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Active Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-muted-foreground">+2 from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completed Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">284</p>
                  <p className="text-muted-foreground">+24 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$1,284.50</p>
                  <p className="text-muted-foreground">+$350 this month</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "services" && <ServiceCatalog />}

          {activeTab === "orders" && <OrderHistory userRole={userRole} />}

          {activeTab === "admin" && isAdmin && <AdminPanel />}
        </main>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t bg-card p-2">
          <div className="grid grid-cols-4 gap-1">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className="flex flex-col items-center justify-center py-2"
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </Button>
            <Button
              variant={activeTab === "services" ? "secondary" : "ghost"}
              className="flex flex-col items-center justify-center py-2"
              onClick={() => setActiveTab("services")}
            >
              <Package className="h-5 w-5" />
              <span className="text-xs mt-1">Services</span>
            </Button>
            <Button
              variant={activeTab === "orders" ? "secondary" : "ghost"}
              className="flex flex-col items-center justify-center py-2"
              onClick={() => setActiveTab("orders")}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Orders</span>
            </Button>
            {isAdmin && (
              <Button
                variant={activeTab === "admin" ? "secondary" : "ghost"}
                className="flex flex-col items-center justify-center py-2"
                onClick={() => setActiveTab("admin")}
              >
                <Settings className="h-5 w-5" />
                <span className="text-xs mt-1">Admin</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
