import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Camera } from "lucide-react";
import { Link } from "react-router-dom";

interface PhotographerCardProps {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  location: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  featured?: boolean;
}

const PhotographerCard = ({
  id,
  name,
  image,
  specialties,
  location,
  rating,
  reviewCount,
  startingPrice,
  featured = false
}: PhotographerCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <Badge className="absolute top-4 left-4 bg-accent-gold text-accent-gold-foreground">
            Featured
          </Badge>
        )}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-4 w-4 text-accent-gold fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">From ${startingPrice}</div>
            <div className="text-sm text-muted-foreground">per session</div>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Camera className="h-4 w-4 mr-1" />
            <span>{reviewCount} reviews</span>
          </div>
          <Button variant="premium" size="sm" asChild>
            <Link to={`/photographer/${id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotographerCard;