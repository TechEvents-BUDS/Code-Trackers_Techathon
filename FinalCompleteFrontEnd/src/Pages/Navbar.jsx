import React from 'react'
import {User,UserPen,Mail,LogOut,Menu} from 'lucide-react'
import {Link} from 'react-router-dom'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
  
function Navbar() {
  return (
    <nav className=' font-sans bg-white  h-[60px] flex items-center justify-between px-4 md:px-8 border-b border-gray-200 fixed top-0 left-0 right-0 z-50'>
        <div className='text-base md:text-xl font-black  p-2  hover:cursor-pointer'>CampusConnect</div>
        <div className='hidden md:flex'>
            <ol className='flex justify-between list-none gap-8 font-lg'>
              <Link to={'/marketplace'}><li className='hover:cursor-pointer text-gray-600 hover:text-black '>MarketPlace</li></Link>
              <Link to={'/carpool'}> <li className='hover:cursor-pointer text-gray-600 hover:text-black'>Carpool</li></Link>
              <Link to={'/events'}> <li className='hover:cursor-pointer text-gray-600 hover:text-black'>Events</li> </Link> 
            </ol>
        </div>

        <div className='hover:cursor-pointer hidden md:flex'>
            <Popover>
             <PopoverTrigger>
                <User />
             </PopoverTrigger>
             <PopoverContent className='w-[120px] mr-4 '>
                <div className='w-full flex flex-col gap-2 font-semibold items-start'>
                    <div className='hover:cursor-pointer border-bottom flex justify-end items-center gap-2  '><UserPen className='w-4 h-4'/>Profile</div>
                    <div className='hover:cursor-pointer flex justify-end items-center gap-2'><Mail className='w-4 h-4'/>Messages</div>
                    <div className='hover:cursor-pointer text-red-500 flex justify-end items-center gap-2'><LogOut className='w-4 h-4'/>Logout</div>
                </div>
             </PopoverContent>

            </Popover>
        </div>
        <div className='flex md:hidden'>
        <Sheet>
        <SheetTrigger><Menu className='w-6 h-6'/></SheetTrigger>
        <SheetContent className='max-w-48'>
            <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription className='w-full p-0 mt-2'>
                <div className='w-full'>
                <ol className='flex flex-col items-start list-none row-gap-8 font-lg'>
              <Link to={'/marketplace'}><li className='text-black py-2 '>MarketPlace</li></Link>
              <Link to={'/carpool'}> <li className='text-black py-2'>Carpool</li></Link>
              <Link to={'/events'}> <li className='text-black py-2'>Events</li> </Link> 
              <Link to={'/events'}> <li className='text-black py-2'>My Account</li> </Link>
              <Link to={'/events'}> <li className='text-black py-2'>Messages</li> </Link>  
              <Link to={'/events'}> <li className='text-red-500 py-2'>Log out</li> </Link>  
                </ol>
               
                </div>
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
        </Sheet>
        </div>
    </nav>
  )
}

export default Navbar