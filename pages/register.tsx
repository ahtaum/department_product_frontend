import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from "axios"
import UrlApi from '@/config/urlApi'
import { MainLayout } from '@/layouts/MainLayout'

Register.layout = MainLayout

export default function Register() {
    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirm_password, setCpassword] = useState<string>("")

    const [status, setStatus] = useState<Boolean>(false)
    const [notif, setNotif] = useState<Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(false)

    const handleRegister = async (e: any) => {
        e.preventDefault()

        if(!name || !email || !password || !confirm_password) {
            setStatus(true)

            return
        }

        if (password !== confirm_password) {
            alert('Your Confirm Password not match!')
  
            return
        }

        let formData = new FormData()
        formData.append('email', email)
        formData.append('name', name)
        formData.append('password', password)
        formData.append('password_confirm', confirm_password)

        await axios.post(`${UrlApi.data_api}users/add`, formData).then((data) => {
            setEmail("")
            setName("")
            setPassword("")
            setCpassword("")
            setStatus(false)
            setNotif(true)
        }).catch((error) => {
            alert(error.message)
            setStatus(true)
            setNotif(false)
        })
    }

    if (notif) {
        setTimeout(() => {
            setNotif(false)
        }, 7000)
    }

    return (
        <>
        
        <Head>
            <title>Register</title>
        </Head>

        {/* Notification */}
        <div className={`toast z-10 ${notif ? "" : "hidden"}`}>
            <div className="alert alert-info">
                <div>
                    <span>Register Successfuly</span>
                </div>
            </div>
        </div>

        <section id="register-page" className="container flex items-center justify-center my-8 p-3">

            <div className="card bg-base-100 shadow-xl lg:p-8">
                <div className="card-body">
                    <form onSubmit={handleRegister}>
                        <h1 className="text-center font-bold mb-4 text-2xl">Register</h1>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>

                            <input type="email" placeholder="Type Your Email" className="input input-bordered" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            {status && !email ? <span className="text-red-500">Email Must be Filled!</span> : ""}
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>

                            <input type="text" placeholder="Type Your Name" className="input input-bordered" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                            { status && !name ? <span className="text-red-500">Name Must be Filled!</span> : "" }
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <input type="password" placeholder="Your Password" className="input input-bordered" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                            { status && !password ? <span className="text-red-500">Password Must be Filled!</span> : "" }
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>

                            <input type="password" placeholder="Confirm Ypur Password" className="input input-bordered" name="confirm_password" onChange={(e) => setCpassword(e.target.value)} value={confirm_password} />
                        </div>

                        <div className="flex justify-between mt-8">
                            <Link href="/" className="btn btn-error">Back</Link>

                            <button className="btn btn-success" type="submit">Register</button>
                        </div>

                    </form>
                </div>
            </div>

        </section>

        </>
    )
}
