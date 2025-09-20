import PhotographerCard from "./PhotographerCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
    startingPrice: 600,
    featured: true
  },
  {
    id: "3",
    name: "Sofia Martinez",
    image: photographer3,
    specialties: ["Lifestyle", "Family", "Newborn"],
    location: "Austin, TX",
    rating: 4.9,
    reviewCount: 156,
    startingPrice: 550,
    featured: true
  }
];

const FeaturedPhotographers = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Photographers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our top-rated photographers who consistently deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockPhotographers.map((photographer) => (
            <PhotographerCard
              key={photographer.id}
              {...photographer}
            />
          ))}
        </div>

        <div className="text-center">
          <Button variant="premium" size="lg" asChild>
            <Link to="/photographers">
              View All Photographers
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPhotographers;