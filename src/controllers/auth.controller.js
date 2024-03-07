import express from 'express'; 
import { getUserByEmail,createUser } from '../mongodb/models/user.js';
import { generateAuthToken } from '../helpers/index.js';


export const register = async(req,res) => {
    try{
        const {email , name , gender , DOB ,provider ,image,issues} = req.body;

        if (!email || !name || !gender || !DOB || !provider || !image || !issues) {
            return res.sendStatus(400);
        }

        const userExists = await getUserByEmail(email);

        if (userExists) {
            return res.status(409).send('Email already exists');
        }



        const newUser = await createUser({
            email : email,
            name : name,
            gender : gender,
            DOB : DOB,
            provider : provider,
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