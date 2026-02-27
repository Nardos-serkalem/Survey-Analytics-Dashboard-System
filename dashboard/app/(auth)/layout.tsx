import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Layout = async ({children} : {children : React.ReactNode}) => {
    // const session = await auth.api.getSession({headers : await headers()})
    // if (session?.user) redirect('/');
    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default">
                <Link href="/" className="auth-logo">
                    <Image src="/assets/image.png" alt="Signalist Logo" width={140} height={140} />
                </Link>
                <div className="pb-6 lg:pb-8 flex-1 ">{children}</div>
            </section>
            <section className="auth-right-section">
                <div className="flex-1 ">
                    <Image src="/assets/images/dashboard.jpg" alt="Dashboard Image" width={1440} height={1150} className="auth-dashboard-preview absolute top-0" />
                </div>
            </section>

        </main>
    )
}
export default Layout