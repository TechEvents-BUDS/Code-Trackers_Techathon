import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {Button} from '../components/ui/button'

  import {useState} from 'react'
  import {toast} from 'react-hot-toast'
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
  function OtpPage() {
    const [otp,setOtp] = useState();
    const [otpError,setOtpError] = useState();
    const {verifyOtp,error} = useAuth();
    const navigate= useNavigate();

    const handleSubmit = async()=>{
        setOtpError(null)
       
        if(otp.length<6){
            return setOtpError('OTP must have 6 digits')
        }
       try{
        await verifyOtp(otp);
        toast.success('Account Verified Successfully')
        navigate('/login')

       }catch(error){
        toast.error('Something went wrong')
        console.log(error)

       }
    }
    return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto w-full max-w-xl">
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>Verify your email</CardTitle>
                <CardDescription>Please enter the 6 digit one-time password sent to your email</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col items-center justify-center gap-4">

        
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={otp} onChange={(otp) => setOtp(otp)}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
                </InputOTP>
                {otpError && <span className="text-red-500 text-sm">{otpError}</span>}
                {error && <span className="text-red-500 text-sm">{error}</span>}

                <Button onClick={handleSubmit}>Submit</Button>
            </div>

            </CardContent>
        </Card>
      </div>
    )
  }
  
  export default OtpPage