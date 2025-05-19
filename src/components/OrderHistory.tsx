import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDown, ChevronUp, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OrderHistoryProps {
  isAdmin?: boolean;
  orders?: Order[];
}

interface Order {
  id: string;
  serviceName: string;
  date: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  price: number;
  details?: string;
  progress?: number;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  isAdmin = false,
  orders: initialOrders,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Default orders if none provided
  const defaultOrders: Order[] = [
    {
      id: "ORD-1234",
      serviceName: "Instagram Followers",
      date: "2023-06-15",
      status: "completed",
      price: 29.99,
      details: "1000 followers delivered to @username",
      progress: 100,
    },
    {
      id: "ORD-2345",
      serviceName: "YouTube Views",
      date: "2023-06-18",
      status: "in-progress",
      price: 49.99,
      details: "5000 views for video ID: xyz123",
      progress: 65,
    },
    {
      id: "ORD-3456",
      serviceName: "TikTok Likes",
      date: "2023-06-20",
      status: "pending",
      price: 19.99,
      details: "2000 likes for post ID: abc456",
      progress: 0,
    },
    {
      id: "ORD-4567",
      serviceName: "Facebook Page Likes",
      date: "2023-06-22",
      status: "cancelled",
      price: 39.99,
      details: "3000 page likes for Page: Business Name",
      progress: 0,
    },
    {
      id: "ORD-5678",
      serviceName: "Twitter Retweets",
      date: "2023-06-25",
      status: "completed",
      price: 24.99,
      details: "500 retweets for tweet ID: def789",
      progress: 100,
    },
  ];

  const orders = initialOrders || defaultOrders;

  const toggleOrderExpansion = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      case "pending":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const updateOrderStatus = (
    orderId: string,
    newStatus: "pending" | "in-progress" | "completed" | "cancelled",
  ) => {
    // This would be replaced with an actual API call in a real implementation
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  const handleRefund = (orderId: string) => {
    // This would be replaced with an actual refund process in a real implementation
    console.log(`Processing refund for order ${orderId}`);
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        {isAdmin ? "All Orders" : "Your Order History"}
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or service name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableCaption>A list of your recent orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.serviceName}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${order.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleOrderExpansion(order.id)}
                        aria-label={
                          expandedOrderId === order.id
                            ? "Collapse details"
                            : "Expand details"
                        }
                      >
                        {expandedOrderId === order.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedOrderId === order.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-muted/50 p-0">
                        <Card className="border-0 shadow-none">
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-1">
                                  Order Details
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {order.details}
                                </p>
                              </div>

                              {order.status === "in-progress" && (
                                <div>
                                  <h4 className="font-medium mb-1">Progress</h4>
                                  <div className="w-full bg-muted rounded-full h-2.5">
                                    <div
                                      className="bg-primary h-2.5 rounded-full"
                                      style={{ width: `${order.progress}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {order.progress}% complete
                                  </p>
                                </div>
                              )}

                              {isAdmin && (
                                <div className="flex flex-wrap gap-2">
                                  <Select
                                    defaultValue={order.status}
                                    onValueChange={(value) =>
                                      updateOrderStatus(order.id, value as any)
                                    }
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">
                                        Pending
                                      </SelectItem>
                                      <SelectItem value="in-progress">
                                        In Progress
                                      </SelectItem>
                                      <SelectItem value="completed">
                                        Completed
                                      </SelectItem>
                                      <SelectItem value="cancelled">
                                        Cancelled
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRefund(order.id)}
                                  >
                                    Process Refund
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No orders found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default OrderHistory;
