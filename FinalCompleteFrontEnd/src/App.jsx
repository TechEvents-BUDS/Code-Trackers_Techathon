import { createBrowserRouter,RouterProvider,Navigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import OtpPage from "./Pages/OtpPage";
import Layout from './Pages/Layout'
import Hero from './Pages/Hero'
import Marketplace from './Pages/Marketplace'
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import CreateListingForm from './Pages/CreateListingForm'
import Events from './Pages/Events'
import CreateEventForm from './Pages/CreateEventForm'
import CarpoolForm from './Pages/CarpoolForm'
import MyAccount from "./Pages/MyAccount";
import {useAuth} from './context/AuthContext'



const RedirectLoggedInUsers = ({children})=>{
  const {AuthState} = useAuth();
    if (AuthState?.user?.isVerified && AuthState.isLoggedIn){
      return <Navigate to='/home' replace/>;
    } 
    
    return children;
  }
  
  const ProtectedRoute = ({children})=>{
    const { AuthState } = useAuth();
  
    if (!AuthState?.user?.isVerified) {
      return <Navigate to="/verify-otp" replace />;
    }
  
    return children;
  
  }

function App() {



  const router = createBrowserRouter([
    {
    path: '/signup', 
    element: <SignUp/>
    },
    {
    path: '/verify-otp', 
    element: <OtpPage/>
    },
    {
    path: '/login', 
    element: <Login/>
    },
    {
      path:'/',
      element: <Layout/>,
      children:[
        {
          path:'',
          element:<Hero/>
        },
        {
          path:'/marketplace',
          element: <Marketplace/>
        },
        {
          path:'/marketplace/create',
          element: <CreateListingForm/>
        },
        {
          path:'/events',
          element:<Events/>
        },
        {
          path:'/events/create',
          element:<CreateEventForm/>
        },
        {
          path:'/carpool',
          element: <CarpoolForm/>
        },{
          path:"myaccount",
          element: <MyAccount/>
        }

      ]
    }
])

  return (
    <>
    <RouterProvider router={router}/>
    <Toaster/>
    </>
  )
}

export default App;