"use client"

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';



const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user
    console.log(user);

    const handleSignOut = async () => {
        await authClient.signOut();
    }




    return (
        <div className="absolute right-0 top-4 flex items-center gap-2 text-sm">
            {
                user ? (<div className='flex flex-col items-center gap-2'>
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
                    <button onClick={handleSignOut} className='btn bg-red-700 text-white btn-xs'>Sign Out</button>
                </div>) : (<div>
                    <Link href="/SignIn">
                        <button className="btn">সাইন ইন</button>
                    </Link>

                    <Link href="/SignUp">
                        <button className="btn bg-red-600 text-white">
                            সাইন আপ
                        </button>
                    </Link>
                </div>)
            }


        </div>
    );
};

export default UserInfo;