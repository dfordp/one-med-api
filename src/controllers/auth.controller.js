import express from 'express'; 
import { getUserByEmail,createUser } from '../mongodb/models/user.js';
import { generateAuthToken } from '../helpers/index.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const register = async(req,res) => {
    try{
        console.log(req.body);
        const {email , name , gender , dob ,issues} = req.body;
        const {path} = req.file;

        if (!email || !name || !gender || !dob || !issues) {
            return res.sendStatus(400);
        }

        const userExists = await getUserByEmail(email);

        if (userExists) {
            return res.status(409).send('Email already exists');
        }
        
        const imageURL = await uploadOnCloudinary(path);
        const image = imageURL.secure_url
    
        const newUser = await createUser({
            email : email,
            name : name,
            gender : gender,
            DOB : dob,
            image : image,
            issues : issues
        });

        const token = await generateAuthToken(newUser._id);
        console.log(token);
        return res.status(200).json({newUser , token}).end();

    }catch(e){
        console.log(e);
        res.status(500).send('Server error');
    }
}

export const login = async (req,res) => {
    try {
        const { email } = req.body;
  
        if (!email || !password) {
          return res.sendStatus(400);
        }
        
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        const token = await generateAuthToken(user._id);
        return res.status(200).json({user,token}).end();
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}