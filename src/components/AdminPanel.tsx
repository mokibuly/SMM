import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  LineChart,
  PieChart,
  Users,
  Package,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  deliveryTime: string;
  status: "active" | "inactive";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  joinDate: string;
  avatar?: string;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  serviceName: string;
  date: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  price: number;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);

  // Mock data
  const services: Service[] = [
    {
      id: "1",
      name: "Instagram Followers",
      category: "Instagram",
      price: 5.99,
      deliveryTime: "1-2 days",
      status: "active",
    },
    {
      id: "2",
      name: "Facebook Likes",
      category: "Facebook",
      price: 3.99,
      deliveryTime: "24 hours",
      status: "active",
    },
    {
      id: "3",
      name: "YouTube Views",
      category: "YouTube",
      price: 10.99,
      deliveryTime: "3-4 days",
      status: "inactive",
    },
    {
      id: "4",
      name: "TikTok Followers",
      category: "TikTok",
      price: 7.99,
      deliveryTime: "2-3 days",
      status: "active",
    },
    {
      id: "5",
      name: "Twitter Retweets",
      category: "Twitter",
      price: 4.99,
      deliveryTime: "1 day",
      status: "active",
    },
  ];

  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-01-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      status: "active",
      joinDate: "2023-02-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "user",
      status: "suspended",
      joinDate: "2023-03-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-04-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-05-12",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
  ];

  const orders: Order[] = [
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      serviceName: "Instagram Followers",
      date: "2023-06-10",
      status: "completed",
      price: 5.99,
    },
    {
      id: "2",
      userId: "4",
      userName: "Sarah Williams",
      serviceName: "Facebook Likes",
      date: "2023-06-12",
      status: "in-progress",
      price: 3.99,
    },
    {
      id: "3",
      userId: "3",
      userName: "Mike Johnson",
      serviceName: "YouTube Views",
      date: "2023-06-15",
      status: "pending",
      price: 10.99,
    },
    {
      id: "4",
      userId: "5",
      userName: "David Brown",
      serviceName: "TikTok Followers",
      date: "2023-06-18",
      status: "cancelled",
      price: 7.99,
    },
    {
      id: "5",
      userId: "1",
      userName: "John Doe",
      serviceName: "Twitter Retweets",
      date: "2023-06-20",
      status: "pending",
      price: 4.99,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <Tabs
        defaultValue="services"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Service Management
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Analytics Dashboard
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Order Management
          </TabsTrigger>
        </TabsList>

        {/* Services Management Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>
                  Add, edit, or remove services from your catalog.
                </CardDescription>
              </div>
              <Dialog
                open={serviceDialogOpen}
                onOpenChange={setServiceDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new service to your catalog.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Name
                      </label>
                      <Input
                        id="name"
                        className="col-span-3"
                        placeholder="Service name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="category" className="text-right">
                        Category
                      </label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="price" className="text-right">
                        Price ($)
                      </label>
                      <Input
                        id="price"
                        type="number"
                        className="col-span-3"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="delivery" className="text-right">
                        Delivery Time
                      </label>
                      <Input
                        id="delivery"
                        className="col-span-3"
                        placeholder="e.g. 1-2 days"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setServiceDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setServiceDialogOpen(false)}>
                      Save Service
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search services..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Delivery Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        {service.name}
                      </TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>${service.price.toFixed(2)}</TableCell>
                      <TableCell>{service.deliveryTime}</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(service.status)}
                          variant="outline"
                        >
                          {service.status.charAt(0).toUpperCase() +
                            service.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : ""
                          }
                        >
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(user.status)}
                          variant="outline"
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Dashboard Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Monthly revenue and order trends
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-16 w-16 mx-auto mb-2" />
                  <p>Sales chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
                <CardDescription>
                  Most popular services by sales
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="h-16 w-16 mx-auto mb-2" />
                  <p>Service performance chart would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                  New registrations and active users
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-16 w-16 mx-auto mb-2" />
                  <p>User activity chart would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Important business metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold">$12,543.00</p>
                    <p className="text-xs text-green-600">
                      ↑ 12% from last month
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-xs text-green-600">
                      ↑ 8% from last month
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">New Users</p>
                    <p className="text-2xl font-bold">356</p>
                    <p className="text-xs text-green-600">
                      ↑ 15% from last month
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Conversion Rate
                    </p>
                    <p className="text-2xl font-bold">3.2%</p>
                    <p className="text-xs text-red-600">↓ 1% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Order Management Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>
                View and manage customer orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.userName}</TableCell>
                      <TableCell>{order.serviceName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(order.status)}
                          variant="outline"
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select defaultValue={order.status}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
