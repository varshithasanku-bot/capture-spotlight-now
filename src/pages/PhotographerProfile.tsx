import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Camera, Award, Users, CheckCircle } from "lucide-react";
import photographer1 from "@/assets/photographer-1.jpg";

const PhotographerProfile = () => {
  const { id } = useParams();
  
  // Mock data - in real app this would come from API based on id
  const photographer = {
    name: "Emma Rodriguez",
    image: photographer1,
    specialties: ["Weddings", "Portraits", "Couples"],
    location: "Los Angeles, CA",
    rating: 4.9,
    reviewCount: 127,
    bio: "With over 8 years of experience capturing life's most precious moments, I specialize in creating timeless, romantic imagery that tells your unique story. My approach combines photojournalistic style with fine art techniques to deliver stunning results.",
    experience: 8,
    eventsCompleted: 200,
    packages: [
      {
        name: "Essential",
        price: 800,
        duration: "4 hours",
        photos: "50-75 edited photos",
        features: ["Online gallery", "High-resolution downloads", "Basic retouching"]
      },
      {
        name: "Premium", 
        price: 1200,
        duration: "6 hours",
        photos: "100-150 edited photos",
        features: ["Online gallery", "High-resolution downloads", "Advanced retouching", "USB drive", "Print release"]
      },
      {
        name: "Luxury",
        price: 1800,
        duration: "8 hours",
        photos: "200+ edited photos", 
        features: ["Online gallery", "High-resolution downloads", "Advanced retouching", "USB drive", "Print release", "Engagement session", "Second photographer"]
      }
    ],
    portfolio: [
      photographer1, photographer1, photographer1, photographer1, photographer1, photographer1
    ],
    reviews: [
      {
        name: "Sarah & Michael",
        rating: 5,
        text: "Emma captured our wedding day perfectly! Her attention to detail and ability to make us feel comfortable resulted in the most beautiful photos we could have imagined.",
        event: "Wedding"
      },
      {
        name: "Jennifer L.",
        rating: 5, 
        text: "Professional, creative, and so easy to work with. The family portraits turned out amazing and our kids actually enjoyed the photo session!",
        event: "Family Portraits"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24">
        {/* Hero Section */}
        <div className="bg-muted/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Photographer Info */}
              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src={photographer.image}
                    alt={photographer.name}
                    className="w-48 h-48 object-cover rounded-2xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="text-3xl font-bold text-foreground">{photographer.name}</h1>
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-accent-gold fill-current mr-1" />
                        <span className="font-semibold">{photographer.rating}</span>
                        <span className="text-muted-foreground ml-1">({photographer.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {photographer.location}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {photographer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6">{photographer.bio}</p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Award className="h-5 w-5 text-accent-gold" />
                        </div>
                        <div className="font-semibold">{photographer.experience} Years</div>
                        <div className="text-sm text-muted-foreground">Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Camera className="h-5 w-5 text-accent-gold" />
                        </div>
                        <div className="font-semibold">{photographer.eventsCompleted}+</div>
                        <div className="text-sm text-muted-foreground">Events</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-5 w-5 text-accent-gold" />
                        </div>
                        <div className="font-semibold">{photographer.reviewCount}</div>
                        <div className="text-sm text-muted-foreground">Happy Clients</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                    <div className="space-y-4">
                      <Button variant="hero" className="w-full" size="lg">
                        <Calendar className="h-5 w-5 mr-2" />
                        Check Availability
                      </Button>
                      <Button variant="premium" className="w-full" size="lg">
                        Send Message
                      </Button>
                      <div className="text-center pt-2">
                        <div className="text-sm text-muted-foreground">Starting from</div>
                        <div className="text-2xl font-bold text-foreground">${photographer.packages[0].price}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Portfolio</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photographer.portfolio.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Packages & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {photographer.packages.map((pkg, index) => (
                <Card key={index} className={index === 1 ? "border-accent-gold scale-105" : ""}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-accent-gold mb-4">${pkg.price}</div>
                    <div className="space-y-2 mb-6">
                      <div className="font-medium">{pkg.duration}</div>
                      <div className="text-muted-foreground">{pkg.photos}</div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant={index === 1 ? "hero" : "premium"} className="w-full">
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {photographer.reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="text-sm text-muted-foreground">{review.event}</div>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-accent-gold fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerProfile;