import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Users, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24">
        {/* Hero Section */}
        <div className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Connecting Stories with Storytellers
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              SnapBook was founded on the belief that every moment deserves to be captured beautifully. 
              We connect you with talented photographers who understand that your special occasions 
              are more than just events—they're the chapters of your life story.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                To make professional photography accessible to everyone, while empowering photographers 
                to build thriving businesses doing what they love.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera className="h-8 w-8 text-accent-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Quality First</h3>
                  <p className="text-muted-foreground">
                    Every photographer is carefully vetted to ensure exceptional quality and professionalism.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-accent-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Community</h3>
                  <p className="text-muted-foreground">
                    Building a supportive community where photographers and clients connect meaningfully.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-accent-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                  <p className="text-muted-foreground">
                    Continuously improving our platform to deliver the best experience for everyone.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-8 w-8 text-accent-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Passion</h3>
                  <p className="text-muted-foreground">
                    Driven by love for photography and the joy of preserving life's precious moments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Growing Together
              </h2>
              <p className="text-lg text-muted-foreground">
                Since our launch, we've helped thousands of people capture their most important moments
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">500+</div>
                <div className="text-muted-foreground">Professional Photographers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">10k+</div>
                <div className="text-muted-foreground">Events Captured</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">50+</div>
                <div className="text-muted-foreground">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">98%</div>
                <div className="text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Capture Your Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of satisfied clients who have found their perfect photographer through SnapBook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Find a Photographer
              </Button>
              <Button variant="premium" size="lg">
                Join as Photographer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;