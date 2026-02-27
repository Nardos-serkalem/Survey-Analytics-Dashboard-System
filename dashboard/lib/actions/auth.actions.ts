"use server"

import { auth } from "../better-auth/auth";

export const signInWithEmail = async ({email, password} :SignInFormData)=>{
    try {
        console.log('Signing in user with email:', email, password);
        const response = await auth.api.signInEmail({ body: { email, password } })
        return {success:true, data: response};
    }catch (e){
        console.log('Sign In Failed', e);
        return {success:false, error: 'Sign In failed. Please try again.'};
    }
}