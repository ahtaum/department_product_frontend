import { useContext } from 'react'
import Head from 'next/head'
import { UserContext } from '@/context/UserContext'
import AdminLayout from '@/layouts/AdminLayout'

Dashboard.layout = AdminLayout

export default function Dashboard() {
    const { email, name } = useContext(UserContext)

    return (
        <>
        
        <Head>
            <title>Dashboard</title>
        </Head>

        <section id="dashboard-admin-page" className="container my-4 p-3">

            <h1 className="text-xl font-bold mb-4">Dashboard</h1>

            <div className="flex flex-col lg:flex-row md:flex-row justify-between gap-8">
                <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Profile</h2>
                        <p>{ name }</p>
                        <p>{ email }</p>
                    </div>
                </div>
            </div>

        </section>

        </>
    )
}
