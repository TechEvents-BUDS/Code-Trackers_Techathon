import React from 'react'
import { useState, useEffect } from "react"
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from '@/context/AuthContext'


export default function Signup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError,setPasswordError] = useState("");
  const [campus, setCampus] = useState({
    'Bahria University': ['Karachi','Lahore','Islamabad'],
    'NED' : ['Karachi'],
    'FAST' : ['Karachi','Lahore','Islamabad']
  })
  const [selectedCampus,setSelectedCampus] = useState('');
  const [university,setUniversity]= useState("");
  const {signup,error} = useAuth();
  const navigate = useNavigate();
   
  const handleEmailChange = (e) => {
    setEmailError(null);
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  
    if (inputEmail.includes('@student.bahria.edu.pk')) {
      setUniversity('Bahria University');
    } else if (inputEmail.includes('@nu.edu.pk')) {
      setUniversity('FAST');
    } else if (inputEmail.includes('@neduet.edu.pk')) {
      setUniversity('NED');
    } else {
      setUniversity(""); 
      setEmailError('Enter a valid student email');
    }
  };

  const handlePasswordChange=(e)=>{
    setPasswordError(null);
    setPassword(e.target.value)

    if(e.target.value.length<8){
      setPasswordError('Password must contain atleast 8 characters')
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      await signup({firstName,lastName,email,university,campus:selectedCampus,password})
      navigate('/verify-otp')
    }
    catch(error){
      console.log(error);
    }

  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid  gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="your.email@university.edu"
                required
              />
              {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
            </div>
              <div className="grid gap-2">
                <Label htmlFor="campus">Select Campus</Label>
                <Select onValueChange={setSelectedCampus} required>
                  <SelectTrigger id="campus">
                    <SelectValue placeholder="Select your campus" />
                  </SelectTrigger>
                  <SelectContent>
                  {campus[university]?.map((campus, index) => (
                    <SelectItem value={campus} key={index}>
                      {`${campus} Campus`}
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
              </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                required
              />
              {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
              {error && <span className="text-red-500 text-sm">{error}</span>}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <span className='underline'>
              <Link to={'/login'}>Log in</Link>
            </span>
            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

