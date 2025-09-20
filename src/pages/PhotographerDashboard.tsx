import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, LogOut, Bell, Calendar, DollarSign, User, Image, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import PhotographerProfile from "@/components/PhotographerProfile";
import PhotographerPortfolio from "@/components/PhotographerPortfolio";
import PhotographerPricing from "@/components/PhotographerPricing";
import PhotographerAvailability from "@/components/PhotographerAvailability";
import PhotographerBookings from "@/components/PhotographerBookings";

const PhotographerDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, type: "booking", message: "New booking request for Wedding Photography", time: "2 hours ago" },
    { id: 2, type: "message", message: "Sarah M. sent you a message", time: "4 hours ago" },
    { id: 3, type: "booking", message: "Booking confirmed for Corporate Event", time: "1 day ago" }
  ]);

  useEffect(() => {
    // Check if photographer is logged in
    const isLoggedIn = localStorage.getItem("photographer_logged_in");
    if (!isLoggedIn) {
      navigate("/photographer/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("photographer_logged_in");
    localStorage.removeItem("photographer_id");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary rounded-lg">
              <Camera className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">SnapBook Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your photography business</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Views</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 unread</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center">
              <Image className="h-4 w-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Bookings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <PhotographerProfile />
          </TabsContent>
          
          <TabsContent value="portfolio" className="space-y-4">
            <PhotographerPortfolio />
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-4">
            <PhotographerPricing />
          </TabsContent>
          
          <TabsContent value="availability" className="space-y-4">
            <PhotographerAvailability />
          </TabsContent>
          
          <TabsContent value="bookings" className="space-y-4">
            <PhotographerBookings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PhotographerDashboard;