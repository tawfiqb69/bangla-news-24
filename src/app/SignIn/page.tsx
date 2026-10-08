"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignInPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string }
        console.log(user);

        const { data, error } = await authClient.signIn.email({
            ...user,

        })
        if (data) {
            console.log(data);
            redirect("/")
        }
        if (error) {
            console.log(error);
        }



    }


    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data);
    }
    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
        console.log(data);
    }



    return (
        <div className='max-w-6xl container mx-auto flex flex-col  items-center'>
            <h2 className='flex justify-center mt-5 text-2xl text-red-700'>সাইন ইন</h2>
            <form onSubmit={onSubmit} className='flex justify-center '>
                <fieldset className="fieldset   rounded-box w-sm p-4">


                    <label className="label">ইমেইল</label>
                    <input name='email' type="email" className="input w-sm" placeholder="ইমেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-sm" placeholder="পাসওয়ার্ড" />

                    <button className="btn bg-red-700 text-white mt-4">সাইন ইন করুন</button>
                </fieldset>
            </form>
            <button onClick={handleGoogleSignIn} className="w-sm btn bg-red-700 text-white mt-2">Sign In With Google</button>
            <button onClick={handleGithubSignIn} className="w-sm btn bg-red-700 text-white mt-2">Sign In With Github</button>
            <p className='flex justify-center'>অ্যাকাউন্ট নেই?
                <Link href="/SignUp" className='text-red-700'>সাইন আপ করুন</Link>
            </p>
        </div>
    );
};

export default SignInPage;