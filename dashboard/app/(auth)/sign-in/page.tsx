"use client"
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
const SignIn = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',

        },
        mode : 'onBlur'
    })
    const onSubmit  = async (data :SignInFormData) => {
        try {
           const result = await signInWithEmail(data);
           if (result.success) {
               router.push("/");
           }
        }catch (e){

            console.error(e);
            toast.error('Sign up failed. Please try again.',{
                description : e instanceof Error ? e.message : 'An unexpected error occurred.'
            });
        }
    }
    return (
        <>

            <h1 className="form-title"> Login Your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="abebekebe@gmail.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                />
                <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="********"
                    register={register}
                    error={errors.password}
                    validation={{ required: "password is required" , minLength: 6}}

                />
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? "Signing In ..." : "Login"}
                </Button>
                <FooterLink
                    text="Create Account"
                    linkText="Sign up"
                    href="/sign-up"
                />
            </form>
        </>
    )
}
export default SignIn
