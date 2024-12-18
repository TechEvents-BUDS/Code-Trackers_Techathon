import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import {setUser,generateOTP,sendOTPByMail} from '../services/auth.js'

async function handleUserSignUp(req, res) {
    const { firstName, lastName, email, password, campus,university } = req.body;

    if (!firstName || !lastName || !email || !password || !campus || !university) {
        return res.status(400).json({ message: "All fields are required" });
    }

 

    try {
        // Existing user check and password hashing
        console.log("Checking for existing user with email:", email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists.");
            return res.status(400).json({ message: "User already exists" });
        }

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Generating OTP...");
        const verificationToken = await generateOTP();

        console.log("Creating new user...");
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            campus,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        console.log("Sending OTP email...");
        await sendOTPByMail(email, verificationToken);

        console.log("User created successfully:", user);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined, // Exclude password from the response
            },
        });
    } catch (err) {
        console.error("Error during user sign-up:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}




async function handleUserLogIn(req,res){
    const {email,password} = req.body;

    if( !email || !password) return res.status(400).json({message:"All fields are required"});
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"Invalid Login Credentials"})
        
        if(!user.isVerified) return res.status(404).json({message:"Please your Verify Account to Login"})
            
        const isValid = await bcrypt.compare(password,user.password);

        if(!isValid) return res.status(404).json({message:"Invalid Login Credentials"})
        const token = setUser(user);
        res.cookie('Auth_token',token,
        {   httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

		res.status(200).json({
			success: true,
			message: "Login successful",
			user: {
				...user._doc,
				password: undefined,
			},
		});
        
        
    }catch(err){
        return res.status(500).json({message:"Something went wrong"})
    }


}
 const logout = async (req, res) => {
	res.clearCookie("Auth_token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};




async function checkAuth(req, res) {
	const { email } = req.user;
  
	try {
	  
	  const user = await User.findOne({ email });
	
	  if (!user) {
		return res.status(404).json({ message: "User not found!" });
	  }
  
	
	  return res.status(200).json({ user });
	} catch (error) {
	  
	  console.error("Error in checkAuth:", error);
  
	 
	  return res.status(500).json({ message: "An error occurred while fetching the user." });
	}
  }
  


export {handleUserSignUp,handleUserLogIn,verifyEmail,logout,checkAuth}