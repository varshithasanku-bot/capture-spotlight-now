import Navbar from "@/components/Navbar";
import PhotographerCard from "@/components/PhotographerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";
import photographer1 from "@/assets/photographer-1.jpg";
import photographer2 from "@/assets/photographer-2.jpg";
import photographer3 from "@/assets/photographer-3.jpg";

const mockPhotographers = [
  {
    id: "1",
    name: "Emma Rodriguez",
    image: photographer1,
    specialties: ["Weddings", "Portraits", "Couples"],
    location: "Los Angeles, CA",
    rating: 4.9,
    reviewCount: 127,
    startingPrice: 800,
    featured: true
  },
  {
    id: "2",
    name: "Marcus Chen", 
    image: photographer2,
    specialties: ["Corporate", "Events", "Headshots"],
    location: "San Francisco, CA",
    rating: 4.8,
    reviewCount: 89,
    startingPrice: 600
  },
  {
    id: "3",
    name: "Sofia Martinez",
    image: photographer3,
    specialties: ["Lifestyle", "Family", "Newborn"],
    location: "Austin, TX", 
    rating: 4.9,
    reviewCount: 156,
    startingPrice: 550
  },
  {
    id: "4",
    name: "David Kim",
    image: photographer1,
    specialties: ["Fashion", "Commercial", "Editorial"],
    location: "New York, NY",
    rating: 4.7,
    reviewCount: 203,
    startingPrice: 1200
  },
  {
    id: "5",
    name: "Luna Thompson",
    image: photographer2,
    specialties: ["Nature", "Travel", "Adventure"],
    location: "Denver, CO",
    rating: 4.8,
    reviewCount: 94,
    startingPrice: 450
  },
  {
    id: "6",
    name: "Alex Johnson",
    image: photographer3,
    specialties: ["Music", "Concert", "Entertainment"],
    location: "Nashville, TN",
    rating: 4.6,
    reviewCount: 67,
    startingPrice: 700
  }
];

const specialtyFilters = [
  "All", "Weddings", "Corporate", "Family", "Fashion", "Events", "Portraits"
];

const Photographers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-24 pb-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Photographer
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our curated collection of professional photographers
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search photographers, styles, or locations..." 
                className="pl-10 h-12"
              />
            </div>
            <div className="relative lg:w-64">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Location" 
                className="pl-10 h-12"
              />
            </div>
            <Button variant="premium" size="lg" className="lg:w-auto">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Specialty Filters */}
          <div className="flex flex-wrap gap-2">
            {specialtyFilters.map((specialty) => (
              <Badge 
                key={specialty}
                variant={specialty === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-accent-gold hover:text-accent-gold-foreground transition-colors"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              Showing {mockPhotographers.length} photographers
            </p>
            <select className="border border-border rounded-md px-3 py-2 bg-background">
              <option>Sort by Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
              <option>Most Reviews</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPhotographers.map((photographer) => (
              <PhotographerCard
                key={photographer.id}
                {...photographer}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="premium" size="lg">
              Load More Photographers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photographers;