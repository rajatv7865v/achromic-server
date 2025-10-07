// Sample agenda data structure for creating agendas with speaker references
// This shows how to structure the data when calling the agenda APIs

export const sampleAgendaData = {
  title: "Tech Conference 2024 - Day 1",
  description: "Full day agenda for the first day of Tech Conference 2024",
  date: "2024-06-15",
  venue: "Convention Center",
  location: "Dubai, UAE",
  eventId: "507f1f77bcf86cd799439011", // Replace with actual event ID
  isActive: true,
  sessions: [
    {
      id: 1,
      title: "Welcome & Opening Keynote",
      time: "09:00",
      duration: "45 min",
      location: "Main Hall",
      type: "keynote",
      description: "Join us for an inspiring opening keynote that sets the tone for the day ahead.",
      speakers: [
        "507f1f77bcf86cd799439011", // Replace with actual speaker IDs
        "507f1f77bcf86cd799439012"
      ]
    },
    {
      id: 2,
      title: "Panel Discussion: Future of AI",
      time: "10:00",
      duration: "60 min",
      location: "Main Hall",
      type: "panel",
      description: "Leading experts discuss the latest trends and challenges in artificial intelligence.",
      speakers: [
        "507f1f77bcf86cd799439013",
        "507f1f77bcf86cd799439014",
        "507f1f77bcf86cd799439015"
      ]
    },
    {
      id: 3,
      title: "Coffee Break & Networking",
      time: "11:00",
      duration: "30 min",
      location: "Foyer",
      type: "break",
      description: "Take a break, grab some coffee, and network with fellow attendees.",
      speakers: [] // No speakers for break sessions
    },
    {
      id: 4,
      title: "Workshop: Building Scalable Applications",
      time: "11:30",
      duration: "90 min",
      location: "Workshop Room A",
      type: "workshop",
      description: "Hands-on workshop covering best practices for building scalable web applications.",
      speakers: [
        "507f1f77bcf86cd799439016"
      ]
    },
    {
      id: 5,
      title: "Lunch & Networking",
      time: "13:00",
      duration: "60 min",
      location: "Restaurant",
      type: "networking",
      description: "Enjoy a delicious lunch while connecting with industry professionals.",
      speakers: [] // No speakers for networking sessions
    },
    {
      id: 6,
      title: "Closing Keynote: The Next Decade",
      time: "14:00",
      duration: "45 min",
      location: "Main Hall",
      type: "keynote",
      description: "A forward-looking presentation on what the next decade holds for our industry.",
      speakers: [
        "507f1f77bcf86cd799439017"
      ]
    }
  ]
};

// Example API calls:

// 1. Create Agenda
// POST /agenda
// Body: sampleAgendaData

// 2. Get All Agendas
// GET /agenda?page=1&limit=10&eventId=507f1f77bcf86cd799439011

// 3. Get Agenda by ID
// GET /agenda/507f1f77bcf86cd799439018

// 4. Get Agendas by Event ID
// GET /agenda/event/507f1f77bcf86cd799439011

// 5. Get Agendas by Date Range
// GET /agenda/date-range?startDate=2024-06-01&endDate=2024-06-30

// 6. Update Agenda
// PUT /agenda/507f1f77bcf86cd799439018
// Body: { title: "Updated Title", ... }

// 7. Update Agenda Status
// PATCH /agenda/507f1f77bcf86cd799439018/status
// Body: { isActive: false }

// 8. Delete Agenda
// DELETE /agenda/507f1f77bcf86cd799439018
