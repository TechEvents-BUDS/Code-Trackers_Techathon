import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Car, Calendar, Edit, Trash2 } from 'lucide-react'

const userPosts = [
  { id: 1, title: 'Textbook for Sale', category: 'Books', price: 30, status: 'Active' },
  { id: 2, title: 'Dorm Furniture', category: 'Furniture', price: 100, status: 'Sold' },
  { id: 3, title: 'Laptop', category: 'Electronics', price: 500, status: 'Active' },
]

const userCarpoolOffers = [
  { id: 1, from: 'Downtown', to: 'University', date: '2023-06-20', seats: 3, status: 'Active' },
  { id: 2, from: 'Suburbs', to: 'City Center', date: '2023-06-22', seats: 2, status: 'Completed' },
]

const userEvents = [
  { id: 1, title: 'Study Group', date: '2023-06-25', location: 'Library', attendees: 5 },
  { id: 2, title: 'Campus Concert', date: '2023-07-01', location: 'Auditorium', attendees: 50 },
]

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState('marketplace')

  const handleEdit = (id) => {
    console.log(`Editing ${type} with id ${id}`)
    
  }

  const handleDelete = (id, type) => {
    console.log(`Deleting ${type} with id ${id}`)
    // Implement delete functionality
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="carpool">Carpool</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2" />
                My Marketplace Posts
              </CardTitle>
              <CardDescription>Manage your marketplace listings</CardDescription>
            </CardHeader>
            <CardContent>
              {userPosts.map(post => (
                <div key={post.id} className="mb-4 p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-500">Category: {post.category}</p>
                    <p className="text-sm text-gray-500">Price: ${post.price}</p>
                    <Badge variant={post.status === 'Active' ? 'default' : 'secondary'}>{post.status}</Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(post.id, 'post')}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id, 'post')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push('/marketplace/create')}>Create New Listing</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="carpool">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2" />
                My Carpool Offers
              </CardTitle>
              <CardDescription>Manage your carpool offers</CardDescription>
            </CardHeader>
            <CardContent>
              {userCarpoolOffers.map(offer => (
                <div key={offer.id} className="mb-4 p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{offer.from} to {offer.to}</h3>
                    <p className="text-sm text-gray-500">Date: {offer.date}</p>
                    <p className="text-sm text-gray-500">Available Seats: {offer.seats}</p>
                    <Badge variant={offer.status === 'Active' ? 'default' : 'secondary'}>{offer.status}</Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(offer.id, 'carpool')}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(offer.id, 'carpool')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push('/carpool/create')}>Create New Offer</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" />
                My Events
              </CardTitle>
              <CardDescription>Manage your events</CardDescription>
            </CardHeader>
            <CardContent>
              {userEvents.map(event => (
                <div key={event.id} className="mb-4 p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">Date: {event.date}</p>
                    <p className="text-sm text-gray-500">Location: {event.location}</p>
                    <p className="text-sm text-gray-500">Attendees: {event.attendees}</p>
                  </div>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(event.id, 'event')}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id, 'event')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button >Create New Event</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

