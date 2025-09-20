import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Image as ImageIcon, Plus, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

interface PortfolioImage {
  id: string;
  src: string;
  category: string;
  title: string;
  description: string;
}

const PhotographerPortfolio = () => {
  const [images, setImages] = useState<PortfolioImage[]>([
    {
      id: "1",
      src: "/src/assets/photographer-1.jpg",
      category: "Wedding",
      title: "Romantic Wedding Ceremony",
      description: "Beautiful outdoor wedding ceremony at sunset"
    },
    {
      id: "2", 
      src: "/src/assets/photographer-2.jpg",
      category: "Portrait",
      title: "Professional Headshots",
      description: "Corporate headshot session"
    },
    {
      id: "3",
      src: "/src/assets/photographer-3.jpg",
      category: "Event",
      title: "Corporate Gala",
      description: "Annual company celebration event"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["All", "Wedding", "Portrait", "Event", "Corporate", "Family", "Maternity"];

  useEffect(() => {
    // Load portfolio from localStorage
    const savedPortfolio = localStorage.getItem("photographer_portfolio");
    if (savedPortfolio) {
      setImages(JSON.parse(savedPortfolio));
    }
  }, []);

  const savePortfolio = (updatedImages: PortfolioImage[]) => {
    setImages(updatedImages);
    localStorage.setItem("photographer_portfolio", JSON.stringify(updatedImages));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);

    // Mock upload process
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          const newImage: PortfolioImage = {
            id: Date.now().toString() + index,
            src: e.target?.result as string,
            category: "Wedding", // Default category
            title: file.name.split('.')[0],
            description: "New portfolio image"
          };
          
          const updatedImages = [...images, newImage];
          savePortfolio(updatedImages);
          
          if (index === files.length - 1) {
            setIsUploading(false);
            toast.success(`${files.length} image(s) uploaded successfully!`);
          }
        }, 500 * (index + 1)); // Simulate upload delay
      };
      reader.readAsDataURL(file);
    });
  };

  const updateImageCategory = (imageId: string, category: string) => {
    const updatedImages = images.map(img => 
      img.id === imageId ? { ...img, category } : img
    );
    savePortfolio(updatedImages);
    toast.success("Category updated!");
  };

  const deleteImage = (imageId: string) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    savePortfolio(updatedImages);
    toast.success("Image deleted!");
  };

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Management</CardTitle>
              <CardDescription>Upload and organize your photography portfolio</CardDescription>
            </div>
            <div className="flex gap-2">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </span>
                </Button>
              </Label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                {category !== "All" && (
                  <Badge variant="secondary" className="ml-2">
                    {images.filter(img => img.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Upload Status */}
          {isUploading && (
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-primary/20 rounded-lg mb-6">
              <div className="text-center">
                <Upload className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-muted-foreground">Uploading images...</p>
              </div>
            </div>
          )}

          {/* Image Grid */}
          {filteredImages.length === 0 ? (
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
              <div className="text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No images found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedCategory === "All" 
                    ? "Upload your first portfolio images to get started" 
                    : `No images in ${selectedCategory} category`}
                </p>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Images
                  </Button>
                </Label>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="relative group">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{image.title}</DialogTitle>
                            <DialogDescription>{image.description}</DialogDescription>
                          </DialogHeader>
                          <img 
                            src={image.src} 
                            alt={image.title}
                            className="w-full max-h-[70vh] object-contain rounded-lg"
                          />
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteImage(image.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-2">{image.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{image.description}</p>
                    <Select 
                      value={image.category} 
                      onValueChange={(value) => updateImageCategory(image.id, value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== "All").map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Portfolio Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{images.length}</div>
                <div className="text-sm text-muted-foreground">Total Images</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {categories.filter(cat => cat !== "All" && images.some(img => img.category === cat)).length}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">1,234</div>
                <div className="text-sm text-muted-foreground">Portfolio Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">89%</div>
                <div className="text-sm text-muted-foreground">Profile Completion</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotographerPortfolio;