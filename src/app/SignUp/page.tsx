"use client"


import { redirect } from "next/navigation";
import { authClient } from "../../lib/auth-client";

const SignUpPage = () => {

    const onSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as {name: string, image: string, email: string, password:string}
        console.log(user);

        const {data, error} = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        }) 
        if(data){
            console.log(data);
            redirect("/")
        }
        if(error){
            console.log(error);
        }
        
    }

    return (
        <div className='max-w-6xl container mx-auto'>
            <h2 className='flex justify-center mt-5 text-2xl text-red-700'>সাইন আপ</h2>
            <form onSubmit={onSubmit} className='flex justify-center '>
                <fieldset className="fieldset   rounded-box w-sm p-4">
                    

                    <label className="label">নাম</label>
                    <input name='name' type="text" className="input w-sm" placeholder="নাম" />

                    <label className="label">Image</label>
                    <input name='image' className="input w-sm" placeholder="Image" />

                    <label className="label">ইমেইল</label>
                    <input name='email' type="email" className="input w-sm" placeholder="ইমেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-sm" placeholder="পাসওয়ার্ড" />

                    <button type='submit' className="btn bg-red-700 text-white mt-4">সাইন আপ করুন</button>
                </fieldset>               
            </form>
            <p className='flex justify-center'>অ্যাকাউন্ট আছে?
                    <a className='text-red-700'>সাইন ইন করুন</a>
                </p>
        </div>
    );
};

export default SignUpPage;