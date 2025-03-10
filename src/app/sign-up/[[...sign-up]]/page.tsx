import { SignUp } from "@clerk/nextjs";

export default function SignUpPage(){
    return(
        <div className="container mx-auto px-4 flex justify-center items-center">
            <SignUp signInFallbackRedirectUrl="/create-profile"/>
        </div>
    )
}