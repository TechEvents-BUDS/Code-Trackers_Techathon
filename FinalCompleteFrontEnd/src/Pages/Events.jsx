import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from 'lucide-react'
import {Link} from 'react-router-dom'

const CATEGORIES = ['All', 'Academic', 'Social', 'Sports', 'Cultural', 'Other']

const events = [
  { id: 1, title: "Annual Science Fair", category: "Academic", date: "2023-09-15", time: "10:00 AM", location: "Main Hall", description: "Showcase your innovative science projects", organizer: "Science Club", ticketsAvailable: 200, ticketPrice: 5, banner: "/placeholder.svg?height=200&width=400" },
  { id: 2, title: "Campus Music Festival", category: "Cultural", date: "2023-09-20", time: "7:00 PM", location: "Amphitheater", description: "A night of music and performances", organizer: "Music Society", ticketsAvailable: 500, ticketPrice: 15, banner: "/placeholder.svg?height=200&width=400" },
  { id: 3, title: "Inter-College Basketball Tournament", category: "Sports", date: "2023-09-25", time: "2:00 PM", location: "Sports Complex", description: "Cheer for your college team", organizer: "Sports Committee", ticketsAvailable: 300, ticketPrice: 10, banner: "/placeholder.svg?height=200&width=400" },
  { id: 4, title: "Career Fair 2023", category: "Academic", date: "2023-10-05", time: "9:00 AM", location: "Convention Center", description: "Meet potential employers and explore career opportunities", organizer: "Career Services", ticketsAvailable: 1000, ticketPrice: 0, banner: "/placeholder.svg?height=200&width=400" },
  { id: 5, title: "Freshers' Welcome Party", category: "Social", date: "2023-10-10", time: "6:00 PM", location: "Student Center", description: "Welcome party for new students", organizer: "Student Council", ticketsAvailable: 400, ticketPrice: 20, banner: "/placeholder.svg?height=200&width=400" },
]

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')

  const filteredEvents = events.filter(event => 
    (searchTerm === '' || event.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (category === 'All' || event.category === category)
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <Link to={'/events/create'}><Button >Create Event</Button></Link>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <img src={event.banner} alt={event.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex justify-between items-center mb-2">
                <Badge>{event.category}</Badge>
                <span className="text-sm text-gray-500">{event.date}</span>
              </div>
              <p className="text-sm text-gray-500">Time: {event.time}</p>
              <p className="text-sm text-gray-500">Location: {event.location}</p>
              <p className="text-sm text-gray-500">Organizer: {event.organizer}</p>
              <p className="text-sm font-semibold mt-2">Tickets Available: {event.ticketsAvailable}</p>
              <p className="text-sm font-semibold">
                Ticket Price: {event.ticketPrice === 0 ? 'Free' : `PKR${event.ticketPrice.toFixed(2)}`}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

