import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-photography.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Capture Your Perfect Moment
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Connect with professional photographers for weddings, events, and special occasions. 
          Find the perfect artist to tell your story.
        </p>

        {/* Search Section */}
        <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Event type (wedding, birthday...)" 
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Location" 
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Date" 
                type="date"
                className="pl-10 h-12"
              />
            </div>
          </div>
          <Button variant="hero" size="lg" className="w-full md:w-auto px-12">
            Find Photographers
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-2xl md:text-3xl font-bold">500+</div>
            <div className="text-sm opacity-90">Photographers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">10k+</div>
            <div className="text-sm opacity-90">Events Captured</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">98%</div>
            <div className="text-sm opacity-90">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;