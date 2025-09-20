import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, DollarSign, Clock, Camera, Users } from "lucide-react";
import { toast } from "sonner";

interface PricingPackage {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PhotographerPricing = () => {
  const [packages, setPackages] = useState<PricingPackage[]>([
    {
      id: "1",
      name: "Wedding Essential",
      category: "Wedding",
      price: 1500,
      duration: "6 hours",
      description: "Perfect for intimate weddings and ceremonies",
      features: ["6 hours coverage", "300+ edited photos", "Online gallery", "Print release"],
      isPopular: false
    },
    {
      id: "2",
      name: "Wedding Premium",
      category: "Wedding",
      price: 2500,
      duration: "8 hours",
      description: "Complete wedding day coverage with premium features",
      features: ["8 hours coverage", "500+ edited photos", "Online gallery", "Print release", "Engagement session", "USB drive"],
      isPopular: true
    },
    {
      id: "3",
      name: "Portrait Session",
      category: "Portrait",
      price: 300,
      duration: "1 hour",
      description: "Professional portrait session for individuals or families",
      features: ["1 hour session", "30+ edited photos", "Online gallery", "Print release"],
      isPopular: false
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PricingPackage | null>(null);
  const [newFeature, setNewFeature] = useState("");

  const categories = ["Wedding", "Portrait", "Event", "Corporate", "Family", "Maternity"];

  useEffect(() => {
    // Load pricing packages from localStorage
    const savedPackages = localStorage.getItem("photographer_packages");
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    }
  }, []);

  const savePackages = (updatedPackages: PricingPackage[]) => {
    setPackages(updatedPackages);
    localStorage.setItem("photographer_packages", JSON.stringify(updatedPackages));
  };

  const createNewPackage = () => {
    const newPackage: PricingPackage = {
      id: Date.now().toString(),
      name: "New Package",
      category: "Wedding",
      price: 500,
      duration: "2 hours",
      description: "Package description",
      features: ["Feature 1", "Feature 2"],
      isPopular: false
    };
    setEditingPackage(newPackage);
    setIsEditing(true);
  };

  const editPackage = (packageItem: PricingPackage) => {
    setEditingPackage({ ...packageItem });
    setIsEditing(true);
  };

  const savePackage = () => {
    if (!editingPackage) return;

    const existingIndex = packages.findIndex(p => p.id === editingPackage.id);
    let updatedPackages;

    if (existingIndex >= 0) {
      updatedPackages = packages.map(p => p.id === editingPackage.id ? editingPackage : p);
    } else {
      updatedPackages = [...packages, editingPackage];
    }

    savePackages(updatedPackages);
    setIsEditing(false);
    setEditingPackage(null);
    toast.success("Package saved successfully!");
  };

  const deletePackage = (packageId: string) => {
    const updatedPackages = packages.filter(p => p.id !== packageId);
    savePackages(updatedPackages);
    toast.success("Package deleted!");
  };

  const togglePopular = (packageId: string) => {
    const updatedPackages = packages.map(p => ({
      ...p,
      isPopular: p.id === packageId ? !p.isPopular : false // Only one can be popular
    }));
    savePackages(updatedPackages);
  };

  const addFeature = () => {
    if (!editingPackage || !newFeature.trim()) return;
    
    setEditingPackage({
      ...editingPackage,
      features: [...editingPackage.features, newFeature.trim()]
    });
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    if (!editingPackage) return;
    
    setEditingPackage({
      ...editingPackage,
      features: editingPackage.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pricing Packages</CardTitle>
              <CardDescription>Manage your photography service packages and pricing</CardDescription>
            </div>
            <Button onClick={createNewPackage}>
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {packages.length === 0 ? (
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No packages yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Create your first pricing package to get started</p>
                <Button onClick={createNewPackage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Package
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((packageItem) => (
                <Card key={packageItem.id} className={`relative ${packageItem.isPopular ? 'ring-2 ring-primary' : ''}`}>
                  {packageItem.isPopular && (
                    <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{packageItem.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">{packageItem.category}</Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => editPackage(packageItem)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deletePackage(packageItem.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">${packageItem.price}</div>
                        <div className="text-sm text-muted-foreground">per session</div>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {packageItem.duration}
                      </div>

                      <p className="text-sm text-muted-foreground">{packageItem.description}</p>

                      <div className="space-y-2">
                        {packageItem.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Camera className="h-3 w-3 mr-2 text-primary" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 space-y-2">
                        <Button
                          variant={packageItem.isPopular ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => togglePopular(packageItem.id)}
                        >
                          {packageItem.isPopular ? "Remove Popular" : "Mark as Popular"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Package Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPackage?.id === Date.now().toString() ? "Create New Package" : "Edit Package"}
            </DialogTitle>
            <DialogDescription>
              Configure your package details, pricing, and features
            </DialogDescription>
          </DialogHeader>
          
          {editingPackage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="packageName">Package Name</Label>
                  <Input
                    id="packageName"
                    value={editingPackage.name}
                    onChange={(e) => setEditingPackage({...editingPackage, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={editingPackage.category} 
                    onValueChange={(value) => setEditingPackage({...editingPackage, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingPackage.price}
                    onChange={(e) => setEditingPackage({...editingPackage, price: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={editingPackage.duration}
                    onChange={(e) => setEditingPackage({...editingPackage, duration: e.target.value})}
                    placeholder="e.g., 2 hours, Full day"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingPackage.description}
                  onChange={(e) => setEditingPackage({...editingPackage, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="space-y-2">
                  {editingPackage.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={feature} disabled className="flex-1" />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature..."
                      onKeyPress={(e) => e.key === "Enter" && addFeature()}
                    />
                    <Button onClick={addFeature} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={savePackage}>
                  Save Package
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pricing Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{packages.length}</div>
              <div className="text-sm text-muted-foreground">Active Packages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                ${packages.length > 0 ? Math.round(packages.reduce((sum, p) => sum + p.price, 0) / packages.length) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Average Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                ${packages.length > 0 ? Math.min(...packages.map(p => p.price)) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Starting From</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">87%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotographerPricing;