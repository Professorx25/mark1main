"use server";

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async() => {
    try{
        const user = await currentUser();
        if(!user){
            return{
                success:false,
                error:"No authenticated user found",
            }
        }

        const {id, firstName, lastName, imageUrl, emailAddresses} = user;

        //If some different data is comming from user then we will update and we are using upsert() to prevent duplicate entries
        //upsert = (update + insert)
        const newUser = await db.user.upsert({
            where:{
                clerkId:id
            },

            update:{
                name:firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || null,
                image:imageUrl || null,
                email:emailAddresses[0]?.emailAddress || "",
            },

            create:{
                clerkId:id,
                name:firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || null,
                image:imageUrl || null,
                email:emailAddresses[0]?.emailAddress || "",
            },
        });
        return{
            success:true,
            user:newUser,
            message:"User onboarded successfully"
        }
    } catch(error){
        console.error("❌ Error while onboarding the user : ",error);
        return{
            success:false,
            error:"Failed to onboarded user",
        };
    }
};



//To fetch current user if user is logged in
export const getCurrentUser = async() => {
    try {
        const user = await currentUser();
        if(!user){
            return null;
        }

        const dbUser = await db.user.findUnique({
            where:{
                clerkId:user.id
            },
            select:{
                id:true,
                email:true,
                name:true,
                image:true,
                clerkId:true,
            }
        })

        return dbUser;
        
    } catch (error) {
        console.error("❌ Error while fetching the current user : ", error)
    }
};