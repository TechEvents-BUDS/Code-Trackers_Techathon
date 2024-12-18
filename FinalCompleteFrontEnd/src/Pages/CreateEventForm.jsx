import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = ['Academic', 'Social', 'Sports', 'Cultural', 'Other']

export default function CreateEventForm() {

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    time: '',
    location: '',
    description: '',
    organizer: '',
    ticketsAvailable: '',
    ticketPrice: '',
    banner: null
  })
  const navigate = useNavigate();
  const [formError,setFormError] = useState();
  const [imageError,setImageError] = useState();
  

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'ticketsAvailable' || name ==='ticketPrice') {
        
        if (value && (value <= 0 || value.startsWith('0'))) {
          
          e.target.value = '';
          return;
        }
      }
      if (name === 'date') {
        const today = new Date();
        const selectedDate = new Date(value);
        console.log(selectedDate)
        if (selectedDate < today.setHours(0, 0, 0, 0)) {
          e.target.value = '';
          return;
        }
      }
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      category: value
    }))
  }

  const handleFileChange = (e) => {
    setImageError(null);
    const file = e.target.files[0]
    if(file.size <= (3*1024*1024)){
        setFormData(prevData => ({
          ...prevData,
          banner: file
        }))

    }else{
        setFormData(prevData => ({
            ...prevData,
            banner: null
          }))
        e.target.value = '';
        setImageError('file must be less than 3MB in size')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError(null);
    if (!formData.title || !formData.category || !formData.date || !formData.time || !formData.location || !formData.description || !formData.organizer || !formData.ticketsAvailable || !formData.ticketPrice || !formData.banner) {
        return  setFormError('All fields are required');
    }
    console.log('Form submitted:', formData)
    
    toast.success('Event Created Successfully');
    navigate('/events');
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>Create a New Event</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select name="category" value={formData.category} onValueChange={handleSelectChange} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ticketsAvailable">Available Tickets</Label>
              <Input
                id="ticketsAvailable"
                name="ticketsAvailable"
                type="number"
                value={formData.ticketsAvailable}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ticketPrice">Ticket Price (PKR)</Label>
              <Input
                id="ticketPrice"
                name="ticketPrice"
                type="number"
                step="0.01"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="banner">Event Banner <span className='text-red-500'>(only supports png/jpeg/jpg format)</span></Label>
              <Input
                id="banner"
                name="banner"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                required
              />
              {imageError && <span className='text-red-500'>{imageError}</span>}
              {formError && <span className='text-red-500'>{formError}</span>}
            </div>
          </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">Create Event</Button>
      </CardFooter>
        </form>
    </Card>
  )
}

