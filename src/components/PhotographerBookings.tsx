import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Calendar, DollarSign, User, Mail, Phone, MapPin, Camera, CheckCircle, XCircle, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { format, addDays } from "date-fns";

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: Date;
  eventLocation: string;
  package: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
  createdAt: Date;
  messages: Message[];
}

interface Message {
  id: string;
  sender: "client" | "photographer";
  content: string;
  timestamp: Date;
}

const PhotographerBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock booking data
  const mockBookings: Booking[] = [
    {
      id: "1",
      clientName: "Sarah Johnson",
      clientEmail: "sarah.j@email.com",
      clientPhone: "+1 (555) 123-4567",
      eventType: "Wedding",
      eventDate: addDays(new Date(), 14),
      eventLocation: "Central Park, New York",
      package: "Wedding Premium",
      price: 2500,
      status: "pending",
      notes: "Outdoor ceremony, reception until 11pm. Need drone shots.",
      createdAt: addDays(new Date(), -2),
      messages: [
        {
          id: "1",
          sender: "client",
          content: "Hi! I'm interested in booking you for our wedding on the 15th. Do you have availability?",
          timestamp: addDays(new Date(), -2)
        },
        {
          id: "2",
          sender: "photographer",
          content: "Hello Sarah! Congratulations on your engagement! Yes, I have availability for that date. I'd love to discuss your vision for the day.",
          timestamp: addDays(new Date(), -1)
        }
      ]
    },
    {
      id: "2",
      clientName: "Mike Thompson",
      clientEmail: "mike.t@email.com",
      clientPhone: "+1 (555) 987-6543",
      eventType: "Corporate Event",
      eventDate: addDays(new Date(), 7),
      eventLocation: "Downtown Conference Center",
      package: "Corporate Event",
      price: 800,
      status: "confirmed",
      notes: "Annual company meeting, need headshots of executives.",
      createdAt: addDays(new Date(), -5),
      messages: [
        {
          id: "1",
          sender: "client",
          content: "We need professional photography for our annual meeting. Can you handle both event coverage and individual headshots?",
          timestamp: addDays(new Date(), -5)
        }
      ]
    },
    {
      id: "3",
      clientName: "Emily Chen",
      clientEmail: "emily.c@email.com",
      clientPhone: "+1 (555) 456-7890",
      eventType: "Family Portrait",
      eventDate: addDays(new Date(), -10),
      eventLocation: "Brooklyn Bridge Park",
      package: "Portrait Session",
      price: 300,
      status: "completed",
      notes: "Family of 4, golden hour session requested.",
      createdAt: addDays(new Date(), -15),
      messages: []
    }
  ];

  useEffect(() => {
    // Load bookings from localStorage and merge with mock data
    const savedBookings = localStorage.getItem("photographer_bookings");
    const loadedBookings = savedBookings ? JSON.parse(savedBookings) : [];
    
    // Convert date strings back to Date objects
    const parsedBookings = loadedBookings.map((booking: any) => ({
      ...booking,
      eventDate: new Date(booking.eventDate),
      createdAt: new Date(booking.createdAt),
      messages: booking.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }));

    setBookings([...parsedBookings, ...mockBookings]);
  }, []);

  const updateBookingStatus = (bookingId: string, status: Booking["status"]) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    
    // Save non-mock bookings
    const userBookings = updatedBookings.filter(booking => 
      !mockBookings.some(mock => mock.id === booking.id)
    );
    localStorage.setItem("photographer_bookings", JSON.stringify(userBookings));
    
    toast.success(`Booking ${status}!`);
  };

  const sendMessage = () => {
    if (!selectedBooking || !replyMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "photographer",
      content: replyMessage,
      timestamp: new Date()
    };

    const updatedBooking = {
      ...selectedBooking,
      messages: [...selectedBooking.messages, newMessage]
    };

    const updatedBookings = bookings.map(booking =>
      booking.id === selectedBooking.id ? updatedBooking : booking
    );

    setBookings(updatedBookings);
    setSelectedBooking(updatedBooking);
    setReplyMessage("");
    
    // Save non-mock bookings
    const userBookings = updatedBookings.filter(booking => 
      !mockBookings.some(mock => mock.id === booking.id)
    );
    localStorage.setItem("photographer_bookings", JSON.stringify(userBookings));
    
    toast.success("Message sent!");
  };

  const openBookingDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending": return "secondary";
      case "confirmed": return "default";
      case "completed": return "outline";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const filteredBookings = activeTab === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);

  const stats = {
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    completed: bookings.filter(b => b.status === "completed").length,
    totalRevenue: bookings.filter(b => b.status === "completed").reduce((sum, b) => sum + b.price, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending Requests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.confirmed}</div>
            <div className="text-sm text-muted-foreground">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">${stats.totalRevenue}</div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Bookings & Messages
          </CardTitle>
          <CardDescription>Manage your booking requests and client communications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({stats.confirmed})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {activeTab === "all" ? "No bookings yet" : `No ${activeTab} bookings`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <Card key={booking.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold">{booking.clientName}</h3>
                                <Badge variant={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                                {booking.messages.length > 0 && (
                                  <Badge variant="outline">
                                    {booking.messages.length} message{booking.messages.length !== 1 ? "s" : ""}
                                  </Badge>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Camera className="h-4 w-4 mr-2" />
                                  {booking.eventType} - {booking.package}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {format(booking.eventDate, "MMM d, yyyy")}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {booking.eventLocation}
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  ${booking.price}
                                </div>
                              </div>
                              {booking.notes && (
                                <p className="text-sm text-muted-foreground mt-2 italic">
                                  "{booking.notes}"
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openBookingDialog(booking)}
                            >
                              View Details
                            </Button>
                            {booking.status === "pending" && (
                              <div className="flex space-x-1">
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Accept
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Decline
                                </Button>
                              </div>
                            )}
                            {booking.status === "confirmed" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, "completed")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {selectedBooking?.clientName}
            </DialogTitle>
            <DialogDescription>
              {selectedBooking?.eventType} • {selectedBooking && format(selectedBooking.eventDate, "MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              {/* Booking Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {selectedBooking.clientEmail}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {selectedBooking.clientPhone}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    ${selectedBooking.price}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {selectedBooking.eventLocation}
                  </div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Event Notes</h4>
                  <p className="text-sm">{selectedBooking.notes}</p>
                </div>
              )}

              {/* Messages */}
              <div className="space-y-4">
                <h4 className="font-medium">Messages</h4>
                {selectedBooking.messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No messages yet</p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedBooking.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === "photographer" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === "photographer" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {format(message.timestamp, "MMM d, h:mm a")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reply Box */}
                <div className="flex space-x-2">
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    rows={2}
                  />
                  <Button onClick={sendMessage} disabled={!replyMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Status Actions */}
              {selectedBooking.status === "pending" && (
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, "cancelled");
                      setIsDialogOpen(false);
                    }}
                  >
                    Decline Booking
                  </Button>
                  <Button 
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, "confirmed");
                      setIsDialogOpen(false);
                    }}
                  >
                    Accept Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotographerBookings;