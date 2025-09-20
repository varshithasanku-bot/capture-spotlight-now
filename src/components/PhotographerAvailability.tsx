import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { format, addDays, isSameDay, isAfter, isBefore } from "date-fns";

interface TimeSlot {
  start: string;
  end: string;
}

interface AvailabilitySlot {
  id: string;
  date: Date;
  status: "available" | "booked" | "blocked";
  timeSlots: TimeSlot[];
  notes?: string;
  bookingInfo?: {
    clientName: string;
    eventType: string;
    package: string;
  };
}

const PhotographerAvailability = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);
  const [calendarMode, setCalendarMode] = useState<"month" | "range">("month");

  // Mock booking data
  const mockBookings: AvailabilitySlot[] = [
    {
      id: "1",
      date: addDays(new Date(), 3),
      status: "booked",
      timeSlots: [{ start: "10:00", end: "18:00" }],
      bookingInfo: {
        clientName: "Sarah & Mike",
        eventType: "Wedding",
        package: "Wedding Premium"
      }
    },
    {
      id: "2",
      date: addDays(new Date(), 7),
      status: "booked",
      timeSlots: [{ start: "14:00", end: "17:00" }],
      bookingInfo: {
        clientName: "Johnson Family",
        eventType: "Family Portrait",
        package: "Portrait Session"
      }
    }
  ];

  useEffect(() => {
    // Load availability from localStorage and merge with mock bookings
    const savedAvailability = localStorage.getItem("photographer_availability");
    const loadedAvailability = savedAvailability ? JSON.parse(savedAvailability) : [];
    
    // Convert date strings back to Date objects
    const parsedAvailability = loadedAvailability.map((slot: any) => ({
      ...slot,
      date: new Date(slot.date)
    }));

    // Merge with mock bookings
    const allSlots = [...parsedAvailability, ...mockBookings];
    setAvailability(allSlots);
  }, []);

  const saveAvailability = (updatedAvailability: AvailabilitySlot[]) => {
    // Filter out mock bookings before saving
    const userAvailability = updatedAvailability.filter(slot => 
      !mockBookings.some(mock => mock.id === slot.id)
    );
    
    setAvailability(updatedAvailability);
    localStorage.setItem("photographer_availability", JSON.stringify(userAvailability));
  };

  const getDateStatus = (date: Date) => {
    const slot = availability.find(slot => isSameDay(slot.date, date));
    return slot?.status || "unavailable";
  };

  const createAvailabilitySlot = () => {
    if (!selectedDate) return;

    const newSlot: AvailabilitySlot = {
      id: Date.now().toString(),
      date: selectedDate,
      status: "available",
      timeSlots: [{ start: "09:00", end: "17:00" }],
      notes: ""
    };

    setEditingSlot(newSlot);
    setIsDialogOpen(true);
  };

  const editAvailabilitySlot = (slot: AvailabilitySlot) => {
    setEditingSlot({ ...slot });
    setIsDialogOpen(true);
  };

  const saveSlot = () => {
    if (!editingSlot) return;

    const existingIndex = availability.findIndex(slot => slot.id === editingSlot.id);
    let updatedAvailability;

    if (existingIndex >= 0) {
      updatedAvailability = availability.map(slot => 
        slot.id === editingSlot.id ? editingSlot : slot
      );
    } else {
      updatedAvailability = [...availability, editingSlot];
    }

    saveAvailability(updatedAvailability);
    setIsDialogOpen(false);
    setEditingSlot(null);
    toast.success("Availability updated successfully!");
  };

  const deleteSlot = (slotId: string) => {
    // Don't allow deleting booked slots
    const slot = availability.find(s => s.id === slotId);
    if (slot?.status === "booked") {
      toast.error("Cannot delete booked time slots");
      return;
    }

    const updatedAvailability = availability.filter(slot => slot.id !== slotId);
    saveAvailability(updatedAvailability);
    toast.success("Availability slot deleted!");
  };

  const blockDateRange = (startDate: Date, endDate: Date) => {
    const slots: AvailabilitySlot[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // Don't override existing bookings
      const existingSlot = availability.find(slot => isSameDay(slot.date, currentDate));
      if (!existingSlot || existingSlot.status !== "booked") {
        slots.push({
          id: `block_${currentDate.getTime()}`,
          date: new Date(currentDate),
          status: "blocked",
          timeSlots: [],
          notes: "Blocked period"
        });
      }
      currentDate = addDays(currentDate, 1);
    }

    const updatedAvailability = [
      ...availability.filter(slot => 
        !slots.some(newSlot => isSameDay(newSlot.date, slot.date) && slot.status !== "booked")
      ),
      ...slots
    ];

    saveAvailability(updatedAvailability);
    toast.success(`Blocked ${slots.length} days`);
  };

  const selectedDateSlots = selectedDate 
    ? availability.filter(slot => isSameDay(slot.date, selectedDate))
    : [];

  const upcomingBookings = availability
    .filter(slot => slot.status === "booked" && isAfter(slot.date, new Date()))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Calendar and Day View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  Availability Calendar
                </CardTitle>
                <CardDescription>Click on a date to manage availability</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={calendarMode === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCalendarMode("month")}
                >
                  Month
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="pointer-events-auto"
              modifiers={{
                available: (date) => getDateStatus(date) === "available",
                booked: (date) => getDateStatus(date) === "booked",
                blocked: (date) => getDateStatus(date) === "blocked"
              }}
              modifiersStyles={{
                available: { backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" },
                booked: { backgroundColor: "hsl(var(--destructive))", color: "hsl(var(--destructive-foreground))" },
                blocked: { backgroundColor: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
              }}
            />
            
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded mr-2"></div>
                Available
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-destructive rounded mr-2"></div>
                Booked
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-muted rounded mr-2"></div>
                Blocked
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a Date"}
                </CardTitle>
                <CardDescription>
                  {selectedDate ? "Manage availability for this date" : "Choose a date to view details"}
                </CardDescription>
              </div>
              {selectedDate && (
                <Button onClick={createAvailabilitySlot} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slot
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-center py-8">
                <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a date from the calendar to manage availability</p>
              </div>
            ) : selectedDateSlots.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No availability set for this date</p>
                <Button onClick={createAvailabilitySlot}>
                  <Plus className="h-4 w-4 mr-2" />
                  Set Availability
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={
                          slot.status === "available" ? "default" :
                          slot.status === "booked" ? "destructive" : "secondary"
                        }>
                          {slot.status}
                        </Badge>
                        {slot.timeSlots.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {slot.timeSlots[0].start} - {slot.timeSlots[0].end}
                          </span>
                        )}
                      </div>
                      {slot.bookingInfo && (
                        <div className="text-sm">
                          <p className="font-medium">{slot.bookingInfo.clientName}</p>
                          <p className="text-muted-foreground">{slot.bookingInfo.eventType} - {slot.bookingInfo.package}</p>
                        </div>
                      )}
                      {slot.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{slot.notes}</p>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      {slot.status !== "booked" && (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => editAvailabilitySlot(slot)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteSlot(slot.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Your confirmed bookings for the next few weeks</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8">
              <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No upcoming bookings</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{format(booking.date, "MMM")}</div>
                      <div className="text-2xl font-bold">{format(booking.date, "d")}</div>
                    </div>
                    <div>
                      <h3 className="font-medium">{booking.bookingInfo?.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{booking.bookingInfo?.eventType}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.timeSlots[0]?.start} - {booking.timeSlots[0]?.end}
                      </p>
                    </div>
                  </div>
                  <Badge variant="destructive">Booked</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Availability Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSlot?.id.startsWith("block_") ? "Edit Availability" : 
               availability.some(s => s.id === editingSlot?.id) ? "Edit Availability" : "Set Availability"}
            </DialogTitle>
            <DialogDescription>
              Configure your availability for {editingSlot?.date && format(editingSlot.date, "EEEE, MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          
          {editingSlot && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={editingSlot.status} 
                  onValueChange={(value: "available" | "blocked") => 
                    setEditingSlot({...editingSlot, status: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editingSlot.status === "available" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={editingSlot.timeSlots[0]?.start || "09:00"}
                      onChange={(e) => setEditingSlot({
                        ...editingSlot,
                        timeSlots: [{
                          start: e.target.value,
                          end: editingSlot.timeSlots[0]?.end || "17:00"
                        }]
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={editingSlot.timeSlots[0]?.end || "17:00"}
                      onChange={(e) => setEditingSlot({
                        ...editingSlot,
                        timeSlots: [{
                          start: editingSlot.timeSlots[0]?.start || "09:00",
                          end: e.target.value
                        }]
                      })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={editingSlot.notes || ""}
                  onChange={(e) => setEditingSlot({...editingSlot, notes: e.target.value})}
                  placeholder="Add any notes about this time slot..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveSlot}>
                  Save Availability
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotographerAvailability;