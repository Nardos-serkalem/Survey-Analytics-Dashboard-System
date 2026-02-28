"use server"

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";

export const signInWithEmail = async ({email, password} :SignInFormData)=>{
    try {
        const response = await auth.api.signInEmail({ body: { email, password } })
        return {success:true, data: response};
    }catch (e){
        console.log('Sign In Failed', e);
        return {success:false, error: 'Sign In failed. Please try again.'};
    }
}
export const signOut = async () => {
   try {
       await  auth.api.signOut({headers: await headers()});
   } catch (error) {
         console.error('Sign out failed', error);
   }
}