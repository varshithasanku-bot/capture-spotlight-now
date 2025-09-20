import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPhotographers from "@/components/FeaturedPhotographers";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedPhotographers />
    </div>
  );
};

export default Index;
