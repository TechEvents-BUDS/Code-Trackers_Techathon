import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Link } from 'react-router-dom'
function Hero() {
    const marketplace =[
        { title: "Used Textbooks", description: "Various subjects, great condition", price: " PKR 500" },
        { title: "Notes", description: "Handwritten Notes for Course-101", price: "Free" },
        { title: "Graphing Calculator", description: "TI-84 Plus, barely used", price: " PKR 800" },
      ]
    
     const events = [
        { title: "Campus Music Festival", description: "This Saturday, 7 PM at the Auditorium", price: "Free" },
        { title: "Career Fair", description: "Next Tuesday, 10 AM - 4 PM, Student Center", price: "Free" },
        { title: "Coding Workshop", description: "Thursday, 6 PM, Computer Science Building", price: " PKR 100" },
     ]
  return (
    <div className=''>
        
    <section className="bg-blue-600 text-white py-20">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to CampusConnect</h1>
    <p className="text-xl mb-8">Your one-stop platform for campus life: Buy, sell, carpool, and discover events!</p>
    <div className="space-x-4">
      <Button size="lg" variant="secondary">Get Started</Button>
      <Button size="lg" className='bg-black text-white'>Learn More</Button>
    </div>
  </div>
</section>

<section>
  <div className='container mx-auto '>
    <h1 className='text-2xl font-bold my-4 ml-4'>MarketPlace</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-2 md:px-4">

      {
        marketplace.map((item,index)=>(
          <Card key={index} className="border border-gray-200">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{item.price}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
        ))
      }
    </div>

   <div className='flex  justify-center'>
    <Link to={'/marketplace'}> <Button className='bg-black text-white self-center'>Explore Marketplace</Button></Link>
    </div>

  </div>
</section>

<section>
  <div className='container mx-auto '>
    <h1 className='text-2xl font-bold my-4 ml-4'>Events</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-2 md:px-4">

      {
        events.map((item,index)=>(
          <Card key={index} className="border border-gray-200">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{item.price}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
        ))
      }
    </div>

   <div className='flex  justify-center'>
   <Link to={'/events'}>  <Button className='bg-black text-white self-center'>Explore Events</Button></Link>
    </div>

  </div>
</section>

  </div>
  )
}

export default Hero