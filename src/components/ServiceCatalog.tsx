import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  deliveryTime: string;
  popularity: number;
}

interface ServiceCatalogProps {
  services?: Service[];
  onServiceSelect?: (service: Service) => void;
}

const ServiceCatalog = ({
  services = defaultServices,
  onServiceSelect = () => {},
}: ServiceCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = [
    "all",
    ...Array.from(new Set(services.map((service) => service.category))),
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    const matchesPrice =
      service.price >= priceRange[0] && service.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="w-full bg-background p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Service Catalog</h2>
        <p className="text-muted-foreground">
          Browse our comprehensive range of social media marketing services
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-1 md:max-w-xs">
          <div className="flex justify-between mb-2">
            <span className="text-sm">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-4"
          />
        </div>
      </div>

      {/* Service Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Delivery Time
                    </p>
                    <p className="font-medium">{service.deliveryTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Starting at</p>
                    <p className="text-2xl font-bold">${service.price}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-3">
                <Button
                  className="w-full"
                  onClick={() => onServiceSelect(service)}
                >
                  Order Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
    </div>
  );
};

// Default services data for demonstration
const defaultServices: Service[] = [
  {
    id: "1",
    name: "Instagram Followers",
    description:
      "Boost your Instagram profile with real, engaged followers to increase your social proof and reach.",
    category: "instagram",
    price: 9.99,
    deliveryTime: "1-2 days",
    popularity: 95,
  },
  {
    id: "2",
    name: "TikTok Likes",
    description:
      "Increase engagement on your TikTok videos with likes from real users to boost your visibility.",
    category: "tiktok",
    price: 4.99,
    deliveryTime: "Same day",
    popularity: 90,
  },
  {
    id: "3",
    name: "YouTube Views",
    description:
      "Get more views on your YouTube videos to improve rankings and attract organic traffic.",
    category: "youtube",
    price: 19.99,
    deliveryTime: "2-3 days",
    popularity: 85,
  },
  {
    id: "4",
    name: "Facebook Page Likes",
    description:
      "Grow your Facebook page with authentic likes to build credibility and expand your audience.",
    category: "facebook",
    price: 14.99,
    deliveryTime: "3-5 days",
    popularity: 75,
  },
  {
    id: "5",
    name: "Twitter Retweets",
    description:
      "Amplify your Twitter presence with retweets that increase your content reach and engagement.",
    category: "twitter",
    price: 7.99,
    deliveryTime: "1 day",
    popularity: 80,
  },
  {
    id: "6",
    name: "LinkedIn Connections",
    description:
      "Expand your professional network with quality LinkedIn connections to boost your profile visibility.",
    category: "linkedin",
    price: 29.99,
    deliveryTime: "5-7 days",
    popularity: 70,
  },
  {
    id: "7",
    name: "Instagram Comments",
    description:
      "Enhance engagement on your posts with relevant comments that spark conversation.",
    category: "instagram",
    price: 12.99,
    deliveryTime: "2 days",
    popularity: 65,
  },
  {
    id: "8",
    name: "YouTube Subscribers",
    description:
      "Grow your YouTube channel with real subscribers who are interested in your content.",
    category: "youtube",
    price: 49.99,
    deliveryTime: "7-10 days",
    popularity: 85,
  },
  {
    id: "9",
    name: "TikTok Followers",
    description:
      "Build your TikTok audience with followers who engage with your content regularly.",
    category: "tiktok",
    price: 24.99,
    deliveryTime: "3-4 days",
    popularity: 88,
  },
];

export default ServiceCatalog;
