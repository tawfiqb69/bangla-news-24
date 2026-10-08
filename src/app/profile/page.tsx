"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useState } from 'react';


const ProfilePage = () => {
    const [show, setShow] = useState(false)

    const handleShowForm = () => {
        setShow(!show)
    }

    const { data: session } = authClient.useSession();
    const user = session?.user
    console.log("user", user);

    const handleUpdateProfile = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const updatedUser = Object.fromEntries(formData.entries()) as { name: string, image: string }
        console.log(updatedUser);
        await authClient.updateUser({
            ...updatedUser
        })

    }




    return (
        <div className='my-4'>

            <div className='flex flex-col items-center gap-2'>
                <Link href="/profile">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind-CSS-Avatar-component"
                                src={user?.image as string} />
                        </div>
                    </div>
                </Link>

                <h2>{user?.name}</h2>
                <p>{user?.email}</p>

                <button onClick={handleShowForm} className='btn bg-red-700 text-white'>Edit Profile</button>


                {show && <form onSubmit={handleUpdateProfile} >
                    <fieldset className="fieldset   rounded-box w-sm p-4">


                        <label className="label">নাম</label>
                        <input name='name' type="text" className="input w-sm" placeholder="নাম" />

                        <label className="label">Image</label>
                        <input name='image' className="input w-sm" placeholder="Image" />

                        {/* <label className="label">পাসওয়ার্ড</label>
                    <input name='password' type="password" className="input w-sm" placeholder="পাসওয়ার্ড" /> */}

                        <button type='submit' className="btn bg-red-700 text-white mt-4">Update Profile</button>
                    </fieldset>
                </form>}
            </div>

        </div>
    );
};

export default ProfilePage;