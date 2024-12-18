

import { useState } from 'react'

import { MapPin, Users, Info, Car } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const vehicleTypes = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'minivan', label: 'Minivan' },
  { value: 'other', label: 'Other' },
]

export default function CarpoolForm() {
 
  const [formData, setFormData] = useState({
    startLocation: '',
    vehicleType: '',
    seats: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      vehicleType: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the formData to your backend
    console.log('Carpool offer created:', formData)
    // Redirect to the carpool listings page after submission
    
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a Carpool Offer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startLocation">Starting Location</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="startLocation"
                  name="startLocation"
                  value={formData.startLocation}
                  onChange={handleInputChange}
                  className="pl-8"
                  placeholder="Enter your starting address"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select name="vehicleType" value={formData.vehicleType} onValueChange={handleSelectChange} required>
                <SelectTrigger id="vehicleType" className="w-full">
                  <div className="flex items-center">
                    <Car className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select vehicle type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  
                    <SelectItem  value='4-Wheel'>
                      4-Wheel
                    </SelectItem>
                    <SelectItem  value='2-Wheel'>
                      2-Wheel
                    </SelectItem>
                  
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="seats">Available Seats</Label>
              <div className="relative">
                <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="seats"
                  name="seats"
                  type="number"
                  min="1"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Additional Information</Label>
              <div className="relative">
                <Info className="absolute left-2 top-3 text-gray-400" size={18} />
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="pl-8"
                  placeholder="e.g., pickup points, luggage space, etc."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>Create Carpool Offer</Button>
      </CardFooter>
    </Card>
  )
}

